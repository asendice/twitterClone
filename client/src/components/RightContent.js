import React from "react"
import WhoToFollow from "./WhoToFollow"
import SearchClone from "./SearchClone"
import { Sticky } from "semantic-ui-react"


const RightContent = (props) => {
  return (
    <>
      <Sticky context={props.contextRef} offset={66}>
        <SearchClone />
        <WhoToFollow />
      </Sticky>
    </>

  )
}

export default RightContent;