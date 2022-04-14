import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Agent } from "./Agent"
import { Create } from "./Create"
import "./styles.css"

export function App() {

    const [agents, setAgents] = useState([]);
    const [pagination, setPagination] = useState();
    const [page, setPage] = useState(0);
    let limit = 5;

    const [isHidden, setHidden] = useState(false);

    useEffect(() => {
        if (window.location.pathname != "/") {
            setHidden(true);
        } 
        if (window.location.pathname == "/") {
            setHidden(false);
        } 
    });

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
        .then(data => updateData(data))
        .catch(err => console.log(err))

    //DELETE request
    const myHeadersDELETE = new Headers();
    myHeadersDELETE.append('Accept', 'application/json')

    const myInitDELETE = {
        method: 'DELETE',
        headers: myHeadersDELETE
    };

    const deleteAgent = (uri) => fetch(uri, myInitDELETE)
        .then(res => { loadJSON() })
        .catch(err => console.log(err))

    function updateData(data) {
        setAgents(data.items)
        setPagination(data.pagination)
    }

    const agentItems = agents.map((agent, index) => {
        return (
        <div key={index} className="agentDiv">
            <p> Name: {agent.name}</p><p> Role: {agent.role}</p>
            <p> Origin: {agent.origin}</p>
            <button onClick={() => deleteAgent(agent._links.self.href)}>Delete</button>
            <Link reloadDocument to={`/detail/${ agent._id}`}><button>Detail pagina</button></Link>
        </div>
        )
    })

    function next() {
        if(pagination.totalItems > limit*(page+1)){
            setPage(page + 1);
        }
    }

    function previous() {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    useEffect(() => { loadJSON()}, [page]);
  return (
    <BrowserRouter>
        <div className="App">
            <h1>Valorant agents</h1>
            <div className={isHidden ?  "Hidden" : null}>
                <h2> Page {page + 1}</h2>
                <button onClick={previous}>Vorige pagina</button>
                <button onClick={next}>Volgende pagina</button>
            </div>
            <Routes>
                <Route exact path="/" element={ agentItems }/>
                
                <Route path="/detail/:agentId" element={ <Agent/> }/>

                <Route path="/create" element={ <Create/> }/>
            </Routes>
            <Link reloadDocument to={`/create`}><button>Create</button></Link>
        </div>
    </BrowserRouter>
  );
}