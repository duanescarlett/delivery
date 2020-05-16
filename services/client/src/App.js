import React, { Component } from 'react'
import ls from 'local-storage'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/header'
import './App.css'
import Jumbotron from './components/jumbotron'
import StoreReg from './components/storeReg'
import Footer from './components/footer'
import MultiBuss from './components/mulitbuss'

class App extends Component {

  constructor(props){
    super(props)
    this.logged = this.logged.bind(this)
    this.token = this.token.bind(this)
    // this.page = this.page.bind(this)
    // this.curPage = null
    this.state = {
      auth: false
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

  // page = (p) => {
  //   this.curPage = p
  // }

  render() {
    return (
      <Router>
      <div>
        <Header 
          logged={this.logged}
          // page={this.page}
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
            <StoreReg
              auth={this.state.auth} 
              token={this.state.token}
            />}
        />

        <Route 
          path='/multibuss/:type'
          exact
          component={MultiBuss}
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
