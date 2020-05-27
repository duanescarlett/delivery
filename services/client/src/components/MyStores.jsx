import React, {Component} from 'react'
import ls from 'local-storage'
import axios from 'axios'

class MyStores extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: ls.get('token'),
            type: this.props.match.params.company
        }
    }

    componentWillMount = () => {
        this.renderData()
    }

    renderData = async() => {
        await axios({
            method: 'get',
            url: '/api/business/' + this.state.type,
            headers: {
                'Authorization': 'bearer ' + this.state.token
            }
        })
        .then((data) => {

            let stack = data.data.bus
            for(let i = 0; i < stack.length; i++){
                let key = stack[i]
                let index = key[0]
                this.setState({[index]: key[1]})
            }

        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){

        return(
            <React.Fragment>
            <div>
                <h5>Business Profile</h5>
                <code>{this.state.name}</code><br/>
                <code>{this.state.buildingNum}</code><br/>
                <code>{this.state.street}</code><br/>
                <code>{this.state.city}</code><br/>
                <code>{this.state.state}</code><br/>
                <code>{this.state.zip}</code><br/>
                <code>{this.state.gps}</code><br/>
                
            </div>
            </React.Fragment>
        )
    }

}
export default MyStores