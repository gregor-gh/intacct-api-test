var express = require('express');
var router = express.Router();
const client = require("../connection/config.js")
const IA = require("@intacct/intacct-sdk");
const bcrypt = require("bcrypt");
const db = require("../database/db");
require ("dotenv").config()

router.get("/general", async (req, res) => {

  let query = new IA.Functions.Common.ReadByQuery();
  query.objectName = "GLACCOUNT";
  query.pageSize = 1000;
  query.fields = [
    "RECORDNO",
    "ACCOUNTNO",
    "TITLE",
    "ACCOUNTTYPE",
    "NORMALBALANCE"
  ];

  const readResponse = await client.execute(query);
  const readResults = readResponse.results[0].data;

  res.send(readResults);
});

router.post("/general/add", async (req, res) => {

  const account = req.body;

  let create = new IA.Functions.GeneralLedger.AccountCreate();
  create.accountNo = account.accountNo;
  create.title = account.title;
  create.accountType = account.accountType;
  create.normalBalance = account.normalBalance;
  if (account.accountType == "incomestatement") { // hard coding retained earnings rather than add more fields to the add interface
    create.closeIntoGlAccountNo = "35000"
    create.closingType = "closed to account"
  }

  try {
    const createResponse = await client.execute(create);
    const createResult = createResponse.getResult();
    res.send(createResult);
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
});

router.put("/general/add", async (req, res) => {

  const account = req.body;

  let update = new IA.Functions.GeneralLedger.AccountUpdate();
  update.accountNo = account.accountNo;
  update.title = account.title;
  update.accountType = account.accountType;
  update.normalBalance = account.normalBalance;

  if (account.accountType == "incomestatement") { // hard coding retained earnings rather than add more fields to the add interface
    update.closeIntoGlAccountNo = "35000"
    update.closingType = "closed to account"
  } else {
    update.closeIntoGlAccountNo = ""
    update.closingType = "non-closing account"
  }

  try {
    const updateResponse = await client.execute(update);
    const updateResult = updateResponse.getResult();
    res.send(updateResult);
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
});

router.delete("/general/delete", async (req, res) => {

  const account = req.body;
  
  const deleter = new IA.Functions.GeneralLedger.AccountDelete();

  deleter.accountNo = account.accountNo;

  try {
    const deleteResponse = await client.execute(deleter);
    const deleteResult = deleteResponse.getResult();
    res.send(deleteResult);
  } catch (error) {
    console.log(error)
    res.send("ERROR")
  }
});

// for creating users
router.post("/user", async (req, res) => {

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.createUser({
      username: req.body.username.toLowerCase(),
      password: hashPassword,
    });
    res.send(result)

  } catch (error) {
    res.send(error)
  }
});

// for logging in
router.put("/user", async (req, res) => {

  try {
    // check user
    const result = await db.loginUser(req.body.username.toLowerCase());

    // if user not found return error
    if (!result) return res.send({ "Error": "User Not Found" });

    // compare username and password, if they match then login successful
    if (await bcrypt.compare(req.body.password, result.password)) {
      let cookievalue = await bcrypt.hash(process.env.SECRET, 10);
      res.cookie("usersession", cookievalue).send({ "Success": "Login successful" });
      db.createSession({
        username: req.body.username.toLowerCase(),
        session: cookievalue,
      });
      return;
    }
      

    // otherwise login failed
    return res.send({ "Error": "Password incorrect" });

    res.send(username)
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;