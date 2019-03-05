#!/bin/bash

# Run as www-data user

hb=/usr/local/lib/node_modules/handlebars/bin/handlebars
miniJs=/usr/local/lib/node_modules/uglify-es/bin/uglifyjs
miniCss=/usr/local/lib/node_modules/uglifycss/uglifycss

cd /docninja/public/app/

timestamp() {
  date +"%Y%m%d%H%M%S"
}

TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling templates"
$hb handlebars/ -f js/templates.js

echo "Minifying CSS"
cd css
rm app.min.*css
python inline.py app.css
$miniCss --output app.min.$TS.css app.inlined.css 
rm app.inlined.css
cd ..


echo "Minifying Scripts"
cd js
rm head.min*.js
$miniJs modernizr.custom.js --output head.min.$TS.js

rm app.min*.js
$miniJs ./workers/hermite/hermite.js ./workers/promise-worker-index.js AutoScaler.js color-thief.js exif.js mimedb.js svgLoader.js templates.js uiProgressButton.js app.core.js app.lib.js app.lib.fileconversion.js app.lib.puritycontrol.js app.lib.filepreview.js app.lib.downloader.js app.lib.navigation.js app.plugin.page.js --output app.min.$TS.js

cd ..

echo "Updating index file references"
echo "<?php" > variables.php
echo "\$minified_css = 'css/app.min.$TS.css';" >> variables.php
echo "\$minified_app = 'js/app.min.$TS.js';" >> variables.php
echo "\$minified_head = 'js/head.min.$TS.js';" >> variables.php
echo "?>" >> variables.php

echo "Creating deployment folder"

rm -r -f ../../deploy
cp -R ../../public ../../deploy
rm -r ../../deploy/app/handlebars
rm -f ../../deploy/app/compile_scripts.bash
rm -f ../../deploy/app/error_log
rm -r -f ../../deploy/app/help
rm -r -f ../../deploy/app/depreciated
rm -f ../../deploy/app/help.php

rm ../../deploy/app/css/font.zip
rm ../../deploy/app/css/app.banner.css
rm ../../deploy/app/css/app.base.css
rm ../../deploy/app/css/app.buttons.css
rm ../../deploy/app/css/app.cogmenu.css
rm ../../deploy/app/css/minify.css
rm ../../deploy/app/css/normalize.css
rm ../../deploy/app/css/CircularProgressButton.css
rm ../../deploy/app/css/app.css

rm -r -f ../../deploy/app/layouts/depreciated/

rm -r -f ../../deploy/app/js/apps/
rm -r -f ../../deploy/app/js/zip/

rm -r -f ../../deploy/app/scorm/none/
rm -r -f ../../deploy/app/scorm/xapi/
rm -r -f ../../deploy/app/scorm/2004/
rm -r -f ../../deploy/app/scorm/1.2/

rm -r -f ../../deploy/app/js/modernizr.custom.js

rm ../../deploy/app/js/svgLoader.js
rm ../../deploy/app/js/templates.js
rm ../../deploy/app/js/uiProgressButton.js
rm ../../deploy/app/js/AutoScaler.js
rm ../../deploy/app/js/exif.js
rm ../../deploy/app/js/mimedb.js
rm ../../deploy/app/js/color-thief.js
rm ../../deploy/app/js/workers/promise-worker-index.js
rm ../../deploy/app/js/workers/hermite/hermite.js
rm ../../deploy/app/js/app.plugin.*.js
rm ../../deploy/app/js/app.lib.*.js
rm ../../deploy/app/js/app.core.js
rm ../../deploy/app/js/app.lib.js
