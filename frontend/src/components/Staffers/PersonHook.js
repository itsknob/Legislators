import React from 'react'
import './Staffers.css'
import {Card, Typography} from '@material-ui/core'
import LazyImage from '../LazyLoad/LazyImage'

const Person = props => {
  // Local Constants
  const imageURL = 'https://www.govtrack.us/static/legislator-photos/'

  return (
    <div style={{maxHeight: '500px'}}>
      <Card className="PersonBox">
        <LazyImage
          className="ImageBox"
          loading="lazy"
          data-src={imageURL + props.data.personId.govtrack + '-200px.jpeg'}
          src={imageURL + props.data.personId.govtrack + '-200px.jpeg'}
          alt={props.data.name.official_full}
          style={{boxShadow: '1px 1px 5px black'}}
        />
        <Typography className="NameBox" variant="h4">
          {props.data.name.official_full}
        </Typography>
        <Typography className="PositionInfoBox" variant="body2">
          <strong>Chamber: </strong>
          {props.data.terms[props.data.terms.length - 1].type === 'sen'
            ? 'Senate'
            : 'House'}
          <br />
          <strong>State: </strong>
          {props.data.terms[props.data.terms.length - 1].state}
          <br />
          <strong>Party: </strong>
          {props.data.terms[props.data.terms.length - 1].party}
        </Typography>
        <Typography className="MainInfoBox" variant="body1">
          {props.data.bio.biography}
        </Typography>
        <Typography className="LinksBox" variant="body1">
          Links Here
        </Typography>
      </Card>
    </div>
  )
}

export default Person
