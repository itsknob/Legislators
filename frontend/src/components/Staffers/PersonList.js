import React from 'react'
import PersonHook from './PersonHook.js'

export default class PersonList extends React.Component {
  constructor() {
    super()
    this.state = {
      people: [],
    }
  }

  // Add Person to PersonList
  componentDidMount() {
    // fetch(
    //   'https://theunitedstates.io/congress-legislators/legislators-current.json',
    // )
    fetch('/person/all')
      .then(results => {
        return results.json()
      })
      .then(data => {
        // DB Should be populated else where, and pulled from here

        //data = data.slice(0, 15)
        let thisPerson = data.map(person => {
          return (
            <PersonHook
              key={person.personId.govtrack}
              id={person.personId.govtrack}
              bioguide={person.personId.bioguide}
              name={person.name.official_full}
              position={person.terms[person.terms.length - 1].type}
              location={person.terms[person.terms.length - 1].state}
              startTerm={person.terms[person.terms.length - 1].start}
              party={person.terms[person.terms.length - 1].party}
              otherData={person}
              bioGuideId={person.personId.bioguide}
            />
          )
        })
        this.setState({people: [...this.state.people, thisPerson]})
      })
  }

  render() {
    return <div className="PersonList">{this.state.people}</div>
  }
}
