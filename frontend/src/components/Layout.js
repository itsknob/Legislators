import React from 'react'
import {Sidebar} from './Sidebar'
import PL from './Staffers/PersonList'
const {PersonList} = PL

export default class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      people: [],
    }
  }

  render() {
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
}
