import React, { useState } from 'react'

export const Sidebar = () => {
  const [partyFilter, setPartyFilter] = useState(null)

  return (
    <div className="sidebar">
      <h2>Narrow down your selection</h2>
      <h3>Filters</h3>
      <h4>Selected</h4>
      <ul>
        {partyFilter ?? (
          <p>
            Party: <strong>{partyFilter}</strong>
          </p>
        )}
      </ul>
      <form>
        <ul>
          <li>
            <label htmlFor="democrat">Democrat</label>
            <input
              id="democrat"
              name="party"
              type="radio"
              data-whatever="Somethign"
              onChange={(e) => {
                if (e.target.checked) {
                  setPartyFilter('Democrat')
                }
              }}
            />
          </li>
          <li>
            <label htmlFor="republican">Republican</label>
            <input
              id="republican"
              name="party"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setPartyFilter('Republican')
                }
              }}
            />
          </li>
          <li>
            <label htmlFor="clear-party">None</label>
            <input
              id="clear-party"
              name="party"
              type="radio"
              onChange={(e) => {
                if (e.target.checked) {
                  setPartyFilter(null)
                }
              }}
            />
          </li>
        </ul>
      </form>
      <h3>Sort</h3>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}
