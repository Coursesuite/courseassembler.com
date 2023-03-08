<?php

// this class loads ENOUGH of the powerpoint file so that we can figure out what media is linked and what pixel position it is at on each slide
// supports audio and video embeds, youtube and vimeo urls, and urls.
class PPTLoader {

    protected $oZip;
    protected $oPresentation;
    protected $filename;
    protected $arrayRels = array();
    protected $slides = array();
    protected $scaling_factor = 1;

    // a scaling factor allows pixel values to be scaled up or down
    function __construct($scaling_factor = 1) {
        $this->scaling_factor = $scaling_factor;
    }

    // convert powerpoint units to pixels 
    protected function emuToPixels($emu) {
        $px = intval($emu) / 9525;
        return round($px * $this->scaling_factor, 0, PHP_ROUND_HALF_EVEN);
    }

    // the data we want from the presentation after it is loaded
    public function getSlides() {
        return $this->slides;
    }

    // determine if the presentation is openable and contains the files we expect it to
    public function fileSupportsUnserializePhpPresentation($pFilename = '')
    {
        // Check if file exists
        if (!file_exists($pFilename)) {
            throw new \Exception("Could not open " . $pFilename . " for reading! File does not exist.");
        }

        $oZip = new ZipArchive();
        // Is it a zip ?
        if ($oZip->open($pFilename) === true) {
            // Is it an OpenXML Document ?
            // Is it a Presentation ?
            if (is_array($oZip->statName('[Content_Types].xml')) && is_array($oZip->statName('ppt/presentation.xml'))) {
                return true;
            }
        }
        return false;
    }

    // vertify the presentation can be loaded then load it
    public function load($pFilename)
    {
        // Unserialize... First make sure the file supports it!
        if (!$this->fileSupportsUnserializePhpPresentation($pFilename)) {
            throw new \Exception("Invalid file format for PhpOffice\PhpPresentation\Reader\PowerPoint2007: " . $pFilename . ".");
        }

        return $this->loadFile($pFilename);
    }

    // try to load the presentation
    protected function loadFile($pFilename)
    {
        $this->oPresentation = new stdClass();
        $this->filename = $pFilename;

        $this->oZip = new ZipArchive();
        $this->oZip->open($this->filename);

        $pptPresentation = $this->oZip->getFromName('ppt/presentation.xml');
        if ($pptPresentation !== false) {
            $this->loadSlides($pptPresentation);
        }

        return $this->oPresentation;
    }

    // figure out which slides are linked using the _rels and load each sllide for processing
    protected function loadSlides($sPart)
    {
        $xmlReader = new XMLUtils();
        if ($xmlReader->getDomFromString($sPart)) {
            $fileRels = 'ppt/_rels/presentation.xml.rels';
            $this->loadRels($fileRels);

            // Continue with loading the slides
            foreach ($xmlReader->getElements('/p:presentation/p:sldIdLst/p:sldId') as $oElement) {
                if (!($oElement instanceof \DOMElement)) {
                    continue;
                }
                $rId = $oElement->getAttribute('r:id');
                $pathSlide = isset($this->arrayRels[$fileRels][$rId]) ? $this->arrayRels[$fileRels][$rId]['Target'] : '';
                if (!empty($pathSlide)) {
                    $pptSlide = $this->oZip->getFromName('ppt/' . $pathSlide);
                    if ($pptSlide !== false) {
                        $slideRels = 'ppt/slides/_rels/' . basename($pathSlide) . '.rels';
                        $this->loadRels($slideRels);
                        $this->loadSlide($pptSlide, basename($pathSlide));
                    }
                }
            }
        }
     }

    // process one slide
    protected function loadSlide($sPart, $baseFile)
    {
        $xmlReader = new XMLUtils();
        if ($xmlReader->getDomFromString($sPart)) {

            $oSlide = new stdClass();
            $oSlide->relsIndex = 'ppt/slides/_rels/' . $baseFile . '.rels';
            $oSlide->baseFile = $baseFile;
            $this->addSlide($baseFile, $oSlide);

            // Shapes
            $arrayElements = $xmlReader->getElements('/p:sld/p:cSld/p:spTree/*');
            if ($arrayElements) {
                $this->loadSlideShapes($oSlide, $arrayElements, $xmlReader);
            }

        }
    }

    // set up a slide object
    protected function addSlide($baseFile, $oSlide) {
        $this->slides[$baseFile] = $oSlide;
    }

    // replace the slide with the shape data we calculated
    protected function addMedia($oShape, $baseFile) {
        $this->slides[$baseFile] = $oShape;
    }

    // load the _rels file for the slide
    protected function loadRels($fileRels)
    {
        $sPart = $this->oZip->getFromName($fileRels);
        if ($sPart !== false) {
            $xmlReader = new XMLUtils();
            if ($xmlReader->getDomFromString($sPart)) {
                foreach ($xmlReader->getElements('*') as $oNode) {
                    if (!($oNode instanceof \DOMElement)) {
                        continue;
                    }
                    $this->arrayRels[$fileRels][$oNode->getAttribute('Id')] = array(
                        'Target' => $oNode->getAttribute('Target'),
                        'Type' => $oNode->getAttribute('Type'),
                    );
                }
            }
        }
    }

