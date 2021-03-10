import React from 'react'
//import StyledButton from "carbon-react/lib/components/button"
import Toast from "carbon-react/lib/components/toast"
//import actionPopoverMenuComponent from 'carbon-react/lib/components/action-popover/action-popover-menu.component'

const ToastPop = ({ toastMessage, toastOpen, setToastOpen, toastVariant }) => {

  const onDismissClick = (e) => {
    setToastOpen(false)

  }

  return (
    <div>
      <Toast variant={toastVariant}
        open={toastOpen} 
        onDismiss={onDismissClick}
        timeout={2000}
      >
        {toastMessage}
      </Toast>
    </div>
  )
}

export default ToastPop
