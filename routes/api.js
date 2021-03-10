var express = require('express');
var router = express.Router();
const client = require("../connection/config.js")
const IA = require("@intacct/intacct-sdk");

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
})

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
  

  

})

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



})

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


})

module.exports = router;