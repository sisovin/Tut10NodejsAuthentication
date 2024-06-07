const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        // When Error: ENOENT: no such file or directory, open 'C:\Users\user\Documents\NodejsTest04\logs\eventlog.txt'
        // The directory 'logs' does not exist. Create it.
        if (!fs.existsSync(path.join(__dirname, `..`, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, `..`, 'logs'));
        }
        // Testing the appendFile method
        await fsPromises.appendFile(path.join(__dirname, `..`, 'logs', logName), logItem);
    }
    catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    // log the request
    logEvents(`[${new Date().toLocaleString()}]\t${req.method}\t${req.headers.origin}\t${req.url}`, `reglog.txt`);
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, logEvents };

/* type: npm i cors */
