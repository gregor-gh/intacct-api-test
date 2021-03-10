import React from 'react';
import { useState, useEffect } from "react";
//import Typography from "carbon-react/lib/components/typography"
import Form from "carbon-react/lib/components/form";
import Dialog from "carbon-react/lib/components/dialog";
//import Textbox from "carbon-react/lib/__experimental__/components/textbox";
import Button from "carbon-react/lib/components/button";
import AddIssueTextbox from "./AddIssueTextbox.js";
import { Select, Option } from "carbon-react/lib/components/select";


// add issue pop up dialog box, also used for update (depending on addOrUpdate)
const AddIssue = ({ addIssueOpen, setAddIssueOpen, addIssue, addOrUpdate, editInitVals, setEditInitVals }) => {

  useEffect(() => {
    setErrorCount(0);
    return () => {
      
    }
  }, [addIssueOpen])

  const [errorCount, setErrorCount] = useState(0);

  const onSubmit = (e) => {
    // prevent page refresh
    e.preventDefault();

    // reset error count to zero then increment if either of the two require dfields are empty
    setErrorCount(0);
    if (editInitVals.title === "" && (editInitVals.accountNo === "" || editInitVals.accountNo.length < 5)) return setErrorCount(2);
    if (editInitVals.title === "" || (editInitVals.accountNo === "" || editInitVals.accountNo.length < 5)) return setErrorCount(1);
    setErrorCount(0);
    
    // add issue will add or update depending on the addOrUpdate value
    addIssue();
    
    setAddIssueOpen(false);
  }

  return (
    <Dialog open={addIssueOpen} title={addOrUpdate+" GL Account"}subtitle="Please enter GL account details">
    <Form stickyFooter={true} 
      onSubmit={onSubmit}
      leftSideButtons={<Button onClick={() => setAddIssueOpen(!addIssueOpen)}>
                        Cancel
                      </Button>}
       saveButton={<Button buttonType='primary' type="submit">
                    Save
                  </Button>}
      fieldSpacing={2}
      errorCount={errorCount}
    >
      <AddIssueTextbox 
        text="Account No (minimum 5 characters)"
        fieldKey="accountNo"
        required="true"
        editInitVals={editInitVals}
          setEditInitVals={setEditInitVals}
          addOrUpdate={addOrUpdate}
          
      />
      <AddIssueTextbox 
        text="Title"
        fieldKey="title"
        required="true"
        editInitVals={editInitVals}
          setEditInitVals={setEditInitVals}
          addOrUpdate={addOrUpdate} />
        <Select
          label="Account Type"
          onChange={(e) => setEditInitVals({ ...editInitVals, "accountType": e.target.value })}
          value={editInitVals.accountType}
        >
          <Option text="balancesheet" value="balancesheet" />
          <Option text="incomestatement" value="incomestatement" />
        </Select>
        <Select
          label="Normal Balance"
          onChange={(e) => setEditInitVals({ ...editInitVals, "normalBalance": e.target.value })}
          value={editInitVals.normalBalance}
        >
          <Option text="debit" value="debit" />
          <Option text="credit" value="credit" />
        </Select>
    </Form>
  </Dialog>
  )
}

export default AddIssue

//   < AddIssueTextbox
// text = "Account Type"
// fieldKey = "accountType"
// editInitVals = { editInitVals }
// setEditInitVals = { setEditInitVals }
// addOrUpdate = { addOrUpdate } />
//   <AddIssueTextbox
//     text="Normal Balance"
//     fieldKey="normalBalance"
//     editInitVals={editInitVals}
//     setEditInitVals={setEditInitVals}
//     addOrUpdate={addOrUpdate} />