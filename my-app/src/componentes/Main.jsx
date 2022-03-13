import React from "react";
import './Main.css'
import {Button} from 'react-bootstrap'


const Main = (props) => {
  
  return(
    <div className=" MAIN d-flex justify-content-center">
<div className=" MainContent d-grid gap-2">
  <Button href="/Register" variant="primary" size="lg">
   {props.firtButton}
  </Button>
  <Button variant="primary" size="lg">
   {props.secondButton}
  </Button>
</div>
    </div>
  )
}

export default Main