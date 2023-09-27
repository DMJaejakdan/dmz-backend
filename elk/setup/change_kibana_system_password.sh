#!/bin/bash

# Load environmental variables from .env file
if [ -f .env ]; then
  source .env
fi

# Access the environmental variables
echo "NEW_PASSWORD: $ELK_PASSWORD"

# Change the kibana_system password
curl -X POST "http://localhost:3200/_security/user/kibana_system/_password" -H "Content-Type: application/json" -d '{
  "password": "'"${NEW_PASSWORD}"'"
}'
