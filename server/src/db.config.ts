import 'dotenv/config';


const dbName = process.env.DB_NAME ||"taskmaster";
const dbHost = "127.0.0.1";
const dbPort = 271017;
module.exports = {
    url: `mongodb://${dbHost}:${dbPort}/${dbName}`
}