import React from "react";
import './Main.css'
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import Axios from 'axios';


const Main = (props) => {


  window.onload = () => {

    Axios.post('http://localhost:3005/api/Auth', {
      TOKENX: localStorage.token

    }).then((response) => {
      if (response.data.auth == false) {
        window.alert(`${response.data.message}`)
        window.location.href = 'http://localhost:3000/'
      }
      console.log(response.data)

    })

  }

  return (
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