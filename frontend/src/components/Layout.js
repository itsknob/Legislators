import React from "react";

import { Home } from "../pages";
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
                <Home />
                <PersonList list={this.getPeople} />
            </div>
        )
    }
}