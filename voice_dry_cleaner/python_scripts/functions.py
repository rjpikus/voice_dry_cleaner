import gspread
from oauth2client.service_account import ServiceAccountCredentials

def authorizeGoogleSheet():
    scope = ['https://spreadsheets.google.com/feeds',
		    'https://www.googleapis.com/auth/drive']

    credentials = ServiceAccountCredentials.from_json_keyfile_name('google-sheets.json', scope)

    gc = gspread.authorize(credentials)

    return gc.open_by_key('1qK6bTIt7kRJxR1he222fUGnPlPRv3xZinvUZdsR_9fY')


def getGoogleSheetId(company):
    """ Gets the googlesheet Id from global cms sheet
        Args:
            company: Name of the dry cleaner
        Returns:
            GoogleSheet Id
    """
    sh = authorizeGoogleSheet()
    worksheet = sh.worksheet("PublishingInfo")
    cell = worksheet.find(company)
    sheetLink = worksheet.cell(cell.row,8).value
    sheetId= sheetLink[sheetLink.find('d/'):sheetLink.find('/edit')]
    sheetId = sheetId[2:]

    return sheetId

def fileWriter(fileName,writeType,text) :
    """ Writes the text to the appropriate file
       
        Args:
            fileName:The directory path to the file 
            writeType: The type either w+ for overwrite or a+ for append and create if file is not present, or a for append only
            text: The string you are writing into the file
        
        Updates:
            fileName with the new information contained in text parameter
    """
    f = open(fileName,writeType)
    f.write(text)
    f.close()

def getSkillId() :
    """ Gets the skill Id from config file of newly created skill
        
        Returns:
            Skill Id
    """
    fileName ="hello-world/.ask/config"
    print("\n Getting Skill Id of newly created skill")
    file = open(fileName,'r')
    content = file.read()
    file.close()
    crap = content.split("\n")
    crap = "".join(crap)
    id = crap.replace("{","")
    sam = id[id.find("amzn"):id.find("lambda"):1]
    id = sam[sam.find("amzn1"):sam.find("\"")]
    return id

def getLambda():
    """ Gets the lambda arn from config file of newly created skill
        
        Returns:
            Lambda ARN
    """
    fileName ="hello-world/.ask/config"
    file = open(fileName,'r')
    content = file.read()
    file.close()
    crap = content.split("\n")
    crap = "".join(crap)
    id = crap.replace("{","")
    skillLambda = id
    skillLambda = skillLambda[skillLambda.find("arn"):skillLambda.find("awsRegion")]
    skillLambda = skillLambda.replace("arn\":","")
    skillLambda = skillLambda.replace("\"","")
    skillLambda = skillLambda[skillLambda.find("arn"):skillLambda.find(",")]
    return skillLambda
