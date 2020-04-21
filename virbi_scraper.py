# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import time
import json
import requests
from datetime import datetime

def get_data(rows, output):
    for tr in rows:
        td = tr.findAll('td')
        row = [item.text for item in td if item.text != '']
        output.append(row)

req = requests.get('http://www.cc.puv.fi/~arsj/Rekrypankkiexcel_files/sheet001.htm')
req_stripped = req.text.replace("\t", "").replace("\r", "").replace("\n", "")
soup = BeautifulSoup(req_stripped, "lxml")

table = soup.find('table')
rows = soup.table.findAll('tr')
header_rows = table.findAll('tr')[0:1]

data = []
headers = []
output = []

introtext = ["tein tällasen :D kaavittu täältä <a href='http://www.cc.puv.fi/~arsj/Rekrypankkiexcel.htm' target='_blank'>http://www.cc.puv.fi/~arsj/Rekrypankkiexcel.htm</a> pythonilla (requests ja beautifulsoup) :D oikeelta löytyy teemanappi (yö (vähä niinku se bändi :D) tai lumisokeus) :D frontissa esintyy myös jquery + axios :D"]
timestamp = datetime.now()
timestampstr = timestamp.strftime("%b %d %Y")
intro = [["Virbi Is an", "Recruitment Bank", "VIRBI", introtext , timestampstr, "Päivitetty viimeksi", "Improvement"]]

get_data(header_rows, headers)
get_data(rows, data)

for item in data:
    result = {i:j for i, j in zip(headers[0], item)}
    output.append(result)

output = output[1:-1]

for item in intro:
    result = {i:j for i, j in zip(headers[0], item)}
    output.insert(0, result)

f = open("virbi_data.json", "w+")
f.write(json.dumps(output, sort_keys=True, indent=4))
f.close()

print("success")