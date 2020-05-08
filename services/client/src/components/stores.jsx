import React, {Component} from 'react'
import axios from 'axios'
import ls from 'local-storage'

class Stores extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: ls.get('token')
        }
    }

    componentDidMount = () => {

    }

    register = e => {
        e.preventDefault()
        const { name, manager, buildingNum, street, city, state, zip, gps } = this.state
        axios({
            method: 'post',
            url: '/api/restaurant/add',
            headers: {
                'Authorization': 'bearer ' + this.state.token
            },
            data: {
                name: name,
                manager: manager,
                buildingNum: buildingNum,
                street: street,
                city: city,
                state: state,
                zip: zip,
                gps: gps
            }
        })
        .then((res) => {
            this.setState(() => ({
                reg: 'success'
            }))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onTextChangeCA = e => {
        e.preventDefault()
        console.log("Event: " + e.target.id)
        this.setState({
          [e.target.id]: e.target.value
        })
    }

    render(){
        return(
            <React.Fragment>
                <h1>Stores</h1>
                <p>
                    Add your store so that your local or international customers can purchase from anyware in the world
                </p>

                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Business Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                id="name"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4">Manager</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                id="manager"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <h6>Address</h6>
                        <label for="inputAddress">Building Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="buildingNum" 
                            onChange={(e) => this.onTextChangeCA(e)}
                            placeholder="1234"/>
                    </div>
                    <div className="form-group">
                        <label for="inputAddress2">Street</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange={(e) => this.onTextChangeCA(e)}
                            id="street"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                id="city"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputCity">State / Province / Parish etc.</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                id="state"/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="inputZip">Zip</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                id="zip"/>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="inputZip">GPS code</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onTextChangeCA(e)}
                                id="gps"/>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        class="btn btn-primary" 
                        onClick={(e) => this.register(e)}>Register</button>
                </form>
            </React.Fragment>
        )
    }
}
export default Stores