#!/bin/bash
set -e

mongosh <<EOF
use $MONGO_INITDB_DATABASE;
db.createUser({
  user: "$MONGO_USER",
  pwd: "$MONGO_PASSWORD", 
  roles: [
    {
      role: "readWrite",
      db: "$MONGO_INITDB_DATABASE",
    },
  ],
});
db.createCollection("test");
db.test.insert([
	{"id": "id1", "title": "test1"},
	{"id": "id2", "title": "test2"}
]);

EOF