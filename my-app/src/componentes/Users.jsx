import React from "react";
import './Users.css'
import {Button} from 'react-bootstrap'

const Users = () => {


  return(
    <div className="Users">
<div>
<div className="UserInformation">
<div className="UserInformationComponent">User Name</div>
<div className="UserInformationComponent">Contato: </div>
<div className="UserInformationComponent">Email: </div>
<div> <Button variant="primary">Delete My Count</Button></div>
</div>
</div>
    </div>
  )
}

export default Users