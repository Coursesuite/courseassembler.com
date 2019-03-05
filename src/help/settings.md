###Metadata
Your package needs a name - this becomes the name of the download file, and is also used in the packages IMS Manifest file.

Description and Copyright are both optional fields and are also stored in the IMS Manifest, as well as shown in a popup informtion page (depending on the design). Your LMS may use this information. Keep this short.

###Navigation
Navigation in the page is such that a learner may click on any page at any time (default). You can also choose to force the user to only move forwards in sequence (no skipping pages).

###Completion
Completion is set here. By default, package completion is only calculated when the learner views the last page, however you are also able to set a particular page which causes course completion to be calculated.

> A page is considered complete when the user has looked at it for 1 second.
> In case of video or audio packages, the amount of time that needs to pass before the completion occurs can be set.

###Packaging
You need to specify which type of Manifest will be generated with the package. Most SCORM-compliant LMS's support revision 1.2.

* **1.2 or 2004** - These are the typical SCORM versions that we support. Some LMS's may support one or the other (or both).
* **IMS Content Package** - This is a special format which can be used by some LMS's. For instance, Moodle supports importing a Book activity from IMS Content Packages. When selected, the Design is not relevant since the package deals with raw files and metadata only.
* **No wrapper** - If you want to package up what you have done so far and re-upload it later to continue working on it, or just want the raw HTML results, choose this option.

##Design

When the package is exported, a pre-built template is loaded and references to your pages are embedded into some Javascript code in the template, which is used by the package when it is run inside an LMS.

You can pick from a number of built-in designs, as listed on the page. Simply click the design you like.

Colours are applied to the designs (where appropriate - some designs do not feature a menu or index). The colours are:

* **Fill** - this is the base colour of the design. It is the button colour.
* **Text** - the colour of text on a base colour
* **Selected** - the colour of buttons when the mouse is over them, or [in menus] the colour of the current menu item.
* **Selected text** - the colour of text on the current menu item.

