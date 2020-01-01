import React, {useEffect, useState} from 'react'
import PersonHook from './PersonHook.js'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_MEMBERS = gql`
  {
    getLegislators {
      personId {
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
        biography
      }
    }
  }
`

// TODO -- still not conviced this is the best way to render this out. PersonHook should probably query it's own data.
// TODO Rename to PersonHook.js
const PersonList = props => {
  const [people, setPeople] = useState([])
  let loading, error, data

  const result = useQuery(GET_MEMBERS)
  loading = result.loading
  error = result.error
  data = result.data

  // on status change
  useEffect(() => {
    if (data !== undefined) {
      let peopleComponents = data.getLegislators.map(person => (
        <PersonHook key={person.personId.govtrack} data={person} />
      ))
      setPeople(peopleComponents)
    }
  }, [loading, error, data])

  // If loading, null; if error, error; else PersonHook List
  return loading ? null : error ? (
    `Error! ${error}` // not loading && is error
  ) : (
    <div className="PersonList">{people}</div> // not loading && not error
  )
}

export default {PersonListGQL: PersonList}
