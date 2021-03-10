//import GlobalStyle from 'carbon-react/lib/style/global-style';
import "./App.css"
import React from 'react';
//import { BrowserRouter as Router, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components";
import mintTheme from "carbon-react/lib/style/themes/mint";
import AppWrapper from "carbon-react/lib/components/app-wrapper";

import IssueTable from "./components/IssueTable.js"
import NavBar from "./components/NavBar.js"
import AddIssue from "./components/AddIssue.js";
import ToastPop from "./components/ToastPop.js"

function App() {

  // the list of issues gottne from the database, used in issuetable
 const [issueList, setIssueList] = useState([])

 // the flag to determine whether the add issue form is opne, also used for updating
 const [addIssueOpen, setAddIssueOpen] = useState(false)

 // the flag to determine whether the "x was successful" toast appears
  const [toastOpen, setToastOpen] = useState(false)
  
  const [toastVariant, setToastVariant] = useState("success")

 // the var that passes the toast messsage from the add/edit/delete processes to the toast
 const [toastMessage, setToastMessage] = useState("")

 // the flag that determines whether the "add update" screen will open in add or edit mode
 const [addOrUpdate, setAddOrUpdate] = useState("add")

 // object to store the initial values for use when the edit option is launched.
 // also stores the id sent to the api
 const [editInitVals, setEditInitVals] = useState({
   recordNo: "",
   accountNo: "",
   title: "",
   accountType: "",
   normalBalance: ""
 })

  useEffect(() => {
    getIssues()
    return () => {
      console.log("loaded")
    }
  }, [])

  // method for getting list of issues from API
  const getIssues = async () => {
    try {
      const response = await fetch("/api/general")
      const data = await response.json()
      
      setIssueList(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  // method for sending insert to API
  const addIssue = async () => {

    // build FormData from fields on the add issue dialog
    let formData = new FormData()
    formData.append("accountNo", editInitVals.accountNo)
    formData.append("title", editInitVals.title)
    formData.append("accountType", editInitVals.accountType)
    formData.append("normalBalance", editInitVals.normalBalance)
    // add id if it's an update
    addOrUpdate === "Update" && formData.append("recordNo", editInitVals.recordNo)
    
    //convert to search params for fetch
    const body = new URLSearchParams(formData)

    // set methdd according to whether it's an add or update
    const method = addOrUpdate==="Add"? "POST":"PUT"

    try {

      const response = await fetch("/api/general/add", { method, body })
      console.log(response)
      const data = await response.text()

      if (data == "ERROR") {
        throw console.error("Fail");
      }

      console.log(data)

      // refresh list
      await getIssues();

      setToastVariant("success")

      // update user via toast
      if (addOrUpdate === "Add") {
        setToastMessage("Account created successfully")
        
      } else {
        setToastMessage("Account updated successfully")
      }
      setToastOpen(true)
    } catch (error) {
      setToastVariant("error")
      setToastMessage("Account creation failed, account already exists")
      setToastOpen(true)
      console.log(error)
    }
  }

  const deleteIssue = async (accountNo) => {
    // build formdata using the id
    let formData = new FormData()
    formData.append("accountNo",accountNo)

    const body = new URLSearchParams(formData) 

    const response = await fetch("/api/general/delete", {
      method:"DELETE",
      body })
    const data = await response.json()
    console.log(data)

    // refresh list
    await getIssues();

    // update user via toast
    setToastVariant("success")
    setToastMessage("Account deleted successfully")
    setToastOpen(true)



  }

  return (
<ThemeProvider theme={mintTheme}>
  <AppWrapper>
    <NavBar 
      addIssueOpen={addIssueOpen} 
      setAddIssueOpen={setAddIssueOpen}
      setAddOrUpdate={setAddOrUpdate}
      setEditInitVals={setEditInitVals}/>
    <IssueTable 
      issueList={issueList}
      setAddIssueOpen={setAddIssueOpen}
      setAddOrUpdate={setAddOrUpdate}
      setEditInitVals={setEditInitVals}
      deleteIssue={deleteIssue}/>
    <AddIssue 
      addIssueOpen={addIssueOpen} 
      setAddIssueOpen={setAddIssueOpen}
      addIssue={addIssue}
      addOrUpdate={addOrUpdate}
      editInitVals={editInitVals}
      setEditInitVals={setEditInitVals}/>
    <ToastPop 
      toastMessage={toastMessage}
      toastOpen={toastOpen}
      setToastOpen={setToastOpen}
      toastVariant={toastVariant}
    />
  </AppWrapper>
</ThemeProvider>
  );
}

export default App;
