#!/bin/sh
set -e 

if [ ! -f package.json ]; then
    npm init -y 
    npm pkg set type=module 
fi; 

npm install express 
npm install ejs

exec nodemon app.js
