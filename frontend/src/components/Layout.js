import React from 'react'

import PLG from './Staffers/PersonListGQL'
const {PersonListGQL} = PLG

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
        <PersonListGQL />
      </div>
    )
  }
}
