import React from 'react'
import {Sidebar} from './Sidebar'
import PL from './Staffers/PersonList'
const {PersonList} = PL

const Layout = (_props) => {
  return (
    <div
      className="layout--container"
      style={{display: 'flex', flexDirection: 'row'}}
    >
      <Sidebar />
      <PersonList />
    </div>
  )
}

export {Layout}
