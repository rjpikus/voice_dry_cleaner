import optparse
import os
import json
from functions import getGoogleSheetId, fileWriter

parser = optparse.OptionParser('usage%prog'+'--name<name>')
parser.add_option('-b',dest='name', help='name of the dry cleaner')
(options,args) = parser.parse_args()
name = options.name
sheetId = getGoogleSheetId(name)

config = """// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  logging: true,

  intentMap: {
      'AMAZON.YesIntent' : 'YesIntent',
      'AMAZON.NoIntent' : 'NoIntent',
      'AMAZON.CancelIntent' : 'CancelIntent',
      'AMAZON.HelpIntent' : 'HelpIntent',
      'AMAZON.StopIntent': 'END',
  },
  cms: {
    GoogleSheetsCMS: {
      spreadsheetId: '%s',
      access: 'private',
      credentialsFile: './credentials/google-sheets.json',
      sheets: [
        {
          name:'responses',
          type:'Responses',
          position: 1,
        },
        {
          name:'faq',
          type:'Responses',
          position: 2,
        }
      ]
    }
  },
  db: {
    DynamoDb: {
        tableName: 'dynamo-test',
        awsConfig: {
            accessKeyId: 'AKIAJK3POB6ULHCE2CJQ',
            secretAccessKey: '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', 
            region:  'us-east-1',
        }
    }
  }
 };"""%(sheetId)

fileWriter("../src/config.js","w+",config)