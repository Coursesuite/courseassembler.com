<?php

class XMLUtils
{
    /**
     * DOMDocument object
     *
     * @var \DOMDocument
     */
    private $dom = null;

    /**
     * DOMXpath object
     *
     * @var \DOMXpath
     */
    private $xpath = null;

    public function foobar9000() {
        return 'foobar9000';
    }

    /**
     * Get DOMDocument from ZipArchive
     *
     * @param string $zipFile
     * @param string $xmlFile
     * @return \DOMDocument|false
     * @throws \Exception
     */
    public function getDomFromZip($zipFile, $xmlFile)
    {
        if (file_exists($zipFile) === false) {
            throw new \Exception('Cannot find archive file.');
        }

        $zip = new \ZipArchive();
        $zip->open($zipFile);
        $content = $zip->getFromName($xmlFile);
        $zip->close();

        if ($content === false) {
            return false;
        }

        return $this->getDomFromString($content);
    }

    /**
     * Get DOMDocument from content string
     *
     * @param string $content
     * @return \DOMDocument
     */
    public function getDomFromString($content)
    {
        libxml_disable_entity_loader(true);
        $this->dom = new \DOMDocument();
        $this->dom->loadXML($content);

        return $this->dom;
    }

    /**
     * Get elements
     *
     * @param string $path
     * @param \DOMElement $contextNode
     * @return \DOMNodeList
     */
    public function getElements($path, \DOMElement $contextNode = null)
    {
        if ($this->dom === null) {
            return array();
        }
        if ($this->xpath === null) {
            $this->xpath = new \DOMXpath($this->dom);
        }

        if (is_null($contextNode)) {
            return $this->xpath->query($path);
        }

        return $this->xpath->query($path, $contextNode);
    }

    /**
     * Registers the namespace with the DOMXPath object
     *
     * @param string $prefix The prefix
     * @param string $namespaceURI The URI of the namespace
     * @return bool true on success or false on failure
     * @throws \InvalidArgumentException If called before having loaded the DOM document
     */
    public function registerNamespace($prefix, $namespaceURI)
    {
        if ($this->dom === null) {
            throw new \InvalidArgumentException('Dom needs to be loaded before registering a namespace');
        }
        if ($this->xpath === null) {
            $this->xpath = new \DOMXpath($this->dom);
        }
        return $this->xpath->registerNamespace($prefix, $namespaceURI);
    }

    /**
     * Get element
     *
     * @param string $path
     * @param \DOMElement $contextNode
     * @return \DOMElement|null
     */
    public function getElement($path, \DOMElement $contextNode = null)
    {
        $elements = $this->getElements($path, $contextNode);
        if ($elements->length > 0) {
            return $elements->item(0);
        }

        return null;
    }

    /**
     * Get element attribute
     *
     * @param string $attribute
     * @param \DOMElement $contextNode
     * @param string $path
     * @return string|null
     */
    public function getAttribute($attribute, \DOMElement $contextNode = null, $path = null)
    {
        $return = null;
        if ($path !== null) {
            $elements = $this->getElements($path, $contextNode);
            if ($elements->length > 0) {
                /** @var \DOMElement $node Type hint */
                $node = $elements->item(0);
                $return = $node->getAttribute($attribute);
            }
        } else {
            if ($contextNode !== null) {
                $return = $contextNode->getAttribute($attribute);
            }
        }

        return ($return == '') ? null : $return;
    }

    /**
     * Get element value
     *
     * @param string $path
     * @param \DOMElement $contextNode
     * @return string|null
     */
    public function getValue($path, \DOMElement $contextNode = null)
    {
        $elements = $this->getElements($path, $contextNode);
        if ($elements->length > 0) {
            return $elements->item(0)->nodeValue;
        }

        return null;
    }

    /**
     * Count elements
     *
     * @param string $path
     * @param \DOMElement $contextNode
     * @return integer
     */
    public function countElements($path, \DOMElement $contextNode = null)
    {
        $elements = $this->getElements($path, $contextNode);

        return $elements->length;
    }

    /**
     * Element exists
     *
     * @param string $path
     * @param \DOMElement $contextNode
     * @return boolean
     */
    public function elementExists($path, \DOMElement $contextNode = null)
    {
        return $this->getElements($path, $contextNode)->length > 0;
    }
}