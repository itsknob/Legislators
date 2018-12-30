import React from "react";
import "./Staffers.css";
import { Card, Typography } from "@material-ui/core";

export default class Person extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bio: "Loading...",
            bioGuideId: this.props.bioGuideId || null
        };
    }
	
    async componentDidMount() {
      if(!this.state.bioGuideId) return
      const data = await (await fetch("/senator/"+this.state.bioGuideId)).text()
      this.setState({bio: data});
      // console.log(this.state);
    }
    
  render() {
    const imageUrl = "https://www.govtrack.us/data/photos/";
    const boxShadow = {
      boxShadow: "1px 1px 5px black"
    }
    return (
      <div>
        <Card className="PersonBox">
        {/*
        <CardMedia
            className="ImageBox"
            component="img"
            alt={this.props.name}
            height="200"
            image={imageUrl + this.props.id + ".jpeg"}
            title={this.props.name}
       Claire McCaskill     style={{ objectFit: "contain", objectPosition: "left top"}}
        />
        */}
        <img 
            className="ImageBox" 
            src={imageUrl + this.props.id + ".jpeg"} 
            alt={this.props.name} 
            style={boxShadow}    
        />
        <Typography className="NameBox" variant="h4">
            {this.props.name}
        </Typography>
        <Typography className="PositionInfoBox" variant="body2" >
            <strong>{"Chamber: "}</strong>
            {this.props.position === "sen"
                ? "Senate"
                : "House"}
            <br />
            <strong>{"State: "}</strong>
            {this.props.location}
            <br />
            <strong>{"Party: "}</strong>
            {this.props.party}
        </Typography>
        <Typography className="MainInfoBox" variant="body1">
            {this.state.bio}
        </Typography>
        <Typography className="LinksBox" variant="body1">
            Links Here.
        </Typography>
        </Card>
        {/*
        <div class="PersonBox">
          <div class="SideDetails">
            <div class="ImageBox">
              <img
                src={imageUrl + this.props.id + "-100px.jpeg"}
                alt={"Picture of " + this.props.name}
              />
            </div>
            <div class="PositionInfoBox">
              <p>
                <strong>{"Position: "}</strong>
                <br />
                {this.props.position === "sen"
                  ? "Senate"
                  : "House of Representatives"}
                <br />
                <strong>{"State: "}</strong>
                <br />
                {this.props.location}
                <br />
                <strong>{"Party: "}</strong>
                <br />
                {this.props.party}
              </p>
            </div>
          </div>
          <div class="">
            <div class="NameBox">
              <h2>{this.props.name}</h2>
            </div>
            <div class="MainInfoBox">
              <p>
                This is information. <br />
                This is information. <br />
                This is information.
              </p>
            </div>
          </div>
        </div>
        */}
      </div>
    );
  }
}
