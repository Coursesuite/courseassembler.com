import sys
import os
import re

regex = re.compile(r"^(?:[@]import[ ]url[(][\'\"])(.*)(?:[\'\"][)][;])")

DIR = os.path.dirname(os.path.realpath(__file__))

#Open input file and create new file for copying
finput = sys.argv[1]
main = open(DIR + "/" + finput, "r")
i = finput.index(".css")
finline = finput[:i] + ".inlined" + finput[i:]
inlined = open(finline, "w+")

# check if line matches @import regex, if it does open the file and copy contents to new inlined file, otherwise just copy the line to the new inlined file
for line in main.readlines():
	matched = re.match(regex,line)
	if (matched):
		fsub = open(DIR + "/" + matched.group(1), 'r')
		sub = fsub.read()
		inlined.write(sub)
		fsub.close()
	else:
		inlined.write(line)

main.close()
inlined.close()