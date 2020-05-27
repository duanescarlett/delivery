import React, { Component } from 'react'
import ls from 'local-storage'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/header'
import './App.css'
import Jumbotron from './components/jumbotron'
import StoreReg from './components/storeReg'
import Footer from './components/footer'
import MultiBuss from './components/mulitbuss'
import BusinessPro from './components/businessPro'
import MyStores from './components/MyStores '

class App extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  token = t => {// Passed in a JWT
    this.setState(() => ({
      token: t
    }))
    ls.set('token', t)
  }

  render() {
    return (
      <Router>

        <Header/>

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

        <Route 
          path='/businessPro/:company'
          exact
          component={BusinessPro}
        />

        <Route 
          path='/mystores'
          exact
          component={MyStores}
        />

        <Footer
          auth={this.state.auth}
          token={this.state.token}
        />

      </Router>
    )
  }
}

export default App
