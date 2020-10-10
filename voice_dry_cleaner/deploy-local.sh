#!/bin/bash
# ONLY RUN FROM LOCAL MACHINE
# This script updates the provided app
# Updates Skill Model
# Updates Skill Manifest (info)
# run with the command:
# sudo sh deploy-local.sh "<name-of-cleaner>"
cd python_scripts/
echo "Building config.js for $1"
python config.py -b "$1"
echo "Success"
echo " "
echo "Updating faq to match keys"
python update.py -b "$1"
echo "Success"
echo " "
echo "Building app.js for $1"
python app.py -b "$1"
echo "Success"
echo " "
echo "Creating displayAPL.js"
python displayAPL.py -b "$1"
echo "Success"
echo " "
echo "Building language model for $1"
python model.py -b "$1"
echo "Success"
echo " "
echo "Building project.js for $1"
python project.py -b "$1"
echo "Success"
echo " "
echo "Deplying Local"
cd ../
jovo build -d -p alexaSkill --stage local --t info
jovo build -d -p alexaSkill --stage local --t model
echo "Success"
echo " "
echo "Running local webhook"
jovo run