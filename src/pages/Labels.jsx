import React from 'react'
import {NavBar} from "../components/NavBar"
import {SideBar} from "../components/SideBar"
import "../css/labels.css"

function Labels() {
  return (
    <>
    <NavBar></NavBar>
    <div className="labels-container">
        <SideBar/>
    </div>
    </>
  )
}

export {Labels}