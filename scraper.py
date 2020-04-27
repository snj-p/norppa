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

introtext = ["<p>Data kaavittu <a href='http://www.cc.puv.fi/~arsj/Rekrypankkiexcel.htm' target='blank'>VAMKin Rekrypankista</a></p><p>Scraper toteutettu Pythonin Requests ja BeautifulSoup-kirjastoilla, front-endissä taas esiintyy jQuery ja axios.</p>"]
timestamp = datetime.now()
timestampstr = timestamp.strftime("%b %d %Y")
intro = [["", "", "<img src='norppa.svg'>", "<h4>norppa on rekrypankkia piristävä adaptaatio</h4>" , "", introtext, ""]]

get_data(header_rows, headers)
get_data(rows, data)

for item in data:
    result = {i:j for i, j in zip(headers[0], item)}
    output.append(result)

output = output[1:-1]

for item in intro:
    result = {i:j for i, j in zip(headers[0], item)}
    output.insert(0, result)

f = open("data.json", "w+")
f.write(json.dumps(output, sort_keys=True, indent=4))
f.close()

print("success")