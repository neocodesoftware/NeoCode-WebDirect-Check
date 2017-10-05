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
Download / clone the repository.
Install Node and/or Chrome if you don't have them.

Navigate to the repository from the command line.

Add Puppeteer to your directory with:
node i Puppeteer

Add Nodemailer to your directory with:
node i Nodemailer

All the setup for your WebDirect sample page, email parameters and string to check against (normally Tasks for the Filemaker test Database) should be done through config.js.
Add the schedule in your task scheduler to run the index.js file from this directory with the frequency of your choice.