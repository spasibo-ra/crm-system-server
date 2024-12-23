echo "===== Hello from test =====";

echo "===== set env variables for test ====="
export $(grep -v '^#' .env.test | xargs)

pg_dump --schema-only crm | gzip > test_db_dump.gz; 
echo "===== Created dump =====";
echo "DROP DATABASE IF EXISTS crm_test;" | psql -d crm > /dev/null 2>&1;
echo "CREATE DATABASE crm_test;" | psql -d crm > /dev/null 2>&1;
echo "===== Created crm_test =====";
gunzip -c test_db_dump.gz | psql > /dev/null 2>&1;
rm test_db_dump.gz;

echo "===== tests started ====="
./node_modules/jest/bin/jest.js --config ./test/jest-e2e.json --runInBand --forceExit

echo "===== unset env variables ====="
unset $(grep -v '^#' .env.test | sed -E 's/(.*)=.*/\1/' | xargs)