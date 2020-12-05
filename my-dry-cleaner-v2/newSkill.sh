#!/bin/bash
echo "Building template skill"
echo ""
ask new --url https://github.com/alexa/skill-sample-nodejs-hello-world.git --skill-name hello-world 
cd hello-world/ 
ask deploy -p default 
cd ../
# echo "Installing Dependencies"
# echo ""
# apt-get update
# apt-get -y install python
# apt-get -y install python-pip
# pip install gspread
# pip install --upgrade oauth2client
python newSkill.py
jovo build -d -p alexaSkill -t model  --stage prod
jovo build -d -p alexaSkill -t info --stage prod
rm -rf hello-world