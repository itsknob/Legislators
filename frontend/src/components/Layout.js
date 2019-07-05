import React from "react";

import PersonList from "./Staffers/PersonList";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            people: []
        }
    }

    render() {
        return(
            <div>
                <PersonList list={this.getPeople} />
            </div>
        )
    }
}