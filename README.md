Very simple way to keep an eye on your WebDirect server.
Recieve a warning email whenever Filemaker WebDirect Server is down.

## Synopsis
This application checks to make sure Filemaker WebDirect Server is running.
It goes to your Filemaker Webdirect Sample Database page and checks that it's live. If the server is down, application emails you a warning email with a PNG screenshot of the page attached.
It uses Node JS, Headless Chrome, Puppeteer and Nodemailer.

## Dependencies
Must have [Google Chrome](https://www.google.ca/chrome/browser/features.html)
Must have [Node JS](https://nodejs.org/en/)

## Setup
1. Download / clone the repository to c:\program files\webdchecker\

2. Install Node and Chrome

3. Navigate to the repository from the command line.

4. Add Puppeteer to your directory with:
node i Puppeteer

5. Add Nodemailer to your directory with:
node i Nodemailer

## Configure
Edit config.js
1. Set WebDirect sample page
2. Set email parameters
3. Set string to check against (normally Tasks for the Filemaker test Database) 

## Schedule
Add the schedule in to task scheduler to run the index.js file from this directory with the frequency of your choice.
1. program "C:\Program Files\nodejs\node.exe"
2. parameters "C:\program files\webdchecker\index.js"
