import React, {useEffect, useState} from 'react'
import './Staffers.css'
import {Card, Typography} from '@material-ui/core'
import LazyImage from '../LazyLoad/LazyImage'

async function readStream(resp) {
  const reader = resp.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let string = ''
  while (true) {
    let data = await reader.read()
    if (data.done) break
    string += decoder.decode(data.value)
  }
  return string
}

const Person = props => {
  // Local Constants
  const imageURL = 'https://www.govtrack.us/static/legislator-photos/'
  /* const boxShadow = {
    boxShadow: '1px 1px 5px black',
  } */
  const bioGuideId = props.bioguide || null
  // State
  const [bio, setBio] = useState('Loading...')

  // Data Fetching, Dependant on bioGuideID (Shouldn't Change)
  // todo: update fetch data to hit database
  useEffect(() => {
    if (!bioGuideId) return
    //fetch data
    async function fetchBio() {
      let bio = null // shadow var
      const response = await fetch('/legislator/' + bioGuideId)

      if (response.ok === false) {
        bio = `Error retreiving bio -- ${
          (await readStream(response)).split(':')[0]
        }`
      } else {
        bio = await response.text()
      }

      setBio(bio)
    }
    fetchBio()
    console.warn('Warn: ', bio)

    return /* cleanup */
  }, [
    /* dependencies */
    bioGuideId,
  ])

  return (
    <div style={{maxHeight: '500px'}}>
      <Card className="PersonBox">
        <LazyImage
          className="ImageBox"
          loading="lazy"
          data-src={imageURL + props.id + '-200px.jpeg'}
          src={imageURL + props.id + '-200px.jpeg'}
          alt={props.name}
          style={{boxShadow: '1px 1px 5px black'}}
        />
        <Typography className="NameBox" variant="h4">
          {props.name}
        </Typography>
        <Typography className="PositionInfoBox" variant="body2">
          <strong>Chamber: </strong>
          {props.position === 'sen' ? 'Senate' : 'House'}
          <br />
          <strong>State: </strong>
          {props.location}
          <br />
          <strong>Party: </strong>
          {props.party}
        </Typography>
        <Typography className="MainInfoBox" variant="body1">
          {bio}
        </Typography>
        <Typography className="LinksBox" variant="body1">
          Links Here
        </Typography>
      </Card>
    </div>
  )
}

export default Person
