import React from "react"
import SearchClone from "./SearchClone"
import { Sticky, Segment } from "semantic-ui-react"


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