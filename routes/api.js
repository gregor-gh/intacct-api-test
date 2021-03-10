var express = require('express');
var router = express.Router();
const client = require("../connection/config.js")

router.get("/general", async (req, res) => {

  const IA = require("@intacct/intacct-sdk");
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
  const test = readResponse.results[0].data;

  res.json({ test } );
})

router.post("/general/add", (req, res) => {

  const account = req.body;

  let create = new IA.Functions.GeneralLedger.AccountCreate();
  create.accountNo = account.accountNo;
  create.title = account.title;
  create.accountType = account.accountType;
  create.normalBalance = account.normalBalance;

  const createResponse = await client.execute(create);
  const createResult = createResponse.getResult();

  res.json({ createResult });

})

router.put("/general/update", (req, res) => {

  const account = req.body;

  let update = new IA.Functions.GeneralLedger.AccountUpdate();
  update.accountNo = account.accountNo;
  update.title = account.title;
  update.accountType = account.accountType;
  update.normalBalance = account.normalBalance;

  const updateResponse = await client.execute(update);
  const updateResult = updateResponse.getResult();

  res.json({ updateResult });

})

router.delete("/general/delete", (req, res) => {

  const account = req.body;
  
  const deleter = new IA.Functions.GeneralLedger.AccountDelete();

  deleter.accountNo = account.accountNo;

  const deleteResponse = await client.execute(deleter);
  const deleteResult = deleteResponse.getResult();

  res.json({ deleteResult });

})

module.exports = router;