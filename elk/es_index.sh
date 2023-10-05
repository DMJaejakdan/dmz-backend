#!/bin/bash

if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found."
    exit 1
fi

INDEX_PATH=./elasticsearch/index

curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/genre" -H "Content-Type: application/json" -d @$INDEX_PATH/genre.json
echo ""
curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/keyword" -H "Content-Type: application/json" -d @$INDEX_PATH/keyword.json
echo ""
curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/company" -H "Content-Type: application/json" -d @$INDEX_PATH/company.json
echo ""
curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/channel" -H "Content-Type: application/json" -d @$INDEX_PATH/channel.json
echo ""
curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/field" -H "Content-Type: application/json" -d @$INDEX_PATH/field.json
echo ""
curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/movie" -H "Content-Type: application/json" -d @$INDEX_PATH/movie.json
echo ""
curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/drama" -H "Content-Type: application/json" -d @$INDEX_PATH/drama.json
echo ""
curl -X PUT -u elastic:$ELK_PASSWORD "http://localhost:3200/people" -H "Content-Type: application/json" -d @$INDEX_PATH/people.json
echo ""