import json
import re
import os.path

output_folder = "web\\"

with open("header.html", "r") as read_file:
    html_header = read_file.read()

with open("footer.html", "r") as read_file:
    html_footer = read_file.read()

############### Home (Index) ###################

with open("index-body.html", "r") as read_file:
    html_index_body = read_file.read()

index_file = open(output_folder + "index.html", "w")
home_header = html_header.replace('$$$title$$$', 'Alberto Jaspe')
home_header = home_header.replace('<a class="nav-link" href="/">', '<a class="nav-link active" href="/">')

index_file.write(home_header + html_index_body + html_footer)
index_file.close()

############### Publications ###################

publications_header = html_header.replace('$$$title$$$', 'Alberto Jaspe :: Publications')
publications_header = publications_header.replace('<a class="nav-link" href="/publications.html">', '<a class="nav-link active" href="/publications.html">')

with open("publications-body.html", "r") as read_file:
    html_publications_body = read_file.read()

with open("publications-list-template.html", "r") as read_file:
    html_publications_list_template = read_file.read()

with open("pubs.json", "r") as read_file:
     pubsDB = json.load(read_file)

pubs_list = ""

fields = re.findall(r"\$\$\$[^\$\$\$]*\$\$\$", html_publications_list_template)
fields = [element.replace('$$$', '') for element in fields]

for pub in pubsDB:
    pub_list_entry = html_publications_list_template

    pub_data = ""
    if("journal" in pub):
        pub_data += pub["journal"]
        #if("journal-data") in pub: pub_data += " " + pub["journal-data"]
        if("conference") in pub: pub_data += " (presented in " + pub["conference"] + ")"
    elif("conference" in pub):
        pub_data += pub["conference"]
    elif("book" in pub):
        pub_data += "Book: " + pub["book"]

    pub_list_entry = pub_list_entry.replace("$$$pub_data$$$", pub_data)

    for key in fields:
        to_replace = ""
        if key in pub :
            to_replace = pub[key]
        pub_list_entry = pub_list_entry.replace("$$$"+key+"$$$", to_replace)
    pubs_list += pub_list_entry


html_index_body_filled = html_publications_body.replace("$$$PUBLICATION_LIST$$$", pubs_list)


publications_file = open(output_folder + "publications.html", "w")
publications_file.write(publications_header + html_index_body_filled + html_footer)
publications_file.close()

### Every single publication website

with open("one-publication-template-body.html", "r") as read_file:
    one_publication_template_body = read_file.read()

fields = re.findall(r"\$\$\$[^\$\$\$]*\$\$\$", one_publication_template_body)
fields = [element.replace('$$$', '') for element in fields]

for pub in pubsDB:
    pub_html = one_publication_template_body

    for key in fields:
        to_replace = ""
        if key in pub :
            to_replace = pub[key]
        pub_html = pub_html.replace("$$$"+key+"$$$", to_replace)
    
    publications_file = open(output_folder + "\\publications\\" + pub["code"] + ".html", "w")
    publications_file.write(html_header + pub_html + html_footer)
    publications_file.close()


#############
# import json
# import bibtexparser
# from bibtexparser.bparser import BibTexParser
# from bibtexparser.customization import convert_to_unicode


# # with open("generator\\test.json", "r") as read_file:
# #     data = json.load(read_file)

# # print(data)

# # with open("generator\\template.html", "r") as fTemplate:
# #     template = fTemplate.read()

# # x = template.replace("$$$TEST$$$", "mis movidas")
# # print(x)

# with open('generator\\mybib.bib', "r") as bibtex_file:
#     parser = BibTexParser()
#     parser.customization = convert_to_unicode
#     bib_database = bibtexparser.load(bibtex_file, parser=parser)


# for i in bib_database.entries:
#     if i["ID"] == "Hernandez:2005:RTV":
#         print(i)
