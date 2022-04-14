import { useEffect, useState } from "react"
import "./styles.css"
import { Link } from "react-router-dom"

export function Create() {
    const [agent, setAgent] = useState([])

    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [origin, setOrigin] = useState("")

    //POST request
    const myHeadersPOST = new Headers();
    myHeadersPOST.append('Accept', 'application/json');
    myHeadersPOST.append('Content-Type', 'application/json');

    const sendJSON = () => {
    
    const myInitPOST = {
        method: 'POST',
        headers: myHeadersPOST,
        body: JSON.stringify({name: name, role: role, origin: origin})
    };
    
    // fetch your own API
    fetch(``, myInitPOST)
    .then(res => console.log(res))
    .then(data => window.location = ("/"))
    .catch(err => console.log(err))
    }

    const onNameChangeHandler = (event) => {
        setName(event.target.value);
    };
    const onRoleChangeHandler = (event) => {
        setRole(event.target.value);
    };
    const onOriginChangeHandler = (event) => {
        setOrigin(event.target.value);
    };

  return (
    <div className="Create">
        <h1>{agent.name}</h1>
        <p>{agent.role}</p>
        <p>{agent.origin}</p>
        <div>
            <input type="text" onChange={onNameChangeHandler} placeholder="Agent Name" value={name}/><br/>
            <input type="text" onChange={onRoleChangeHandler} placeholder="Agent Role" value={role}/><br/>
            <input type="text" onChange={onOriginChangeHandler} placeholder="Agent Origin" value={origin}/><br/>
        </div>
        <button onClick={sendJSON}>Create</button>
        <Link reloadDocument to={`/`}><button>Back</button></Link>
    </div>
  )
}