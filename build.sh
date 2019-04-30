#!/bin/bash
set -e

cd frontend
rm -rf build/
echo Starting Frontend Bundling ...
npm run build &> /dev/null
echo Frontend bundled succesfully $'\u2714' $'\u2714'

cd ../electron-app
rm -rf build/ dist/
mv ../frontend/build/ .
echo Starting Electron build ...
npm run build &> /dev/null
echo Your app is bundled $'\u2714'