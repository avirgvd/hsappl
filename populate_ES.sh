#!/usr/bin/env bash

curl -XPOST localhost:9200/cards/_bulk -d '
{"index": {"_index": "cards", "_type": "cards", "_id": "1"}}
{"cardorder": "1", "category": "photos", "caption": "Unprocessed", "cardimageid": "system/photos.png", "query": "unprocessed", "desc": ""}
{"index": {"_index": "cards", "_type": "cards", "_id": "2"}}
{"cardorder": "2", "category": "photos", "caption": "All", "cardimageid": "system/photos.png", "query": "all", "desc": "shows all photos"}
{"index": {"_index": "cards", "_type": "cards", "_id": "3"}}
{"cardorder": "3", "category": "photos", "caption": "Album 1", "cardimageid": "system/photos.png", "query": "album1", "desc": ""}
'

curl -XPOST localhost:9200/directories/_bulk -d '
{"index": {"_index": "directories", "_type": "directories", "_id": "1"}}
{"sequence": "1", "categories": "photos", "default_caption": "Unprocessed", "disp_imageid": "system/photos.png", "name": "unprocessed", "desc": ""}
{"index": {"_index": "directories", "_type": "directories", "_id": "2"}}
{"sequence": "2", "categories": "photos", "default_caption": "All", "disp_imageid": "system/photos.png", "name": "all", "desc": "shows all photos"}
{"index": {"_index": "directories", "_type": "directories", "_id": "3"}}
{"sequence": "3", "categories": "photos", "default_caption": "Album 1", "disp_imageid": "system/photos.png", "name": "album1", "desc": ""}
{"index": {"_index": "directories", "_type": "directories", "_id": "4"}}
{"sequence": "1", "categories": "digitallibrary", "default_caption": "All", "disp_imageid": "system/DigitalLibrary.png", "name": "all", "desc": ""}
'


curl -XPOST localhost:9200/settings/_bulk -d '
{"index": {"_index": "settings", "_type": "settings", "_id": "generalsettings"}}
{"order": "1", "category": "General Settings", "items": [{"hostname": "MyHomeServer"}, {"Device EMail": "govind.avireddi@gmail.com"}]}
{"index": {"_index": "settings", "_type": "settings", "_id": "socialnetworks"}}
{"order": "2", "category": "Social Networks Connections", "socialnetworks": []}
{"index": {"_index": "settings", "_type": "settings", "_id": "storagesettings"}}
{"order": "3", "category": "Storage", "storage": []}
'