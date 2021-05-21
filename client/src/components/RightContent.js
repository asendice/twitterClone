import React from "react"
import SearchClone from "./SearchClone"
import { Sticky } from "semantic-ui-react"

// Reason for this component: eventually there will be more content on the right side of the page
// "News" "Hashtags" are two examples

const RightContent = (props) => {
  return (
    <>
      <Sticky context={props.contextRef} offset={100}>
        <SearchClone />
        {""}
        
      </Sticky>
    </>

  )
}

export default RightContent;