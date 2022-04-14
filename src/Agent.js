import { useEffect, useState } from "react"
import "./styles.css"
import { useParams, Link } from "react-router-dom"

export function Agent() {

    const [agent, setAgent] = useState([])

    let params = useParams();

    //GET request
    const myHeadersGET = new Headers();
    myHeadersGET.append('Accept', 'application/json')

    const myInitGET = {
        method: 'GET',
        headers: myHeadersGET
    };

    // fetch your own API
    const loadJSON = () => fetch(``, myInitGET)
        .then(res => res.json())
        .then(data => updateAgent(data))
        .catch(err => console.log(err))

    function updateAgent(agents) {
        setAgent(agents)
    }

    //Put
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [origin, setOrigin] = useState("")

    const myHeadersPUT = new Headers();
    myHeadersPUT.append('Accept', 'application/json');
    myHeadersPUT.append('Content-Type', 'application/json');

    const sendJSON = () => {
    
    const myInitPUT = {
        method: 'PUT',
        headers: myHeadersPUT,
        body: JSON.stringify({name: name, role: role, origin: origin})
    };
    
    // fetch you own API
    fetch(``, myInitPUT)
    .then(res => console.log(res))
    .then(data => loadJSON())
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
    
    useEffect(() => { loadJSON()}, []);

  return (
    <div className="Agent">
        <div className="info">
            <h1>{agent.name}</h1>
            <p>{agent.role}</p>
            <p>{agent.origin}</p>
        </div>
        <div>
            <input type="text" onChange={onNameChangeHandler} placeholder={agent.name} value={name}/><br/>
            <input type="text" onChange={onRoleChangeHandler} placeholder={agent.role} value={role}/><br/>
            <input type="text" onChange={onOriginChangeHandler} placeholder={agent.origin} value={origin}/><br/>
        </div>
        <button onClick={sendJSON}>Update</button>
        <Link reloadDocument to={`/`}><button>Back</button></Link>
    </div>
  )
}