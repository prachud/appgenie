import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pymongo import MongoClient

#Change this to add more email addresses e.g. 'daniel@gmail.com,praveen@gmail.com'
groupEmail = 'praveen.vattikonda@innogy.com'

def main():
    # Data should be where emailSent = False
    data,collection = connect()

    if data.count() == 0:
        print ("No action required")
        return True
    
    for row in data:
        mailBody = createMailBody(row)
        mailString = createMailString(row)
        mailSubject = row['refNum']
        emailResult = sendEmails(mailString,mailBody,mailSubject)
        if not emailResult:
            print ("Error with sending email - Perhaps the email address is not valid?")
            return False
        result = setTrue(row,collection)
        if not result:
            print ("Error with updating database")
            return False
    return True

def createMailBody(row):
    defaultEmail = "Hi Team, Please {} the following email address from ANAs:\n {} \n \n {}".format(row['reqType'],row['anaName'],row['userEmail']) 
    return defaultEmail
def createMailString(row):
    # This email should change to the group email after testing
    email = groupEmail
    email += ', ' + row['email']
    return  email



def sendEmails(mailString,mailBody,mailSubject):
    try:
        server = smtplib.SMTP('bridgehead.npower.com', 25)
    except:
        print ("Email server could not be connected")
        return False

    msg = MIMEMultipart()
    message = mailBody
    msg['From'] = "test@npower.com"
    msg['To'] = mailString
    msg['Subject'] = mailSubject
    msg.attach(MIMEText(message, 'plain'))

    # send the message via the server set up earlier.
    try:
        print ("Sending email..")
        server.send_message(msg)
    except:
        print ("Email failed to send - Check email ID's")
        return False

    del msg
    server.quit()
    return True

def setTrue(row,collection):
    try:
        myquery = {'_id': row['_id']}
        newValues = {"$set": {"emailSent":True}}
        collection.update(myquery,newValues)
        return True
    except:
        return False
    


def connect():
    client = MongoClient('localhost',27017)
    # Connect to HCData
    db = client.edi
    # Connect to the correct collection
    collection = db.edi

    # Returning a list of dictionaries with all the data in it
    return collection.find({'emailSent':False}),collection


if __name__ == "__main__":

    result = main()
    if result:
        print ("Script completed sucessfully")
    else:
        print ("Script failed. Please refer to error statements in terminal")
