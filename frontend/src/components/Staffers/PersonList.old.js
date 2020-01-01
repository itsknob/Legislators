import React from 'react'
import PersonHook from './PersonHook.js'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_MEMBERS = gql`
  {
    getLegislators: {
      personId: {
        bioguide
        govtrack
      }
      name {
        official_full
      }
      terms {
        type
        state
        start
        party
      }
      bio {
        birthday
      }
    }
  }
`
export default class PersonList extends React.Component {
  constructor() {
    super()
    this.state = {
      people: [],
    }
    const {loading, error, data} = useQuery(GET_MEMBERS)
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
    if (this.error) return `Error! ${this.error}`
    if (this.loading) return null
    return <div className="PersonList">{this.state.people}</div>
  }
}
