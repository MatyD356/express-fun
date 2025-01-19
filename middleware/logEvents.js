import fs from 'fs'
import path from 'path'
import fsPromises from 'fs/promises'
import {fileURLToPath} from 'url'
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, fileName) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}`
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), `${logItem}\n`)
        console.log(`${logItem}\n`)
    } catch( err ) {
        console.error(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'reqLog.txt')
    next()
}

export {logger, logEvents}