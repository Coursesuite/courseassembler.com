#!/bin/bash

TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling source"

cd src
./compile.bash
cd ..

exit
# later we need to add this to minify for publishing to the app folder

echo "Minifying QuizBuilder"
rm app.min*.css
rm app.min*.js
uglifycss app.css --output app.min.$TS.css
# uglifyjs --keep-fnames localforage.min.js handlebars.min.js filedrop.js jscolor.min.js --output app.deps.min.js
uglifyjs app.js --output app.min.$TS.js

echo "Updating references"

if [ "$(uname)" == "Darwin" ]; then
	sed -E -i '' "s/app.css/app.min.$TS.css/g" edit.html
	sed -E -i '' "s/app.js/app.min.$TS.js/g" edit.html
else
#elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	sed -E --in-place='' "s/app.css/app.min.$TS.css/g" edit.html
	sed -E --in-place='' "s/app.js/app.min.$TS.js/g" edit.html
fi