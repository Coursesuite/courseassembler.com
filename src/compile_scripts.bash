#!/bin/bash

timestamp() {
  date +"%Y%m%d%H%M%S"
}

TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling templates"
handlebars handlebars/ -f js/templates.js

echo "Compiling plugins"
cd plugins
cd MicRecorderToMp3
./compile.sh

cd ..
cd QuizBuilder
./compiler.bash

cd ..
cd ..

echo "Minifying CSS"

rm css/app.min*.css
php ./importcss.php -icss/app.css -ocss/app.min.$TS.css

echo "Minifying Scripts"
cd js
rm head.min*.js
uglifyjs --keep-fnames modernizr.custom.js --output head.min.$TS.js

rm app.min*.js
uglifyjs --keep-fnames workers/hermite/hermite.js exif.js AutoScaler.js svgLoader.js app.lib.js templates.js uiProgressButton.js mimedb.js workers/promise-worker-index.js app.core.js app.lib.fileconversion.js app.lib.puritycontrol.js app.lib.filepreview.js app.lib.downloader.js app.lib.navigation.js app.plugin.page.js --output app.min.$TS.js

cd ..

echo "Creating variables include"
echo "<?php" > variables.php
echo "\$timestamp = '$TS';" >> variables.php
echo "\$minified_css = 'css/app.min.$TS.css';" >> variables.php
echo "\$minified_app = 'js/app.min.$TS.js';" >> variables.php
echo "\$minified_head = 'js/head.min.$TS.js';" >> variables.php
echo "?>" >> variables.php

echo "Deploying app"
rm -rf ../public/app
mkdir ../public/app
cp -R ../src/* ../public/app

echo "Creating app loader"
echo "<?php" > ../public/app/load.php
echo "require_once('../../vendor/autoload.php');" >> ../public/app/load.php
echo "?>" >> ../public/app/load.php

echo "Cleaning root files"
cd ../public/app
rm *.bash
rm dockerCompileScript.sh
rm importcss.php
rm old_*.mp3
rm test.html

echo "Cleaning css"
cd css
rm inline.py
rm app.css
rm minify.css
rm font.zip
rm variables.css
rm normalize.css
rm CircularProgressButton.css
rm app.base.css
rm app.banner.css
rm app.nav.css
rm app.buttons.css
rm app.cogmenu.css
rm app.modals.css
rm documents.*.css
rm design.*.css
rm download.*.css
cd ..

echo "Cleaning help"
rm -rf ./help

echo "Cleaning handlebars"
rm -rf ./handlebars

echo "Cleaning javascript"
cd js
rm workers/hermite/hermite.js
rm exif.js
rm AutoScaler.js
rm svgLoader.js
rm app.lib.js
rm templates.js
rm uiProgressButton.js
rm mimedb.js
rm workers/promise-worker-index.js
rm app.core.js
rm app.lib.fileconversion.js
rm app.lib.puritycontrol.js
rm app.lib.filepreview.js
rm app.lib.downloader.js
rm app.lib.navigation.js
rm app.lib.edithandler.js
rm app.plugin.page.js
rm modernizr.custom.js
cd ..

echo "Removing scorm"
cd scorm
rm -rf none/
rm -rf xapi/
rm -rf 2004/
rm -rf 1.2/
cd ..

echo "Finished"
cd ..
cd ..
