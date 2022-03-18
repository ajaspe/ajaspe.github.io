import json
import re
import os.path

with open("pubs.json", "r") as read_file:
     pubsDB = json.load(read_file)

for pub in pubsDB:
	filename = pub["code"] + ".md"
	with open(filename, 'x') as f:
		f.write("---\n\n")
		for majorkey, subdict in pub.items():
			if majorkey == "projects":
				f.write("projects: \n")
				for p in subdict:
					f.write(" - " + p + "\n")
			elif majorkey == "title" or majorkey == "abstract" or majorkey=="journal-data" or majorkey=="journal":
				f.write(majorkey + ": \"" + subdict + "\"\n")
			else:
				f.write(majorkey + ": " + subdict + "\n")
		f.write("\n---")
		f.close()
