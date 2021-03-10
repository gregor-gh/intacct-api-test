import React from 'react'
import { useState } from "react"
import { FlatTable,FlatTableRow,FlatTableHead,FlatTableHeader,FlatTableBody,FlatTableCell } from "carbon-react/lib/components/flat-table"
import Pager from "carbon-react/lib/components/pager"
import { ActionPopover, ActionPopoverItem } from "carbon-react/lib/components/action-popover"

const IssueTable = ({ issueList, setAddIssueOpen, setAddOrUpdate, setEditInitVals, deleteIssue }) => {
// TODO implment sorting? looks like a pain
// TODO implement preview while data is loading?

  // map through the elements returned by the getIssues method and create a table row for each one
  const issueData = issueList.sort((a,b) => a.ACCOUNTNO-b.ACCOUNTNO).map((el, index) => {
    // extract vars from array
    const recordNo = el.RECORDNO
    const accountNo = el.ACCOUNTNO
    const title = el.TITLE
    const accountType = el.ACCOUNTTYPE
    const normalBalance = el.NORMALBALANCE

    return (
      <FlatTableRow key={index}>
      <FlatTableCell>{accountNo}</FlatTableCell>
      <FlatTableCell>{title}</FlatTableCell>
      <FlatTableCell>{accountType}</FlatTableCell>
      <FlatTableCell>{normalBalance}</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
        <ActionPopoverItem 
          icon="edit" 
          onClick={
            () => editClick(recordNo,accountNo,title,accountType,normalBalance)}>
                  Edit
                </ActionPopoverItem>
                <ActionPopoverItem 
                  icon="delete" 
                  onClick={
                    () => deleteClick(accountNo)}>
                  Delete
                </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>
    )
  })

  const editClick = (recordNo, accountNo, title, accountType, normalBalance) => {
    // set the form type to update
    setAddOrUpdate("Update")

    // set the init values for use in the add issue form
    setEditInitVals({ recordNo, accountNo, title, accountType, normalBalance })

    //launch form 
    setAddIssueOpen(true)
  }

  const deleteClick = (recordNo) => {
    deleteIssue(recordNo)
  }

  const [recordsRange, setRecordsRange] = useState({ start: 0, end: 10 })
  const [currentPage, setCurrentPage] = useState(1)

  const renderRows = () => {
    const { start, end } = recordsRange
    if (start < 0) return issueData
    if (end> issueData.length) return issueData.slice(start, issueData.length)
    return issueData.slice(start, end)
  }

  const handlePagination = (newPage, newPageSize) => {
    const start = (newPage - 1) * newPageSize
    const end = start + newPageSize
    setRecordsRange({ start, end })
    setCurrentPage(newPage)
  }

  const pageSizeOptions = [
    { id: "10", name: 10 },
    { id: "25", name: 25 }
  ]


  return (
    <div id="issue-list">
      <FlatTable isZebra hasStickyHead hasStickyFooter footer = {
          <Pager totalRecords={issueData.length} 
            showPageSizeSelection 
            pageSize={10}
            currentPage={currentPage}
            onPagination={(next, size) => handlePagination(next, size)}
            pageSizeSelectionOptions={pageSizeOptions}
            />
        }
      >
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Account Number</FlatTableHeader>
            <FlatTableHeader>Title</FlatTableHeader>
            <FlatTableHeader>Account Type</FlatTableHeader>
            <FlatTableHeader>Normal Balance</FlatTableHeader>
            <FlatTableHeader />
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          {renderRows()}
        </FlatTableBody>
      </FlatTable>
    </div>
  )
}

export default IssueTable
