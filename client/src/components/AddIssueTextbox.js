import React from 'react'
import Textbox from "carbon-react/lib/__experimental__/components/textbox";

const AddIssueTextbox = ({ text, fieldKey, required, editInitVals, setEditInitVals, addOrUpdate }) => {

  return (
    <Textbox 
      size="small" 
      required={required}
      label={text}
      readOnly={addOrUpdate == "Update" && fieldKey =="accountNo"? true:false}
      value={editInitVals[fieldKey]}
      onChange={(e) => setEditInitVals({...editInitVals, [fieldKey]: e.target.value})}/>
  )
}

export default AddIssueTextbox

//onChange={(e) => setField(e.target.value)}/>