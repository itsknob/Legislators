import React from "react";
import Person from "./Person";

export default class PersonList extends React.Component {
    constructor() {
        super();
        this.state = {
            people: []
        }
    }

    // Add Person to PersonList
    componentDidMount() {
        fetch("https://theunitedstates.io/congress-legislators/legislators-current.json")
        .then(results => {
            return results.json();
        }).then(data => {

            // Add Data to database here, by person.
            //   Needs model
            //   Needs Schema
            //   Needs DB Connector
            // DB connector hould be in backend
            // This should pull from DB for each staffer.

            data = data.slice(0, 15);
            let thisPerson = data.map( (person) => {
                return (
                    <Person key={person.id.govtrack}
                        id={person.id.govtrack}
                        bioguide={person.id.bioguide}
                        name={person.name.official_full}
                        position={person.terms[person.terms.length-1].type}
                        location={person.terms[person.terms.length-1].state}
                        startTerm={person.terms[person.terms.length-1].start}
                        party={person.terms[person.terms.length-1].party}
                        otherData={person}
                        bioGuideId={person.id.bioguide}
                    />
                );
            });
            this.setState({people: thisPerson});
        });
    }

    render() {
        return (
            <div className="PersonList">
                {this.state.people}
            </div>
        )
    }
}