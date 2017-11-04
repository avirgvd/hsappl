#!/usr/bin/env bash

curl -XPOST localhost:9200/cards/_bulk -d '
{"index": {"_index": "cards", "_type": "cards", "_id": "1"}}
{"cardorder": "1", "category": "photos", "caption": "Unprocessed", "cardimageid": "system/photos.png", "query": "", "desc": ""}
{"index": {"_index": "cards", "_type": "cards", "_id": "2"}}
{"cardorder": "2", "category": "photos", "caption": "All by date", "cardimageid": "system/photos.png", "query": "", "desc": ""}
{"index": {"_index": "cards", "_type": "cards", "_id": "3"}}
{"cardorder": "3", "category": "photos", "caption": "All by location", "cardimageid": "system/photos.png", "query": "", "desc": ""}
{"index": {"_index": "cards", "_type": "cards", "_id": "4"}}
{"cardorder": "4", "category": "photos", "caption": "All by camera", "cardimageid": "system/photos.png", "query": "", "desc": ""}
{"index": {"_index": "cards", "_type": "cards", "_id": "5"}}
{"cardorder": "5", "category": "photos", "caption": "All by upload date", "cardimageid": "system/photos.png", "query": "", "desc": ""}
{"index": {"_index": "cards", "_type": "cards", "_id": "6"}}
{"cardorder": "6", "category": "photos", "caption": "Album 1", "cardimageid": "system/photos.png", "query": "", "desc": ""}
'


curl -XPOST localhost:9200/settings/_bulk -d '
{"index": {"_index": "settings", "_type": "settings", "_id": "generalsettings"}}
{"order": "1", "category": "General Settings", "items": [{"hostname": "MyHomeServer"}, {"Device EMail": "govind.avireddi@gmail.com"}]}
{"index": {"_index": "settings", "_type": "settings", "_id": "socialnetworks"}}
{"order": "2", "category": "Social Networks Connections", "socialnetworks": []}
{"index": {"_index": "settings", "_type": "settings", "_id": "storagesettings"}}
{"order": "3", "category": "Storage", "storage": []}
'