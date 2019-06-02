import React, {useEffect, useState} from 'react'
import './Staffers.css'
import {Card, Typography} from '@material-ui/core'

const Person = props => {
  // Local Constants
  //const imageURL = 'https://www.govtrack.us/data/photos/'//broken link
  const imageURL = 'https://www.govtrack.us/static/legislator-photos/'
  const boxShadow = {
    boxShadow: '1px 1px 5px black',
  }
  const bioGuideId = this.props.bioGuideId || null
  // State
  const [bio, setBio] = useState('Loading...')

  // Data Fetching, Dependant on bioGuideID (Shouldn't Change)
  useEffect(() => {
    if (!bioGuideId) return
    //fetch data
    async function fetchBio() {
      const bio = await (await fetch('/senator/' + this.bioGuideId)).text()
      setBio(bio)
    }
    fetchBio()

    return /* cleanup */
  }, [
    /* dependencies */
    bioGuideId,
  ])

  return (
    <div style="maxHeight: 500px;">
      <Card className="PersonBox">
        <img
          className="ImageBox"
          src={imageUrl + this.props.id + '.jpeg'}
          alt={this.props.name}
          style={boxShadow}
        />
        <Typography className="NameBox" variant="h4">
          <h4>{this.props.name}</h4>
        </Typography>
        <Typography className="PositionInfoBox" variant="body2">
          <strong>Chamber: </strong>
          {this.props.position === 'sen' ? 'Senate' : 'House'}
          <br />
          <strong>State: </strong>
          {this.props.location}
          <br />
          <strong>Party: </strong>
          {this.props.party}
        </Typography>
        <Typography className="MainInfoBox" variant="body1">
          {this.bio}
        </Typography>
        <Typography className="LinksBox" variant="body1">
          Links Here
        </Typography>
      </Card>
    </div>
  )
}

export default Person
