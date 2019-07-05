import React, {Component} from 'react'
import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'

class App extends Component {
  changeName(value) {
    this.setState({value})
  }

  render() {
    return (
      <div className="App">
        <Header /> {/* Header */}
        <Layout /> {/* Legislator List */}
      </div>
    )
  }
}

export default App
