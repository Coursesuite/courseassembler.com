#!/bin/bash

TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling source"

cd src
./compile.bash
cd ..

echo "Minifying QuizBuilder"
rm -f app.min*.css
rm -f app.min*.js
uglifycss edit.css --output app.min.$TS.css
# uglifyjs --keep-fnames localforage.min.js handlebars.min.js filedrop.js jscolor.min.js --output app.deps.min.js
uglifyjs edit.js --output app.min.$TS.js

echo "Updating references"

if [ "$(uname)" == "Darwin" ]; then
	sed -E -i '' "s/edit.css/app.min.$TS.css/g" edit.html
	sed -E -i '' "s/edit.js/app.min.$TS.js/g" edit.html
else
#elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	sed -E --in-place='' "s/edit.css/app.min.$TS.css/g" edit.html
	sed -E --in-place='' "s/edit.js/app.min.$TS.js/g" edit.html
fi