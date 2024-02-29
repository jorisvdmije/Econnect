import json

with open('/Users/jorisvdmije/Desktop/programming/webscraping/da.json', 'r') as file:
    data = json.load(file)

data["a"] = [1,2,3]

with open('/Users/jorisvdmije/Desktop/programming/webscraping/da.json', 'w') as file:
    json.dump(data, file, indent=4)