<?php defined("APP")?assert(true):die(); ?>
	<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" />
	<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js"></script>
	<script>
	window.addEventListener("load", function(){
	window.cookieconsent.initialise({
	  "palette": {
	    "popup": {
	      "background": "#252e39"
	    },
	    "button": {
	      "background": "#14a7d0"
	    }
	  },
	  "theme": "edgeless",
	  "content": {
	    "message": "This app requires the use cookies and local storage in your browser.",
	    "href": "/privacy"
	  }
	})});
	</script>