    // videos and audio are stored in a p:pic under the p:spTree
    protected function loadSlideShapes($oSlide, $oElements, $xmlReader)
    {
        foreach ($oElements as $oNode) {
            switch ($oNode->tagName) {
                case 'p:pic':
                    $this->loadShapeDrawing($xmlReader, $oNode, $oSlide);
                    break;
                default:

            }
        }
    }

    // load the p:pic nodes representing dimensions, positioning and the media itself
    protected function loadShapeDrawing(XMLUtils $document, \DOMElement $node, stdClass $oSlide)
    {
        $oShape = new stdClass;
        $fileRels = $oSlide->relsIndex;

        $oElement = $document->getElement('p:nvPicPr/p:cNvPr', $node);
        if ($oElement instanceof \DOMElement) {
            $oShape->name = ($oElement->hasAttribute('name') ? $oElement->getAttribute('name') : '');
            $oShape->title = ($oElement->hasAttribute('descr') ? $oElement->getAttribute('descr') : '');
            $oShape->extn = pathinfo($oShape->name, PATHINFO_EXTENSION);
        }

        // dimensions
        $oElement = $document->getElement('p:spPr/a:xfrm/a:off', $node);
        if ($oElement instanceof \DOMElement) {
            if ($oElement->hasAttribute('x') && $oElement->hasAttribute('y')) {
                $oShape->x = $this->emuToPixels($oElement->getAttribute('x'));
                $oShape->y = $this->emuToPixels($oElement->getAttribute('y'));
            }
        }
        $oElement = $document->getElement('p:spPr/a:xfrm/a:ext', $node);
        if ($oElement instanceof \DOMElement) {
            if ($oElement->hasAttribute('cx') && $oElement->hasAttribute('cy')) {
                $oShape->width = $this->emuToPixels($oElement->getAttribute('cx'));
                $oShape->height = $this->emuToPixels($oElement->getAttribute('cy'));
            }
        }


        // video files
        $oElement = $document->getElement('p:nvPicPr/p:nvPr/a:videoFile', $node);
        if ($oElement instanceof \DOMElement) {
            if ($oElement->hasAttribute('r:link') && isset($this->arrayRels[$fileRels][$oElement->getAttribute('r:link')]['Target'])) {
                $pathMedia = $this->arrayRels[$fileRels][$oElement->getAttribute('r:link')]['Target'];

                if (strpos($pathMedia, 'youtube.com/') !== false) {
                    $oShape->media = $pathMedia;
                    $oShape->type = 'youtube';
                } else if (strpos($pathMedia, 'vimeo.com') !== false) {
                    $oShape->media = $pathMedia;
                    $oShape->type = 'vimeo';
                } else {
                    $oShape->type = 'video/' . $oShape->extn;
                    $pathMedia = explode('/', 'ppt/slides/' . $pathMedia);
                    foreach ($pathMedia as $key => $partPath) {
                        if ($partPath == '..') {
                            unset($pathMedia[$key - 1]);
                            unset($pathMedia[$key]);
                        }
                    }
                    $pathMedia = implode('/', $pathMedia);
                    $mediaFile = $this->oZip->getFromName($pathMedia);
                    if (!empty($mediaFile)) {
                        $oShape->media = "data:{$oShape->type};base64," . base64_encode($mediaFile);
                    }
                }
            }
        }

        // audio files
        $oElement = $document->getElement('p:nvPicPr/p:nvPr/a:audioFile', $node);
        if ($oElement instanceof \DOMElement) {
            if ($oElement->hasAttribute('r:link') && isset($this->arrayRels[$fileRels][$oElement->getAttribute('r:link')]['Target'])) {
                $pathMedia = $this->arrayRels[$fileRels][$oElement->getAttribute('r:link')]['Target'];
                if (strpos($pathMedia, '://') !== false) {
                    $oShape->media = $pathMedia;
                    $oShape->type = 'external';
                } else {
                    $oShape->type = 'audio/' . $oShape->extn;
                    $pathMedia = explode('/', 'ppt/slides/' . $pathMedia);
                    foreach ($pathMedia as $key => $partPath) {
                        if ($partPath == '..') {
                            unset($pathMedia[$key - 1]);
                            unset($pathMedia[$key]);
                        }
                    }
                    $pathMedia = implode('/', $pathMedia);
                    $mediaFile = $this->oZip->getFromName($pathMedia);
                    if (!empty($mediaFile)) {
                        $oShape->media = "data:{$oShape->type};base64," . base64_encode($mediaFile);
                    }
                }
            }
        }

        $this->addMedia($oShape, $oSlide->baseFile);
    }

}