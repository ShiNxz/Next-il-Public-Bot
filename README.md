# עברית

## הסבר:

הבוט נועד על מנת לתת לשחקנים בעלי שרת דיסקורד חיצוני לפרסם את הסטטוס של שרתי המשחק אצלם בשרת בצאט מותאם במקום שיצטרכו להכנס לאתר/לשרת דיסקורד שלנו.<br />
הבוט משתמש באתר שלנו על מנת למשוך את המידע על השרתים, זאת אמרת שבמידה והאתר שלנו לא פועל, הבוט לא יעבוד.<br /><br />

## הוראות שימוש

הבוט בנוי בצורה בטוחה לשימוש ולא צורך ידע בתכנות.<br />
על מנת להשתמש בבוט יש להוריד את הכלים הבאים:

-   [Node.js](https://nodejs.org/en/)<br />

ולאחר מכן להוריד את הפורייקט למחשב באמצעות הכפתור "Code" -> "Download ZIP" ולפתוח את הפורייקט בכל תוכנת עריכת טקסט.<br />

לאחר מכן יש לפתוח את הקובץ .env ולשנות את ההגדרות בצורה הבאה:

```env
BOT_TOKEN = "" # הטוקן של הבוט - https://discordapp.com/developers/applications/me
BOT_PERMISSIONS_HASH = 8 # אין סיבה לשנות ללא ידע
REFRESH_TIME = 120 # כל כמה זמן הסטטוס יתעדכן (שניות)
CHANNEL_ID = "" # האיידי של הצאט שבו יופיע הסטטוס
CATEGORIES = "ALL" # איזה קטגוריות של שרתים אתם רוצים שיפיעו בסטטוס, לדוגמה: "Arena,Clubs,Retakes"

# אין צורך לשנות את הפרטים הבאים
WEBSITE_URI = "next-il.co.il"
DEV = "FALSE" # Should be false in production
```

לאחר מכן יש לפתוח את הקובץ `install.bat` על מנת להתקין את החבילות הדרושות על מנת להפעיל את הבוט.
ולאחר מכן יש לפתוח את הקובץ `run.bat` על מנת להדליק את הבוט.<br />

במידה והבוט לא עובד או לשאלות נוספות ניתן לפתוח טיקט בשרת הדיסקורד ונשמח לעזור לכם :) <br />
https://discord.gg/nextil

# English

This bot project made for players that own a discord server and want to get our servers status inside their discord server, instead of moving to our discord/website.<br />
The bot is using our website API server to get the servers status, it means that if our website is down for any reason, the bot will not function as well.<br /><br />

## How to install & use

The bot is built in a safe way for use and no need to know programming.<br />
You will need to download the following tools in order to use the bot:

-   [Node.js](https://nodejs.org/en/)<br />

After installing the tools, you will need to download the project by clicking on the "Code" button -> "Download ZIP" and open the project in any text editor.<br />
inside the project folder, open the `install.bat` file and wait for the installation to finish.<br />

after that you will need to open the `.env.` file and change the following settings:

```env
BOT_TOKEN = "" # The token of your bot from - https://discordapp.com/developers/applications/me
BOT_PERMISSIONS_HASH = 8 # 8 = admin
REFRESH_TIME = 120 # in seconds
CHANNEL_ID = "" # The ID of the channel you want to use the bot in
CATEGORIES = "ALL" # ALL or a list of categories separated by comma or space, example: "Arena,Clubs,Retakes"

# default and important not to change values
WEBSITE_URI = "next-il.co.il"
DEV = "FALSE" # Should be "FALSE" in production
```

After changing the settings, you will need to open the `run.bat` file in order to start the bot.<br />

for any questions or if the bot is not working, please open a ticket in our discord server and we will be happy to help you :) <br />

https://discord.gg/nextil
