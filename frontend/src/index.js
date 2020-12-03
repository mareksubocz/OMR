import React from "react"
import ReactDOM from "react-dom"
import Main from "./Main"
import './style.css'

// JSX
ReactDOM.render(
    <Main/>,
    document.getElementById("root")
)

var myNewP = document.createElement("p")
myNewP.innerHTML = "This is a paragraph."
