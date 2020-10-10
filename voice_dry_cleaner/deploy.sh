#!/bin/bash
apt-get update
apt-get -y install python
apt-get -y install python-pip
pip install gspread
pip install --upgrade oauth2client
python sheets.py -b "$1"
jovo build -p alexaSkill --stage dev
sh certification.sh