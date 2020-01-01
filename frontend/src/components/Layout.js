import React from 'react'

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
      <div>
        <PersonList />
      </div>
    )
  }
}
