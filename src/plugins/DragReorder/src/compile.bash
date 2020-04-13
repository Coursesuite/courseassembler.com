#!/bin/bash

if [ -f output.html ]; then
    rm output.html
fi

echo "import script and css"
tmp=$(mktemp)
awk '
    match($0, "<script type=.text/javascript. src=." jsfile ".></script>") {
        print "	<script>"
        while (getline line < jsfile) print line
        print "</script>"
        next
    }
    match($0, "<link rel=.stylesheet. type=.text/css. href=." cssfile ".>") {
        print "	<style>"
        while (getline line < cssfile) print line
        print "</style>"
        next
    }
    {print}
' jsfile=build.js cssfile=build.css build.html > "$tmp" && mv "$tmp" output.html

# awk doesn't seem to like pulling files from a different path

echo "adjust the css colour to be a handlebars variable"
sed -i '' 's/#3273dc;/{{tint_colour}};/' output.html

echo "compile into handlebars template"
# handlebars uses the name of the file to determine its template name
mv output.html quiz.renderer.handlebars
handlebars -m quiz.renderer.handlebars -f ../templates.js
mv quiz.renderer.handlebars output.html

# now we've built the template for internal rendering, we want to build a runtime version for debugging in - output.html

echo "building debug version"
sed -i '' 's/{{tint_colour}};/#3273dc;/' output.html

#echo "creates an eval-able version of the quiz json"
#if [ -f quiz.json ]; then
#	printf "window.setup=" | cat - quiz.json <(echo -n ";") | base64 > quiz.b64
#fi
# with awk you would choose quiz.b64 instead of quiz.json
# if quiz.json was a single line then you could awkthis:
#	BEGIN{
#		getline l < "quiz.json"}/\{\{\{quiz_json\}\}\}/{gsub(/\{\{\{quiz\_json\}\}\}/,l)
#	}1

echo "injecting sample quiz into debug.html"
tmp=$(mktemp)
awk '
	match($0, "{{{quiz_json}}}") {
		printf "<script type=\"text/javascript\">window.setup="
		while (getline line < quiz) print line
		print "</script>"
		next
	}
	{print}
' quiz=quiz.json output.html > "$tmp" && mv "$tmp" debug.html

rm output.html

