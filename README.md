# MEAN Stack

* MongoDB
* Express
* Angular
* Node

*Requires MongoDB server running*

## Developing

* `npm install` to resolve dependencies
* `npm install -g gulp` to install Gulp globally
* `npm run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included by index.html
* Seed database sets: `mongoimport --db openfaces-dev --collection sets --type json --file server/openfaces-seed.json --jsonArray --drop`

* Seed database subjects: `mongoimport --db openfaces-dev --collection subjects --type json --file server/subjects-seed.json --jsonArray --drop`
