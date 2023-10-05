#!/bin/bash

if [ -f .env ]; then
    source .env
else
    echo "Error: .env file not found."
    exit 1
fi

BULK_PATH=./elasticsearch/bulk

curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/genre/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/genre.json
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/keyword/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/keyword.json
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/company/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/company.json
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/channel/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/channel.json
echo ""
curl -X POST -u elastic:$ELK_PASSWORD "http://localhost:3200/field/_bulk?pretty" -H "Content-Type: application/x-ndjson" --data-binary @$BULK_PATH/field.json
echo ""