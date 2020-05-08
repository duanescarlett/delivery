import React, { Component } from 'react'
import ls from 'local-storage'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/header'
import './App.css'
import Jumbotron from './components/jumbotron'
import Stores from './components/stores'
import Footer from './components/footer'

class App extends Component {

  constructor(props){
    super(props)
    this.logged = this.logged.bind(this)
    this.token = this.token.bind(this)
    this.page = this.page.bind(this)
    this.state = {
      auth: false,
      page: 'home'
    }
  }

  // This logs the user in or out
  logged = q => {// Passed in a boolean
    this.setState(() => ({
      auth: q
    }))
  }

  token = t => {// Passed in a JWT
    this.setState(() => ({
      token: t
    }))
    ls.set('token', t)
  }

  page = p => {
    this.setState(() => ({
      page: p
    }))
  }

  render() {
    return (
      <Router>
      <div>
        <Header 
          logged={this.logged}
          token={this.token}
          tokenState={this.state.token}
          auth={this.state.auth}
        />

        <Route 
          path='/'
          exact
          component={() => 
            <Jumbotron 
              auth={this.state.auth} 
              token={this.state.token}
            />}
        />

        <Route 
          path='/stores'
          exact
          component={() => 
            <Stores
              auth={this.state.auth} 
              token={this.state.token}
            />}
        />

        <Footer
          auth={this.state.auth}
          token={this.state.token}
        />
      </div>
      </Router>
    )
  }
}

export default App
