TS=$(date +"%Y%m%d%H%M%S")
echo "Minifying plugin"

rm edit.min*.css
rm edit.min*.js

uglifycss edit.css --output edit.min.$TS.css
uglifyjs --keep-fnames ../../js/app.lib.js edit.js --output edit.min.$TS.js

echo "Updating references"
if [ "$(uname)" == "Darwin" ]; then
	sed -E -i '' "s/edit.min.(.*)css/edit.min.$TS.css/g" edit.html
	sed -E -i '' "s/edit.min.(.*)js/edit.min.$TS.js/g" edit.html
else
#elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	sed -E --in-place='' "s/edit.min.(.*)css/edit.min.$TS.css/g" edit.html
	sed -E --in-place='' "s/edit.min.(.*)js/edit.min.$TS.js/g" edit.html
fi