import React, {Component} from 'react'
import axios from 'axios'
import ls from 'local-storage'
import logo from '../../src/logo.svg'

class Header extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            token: ls.get('token')
        }
    }

    onTextChangeCA = e => {
        e.preventDefault()
        console.log("Event: " + e.target.id)
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    logout = e => {
        // e.preventDefault()
        // this.props.token('') // Remove the JWT from the state
        ls.set('token', '') // Remove the JWT from the local storage
        this.setState(() => ({
            token: ls.get('token')
        }))
    }

    login = e => {
        const { email, password } = this.state
        // e.preventDefault()
        // Do the API login call
        axios.post('/api/login', {
            email: email,
            password: password
        })
        .then((res) => {
            ls.set('token', res.data.sessionToken)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    register = e => {
        const { email, password, con_pass, type } = this.state
        // e.preventDefault()
        // Do the API call
        if(password === con_pass){
            axios.post('/api/users/add', {
                email: email,
                password: password,
                type: type
            })
            .then((response) => {
                console.log(response)
                this.setState({
                    successMessage: 'Thank you for signing up'
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }

    }

    linkHandle = (e, field, type) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: '/api/business/batch',
            headers: {
                'Authorization': 'bearer ' + this.state.token
            },
            data: {
                field: field,
                data: type
            }
        })
        .then((res) => {
            res.json({success: res})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        // const logged = this.props.auth
        const logged = this.state.token
        return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <img src={logo} alt="Logo" width="128" height="100" />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/stores">Add Your Business</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Browse Local Stores
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                        <a className="dropdown-item" 
                            // onChange={this.props.page("restaurant")}
                            href="/multibuss/Restaurant">Restaurants
                        </a>

                        <a className="dropdown-item" 
                            // onChange={this.props.page("pharmacy")}
                            href="/multibuss/Pharmacy">Pharmacies
                        </a>

                        <a className="dropdown-item" 
                            // onChange={e => this.props.page("supermarket")}
                            href="/multibuss/Supermarket">Supermarkets
                        </a>

                        <a className="dropdown-item" 
                            // onChange={e => this.props.page("convenience")}
                            href="/multibuss/Convenience">Convenience
                        </a>

                        <a className="dropdown-item" 
                            // onChange={e => this.props.page("pharmacyk")}
                            href="/multibuss/Speciality">Speciality
                        </a>

                        <a className="dropdown-item" 
                            // onChange={e => this.props.page("pharmacyk")}
                            href="/multibuss/Discount">Discount
                        </a>

                        

                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/multibuss/Other">Other</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    </ul>
                    {
                        logged 
                        ? <div><button class="btn btn-primary" id="loginPop" onClick={(e) => this.logout(e)} type="submit">Logout</button></div>
                        : <div><button class="btn btn-primary" id="loginPop" data-toggle="modal" data-target="#loginModal" type="submit">Login</button>
                        <button class="btn btn-primary ml-1" id="signupPop" data-toggle="modal" data-target="#signupModal" type="submit">Signup</button></div>
                    }
                </div>
            </nav>

            {/* <!--Login Modal--> */}
            
            <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <h6 style={{color:'red'}}>{this.state.successMessage}</h6>
                        <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    id="email"
                                    placeholder="Email" 
                                    onChange={(e) => this.onTextChangeCA(e)}
                                    required />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="password" 
                                    id="password"
                                    placeholder="Password" 
                                    onChange={(e) => this.onTextChangeCA(e)}
                                    required />
                            </div>

                            <div class="modal-footer">
                                <small>Not Yet a Member? </small>
                                <a class="btn btn-secondary" href="/signup" role="button">Register</a>
                                <button 
                                    type="submit" 
                                    class="btn btn-primary" 
                                    onClick={(e) => this.login(e)}>Submit</button>
                            </div>
                        </form>

                    </div>
                    
                </div>
            </div>
        </div>

        {/* Modal Register */}
        <div className="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Sign Up</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <div className="modal-body">
                    <h6 style={{color:'red'}}>{this.state.successMessage}</h6>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                placeholder="Your Name" 
                                id="email" 
                                aria-describedby="emailHelp" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label for="exampleInputEmail1">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                id="password" 
                                aria-describedby="emailHelp" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="con_pass" 
                                id="con_pass" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                        </div>

                        <div className="form-group">
                            <label for="exampleInputPassword1">Type</label>
                            <input 
                                type="text"
                                className="form-control" 
                                name="type" 
                                id="type" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                required />
                        </div>
                        
                        <div className="modal-footer">
                            <small>Already a Member? </small>
                            <a className="btn btn-secondary" href="/login" role="button">Login</a>
                            <button 
                                type="submit" 
                                class="btn btn-primary"
                                onClick={(e) => this.register(e)}
                                >Submit</button>
                        </div>
                    </form>

                </div>
                
                </div>
            </div>
            </div>
            
        </React.Fragment>
        )
    }
}

export default Header