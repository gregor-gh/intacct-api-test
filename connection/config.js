require('dotenv').config();
const IA = require("@intacct/intacct-sdk");
let config = new IA.ClientConfig();
config.senderId = process.env.SENDERID;
config.senderPassword = process.env.SENDERPW;
config.companyId = process.env.COMPANY;
// config.entityId = "testentity";
config.userId = process.env.USERID;
config.userPassword = process.env.USERPW;


const client = new IA.OnlineClient(config)

module.exports = client