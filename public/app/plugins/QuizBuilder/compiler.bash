TS=$(date +"%Y%m%d%H%M%S")

echo "Compiling templates"
handlebars render.handlebars -f templates.js

echo "Minifying App"
rm app.min*.css
rm app.min*.js
uglifycss app.css --output app.min.$TS.css
uglifyjs --keep-fnames localforage.min.js handlebars.min.js filedrop.js jscolor.min.js --output app.deps.min.js
uglifyjs templates.js app.js --output app.min.$TS.js

echo "Updating references"
rm -rf templates.js
if [ "$(uname)" == "Darwin" ]; then
	sed -E -i '' "s/app.min.(.*)css/app.min.$TS.css/g" edit.html
	sed -E -i '' "s/app.min.(.*)js/app.min.$TS.js/g" edit.html
else
#elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	sed -E --in-place='' "s/app.min.(.*)css/app.min.$TS.css/g" edit.html
	sed -E --in-place='' "s/app.min.(.*)js/app.min.$TS.js/g" edit.html
fi