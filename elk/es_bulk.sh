#!/bin/bash

if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found."
    exit 1
fi

BULK_PATH=./elasticsearch/bulk

rm -r ./logs/bulk
mkdir ./logs/bulk

curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/genre/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/genre.json ./logs/bulk/genre.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/keyword/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/keyword.json ./logs/bulk/keyword.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/company/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/company.json ./logs/bulk/company.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/channel/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/channel.json ./logs/bulk/channel.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/field/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/field.json ./logs/bulk/field.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/movie/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/movie.json ./logs/bulk/movie.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/drama/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/drama.json ./logs/bulk/drama.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/people/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/people1.json ./logs/bulk/people1.log
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/people/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/people2.json ./logs/bulk/people2.log
echo ""