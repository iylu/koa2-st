# !/bin/sh

sudo mongod --dbpath /data/db

echo "Mongo is running!"

#mongo db_name --eval "db.admins.remove({})"
#mongo db_name --eval "db.admins.save({username: 'admin', password: 'test123456'})"