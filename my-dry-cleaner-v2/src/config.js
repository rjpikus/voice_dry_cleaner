// ------------------------------------------------------------------
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
      spreadsheetId: '1aamUK2kfQjnsxcL7QcBm2Uw5bTXl8BzEM-cmvsZ1hGM',
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
 };