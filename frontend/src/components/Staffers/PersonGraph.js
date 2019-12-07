import React, { useEffect, useState } from 'react'
import './Staffers.css'
import { Card, Typography } from '@material-ui/core'
import LazyImage from '../LazyLoad/LazyImage'

const Person = (props) => {


  return (
    <div style={{ maxHeight: '500px' }}>
      <Card className="PersonBox">
        <LazyImage
          className="ImageBox"
          loading="lazy"
          data-src={imageURL + props.id + '-200px.jpeg'}
          src={imageURL + props.id + '-200px.jpeg'}
          alt={props.name}
          style={{ boxShadow: '1px 1px 5px black' }}
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