#!/bin/bash

timestamp() {
  date +"%Y%m%d%H%M%S"
}

TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling templates"
handlebars handlebars/ -f js/templates.js

echo "Compiling plugins"
cd plugins

cd H5P
./compile.sh
cd ..

# like this so its easier to count the nesting when you come back up
cd MicRecorderToMp3
./compile.sh
cd ..

cd QuizBuilder
./compiler.bash
cd ..

cd ..

pwd

echo "Minifying CSS"

rm -f css/app.min*.css
php ./importcss.php -icss/app.css -ocss/app.min.$TS.css
#probably a way to do this in awk if I stopped and thought about it

echo "Minifying Scripts"

# cherry pick all files with paths that are named plugin.js or templates.js, joined on one space-separated line with reference up so uglify can see out of the js folder
# to skip a file call it plugin.js.off or similar, so it doesn't end in .js
PLUGINS=$(find . -print | egrep -i '(plugin|templates).js$' | awk '{print}' ORS=' ' | sed 's/\.\//\.\.\//g')

# NOW go into the js folder
cd js

rm -f app.min*.js
rm -f app.min*.js.map
uglifyjs --keep-fnames workers/hermite/hermite.js exif.js AutoScaler.js svgLoader.js app.lib.js uiProgressButton.js mimedb.js workers/promise-worker-index.js app.core.js app.lib.fileconversion.js app.lib.puritycontrol.js app.lib.filepreview.js app.lib.downloader.js app.lib.navigation.js $PLUGINS --output app.min.$TS.js --source-map

cd ..

echo "Creating app loader"
echo "<?php" > load.php
echo "require_once('../../vendor/autoload.php');" >> load.php
echo "session_start();" >> load.php
echo "if (!isset(\$_SESSION['sesskey'])) \$_SESSION['sesskey'] = md5(time());" >> load.php
echo "\$verifier = Licence::validate(Request::get('hash'));" >> load.php
echo "\$timestamp = '$TS';" >> load.php
echo "\$minified_css = 'css/app.min.$TS.css';" >> load.php
echo "\$minified_app = 'js/app.min.$TS.js';" >> load.php
echo "?>" >> load.php

echo "Deploying app"
rm -rf ../public/app
mkdir ../public/app
cp -R ../src/* ../public/app

echo "Fixing src loader"
cat load.dev.php > load.php

echo "Cleaning previewer"
rm -rf ./preview/data/

cd plugins
cd QuizBuilder
rm -f app.min*.css
rm -f app.min*.js
if [ "$(uname)" == "Darwin" ]; then
	sed -E -i '' "s/app.min.*.css/edit.css/g" edit.html
	sed -E -i '' "s/app.min.*.js/edit.js/g" edit.html
else
#elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	sed -E --in-place='' "s/app.min.*.css/edit.css/g" edit.html
	sed -E --in-place='' "s/app.min.*.js/edit.js/g" edit.html
fi
cd ..
cd ..

# ok now we need to go into app and start messing with it
cd ../public/app

if [ "$(uname)" == "Darwin" ]; then
	sed -E -i '' "s/..\/vendor/..\/..\/vendor/g" manifest.php
else
	sed -E --in-place='' "s/..\/vendor/..\/..\/vendor/g" manifest.php
fi

echo "Copying font files"
cp -R css/font/fonts css/

echo "Cleaning root files"
rm *.bash
rm dockerCompileScript.sh
rm importcss.php
rm -f old_*.mp3
#rm test.html
rm load.dev.php

echo "Cleaning css"
cd css
rm inline.py
rm app.css
rm minify.css
rm -f *.zip
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
rm font.css
rm -rf font
cd ..

#echo "Cleaning help"
#rm -rf ./help

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
cd ..

echo "Cleaning warehouse"
cd warehouse
find . -mindepth 1 -maxdepth 1 -type d -exec rm -r {} \;
cd ..

echo "Setting permissions"
chmod -R 02777 warehouse


# todo: do the plugins scan again but pipe into rm -f

echo "Removing scorm"
cd scorm
rm -rf none/
rm -rf xapi/
rm -rf 2004/
rm -rf 1.2/
cd ..

echo "Finishing up ..."
cd ..
cd ..
rm src/js/app.min.*
rm src/css/app.min.*.css

echo "Done"