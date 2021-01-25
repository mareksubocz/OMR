import React from "react"
import ReactDOM from "react-dom"
import Main from "./Main"
import Loading from "./Loading"
import './style.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

// JSX
ReactDOM.render(
    <div>
        <Router>
            <Switch>
                <Route path="/loading" component = {Loading}/>
                <Route exact path="/" component = {Main}/>
            </Switch>
                {/* <Link to="/loading"> Loading </Link> */}
                {/* <Link to="/"> Main </Link> */}
        </Router>
        {/* <Main/> */}
    </div>,
    document.getElementById("root")
)

var myNewP = document.createElement("p")
myNewP.innerHTML = "This is a paragraph."
