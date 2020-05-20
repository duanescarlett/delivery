import React, {Component} from 'react'
import ls from 'local-storage'
import axios from 'axios'

class MultiBuss extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: ls.get('token'),
            type: this.props.match.params.type
        }
    }

    componentDidMount = () => {
        axios({
            method: 'post',
            url: '/api/business/batch',
            headers: {
                'Authorization': 'bearer ' + this.state.token
            },
            data: {
                data: this.state.type
            }
        })
        .then((data) => {
            console.log(data.data.businesses)
            // this.stores = data.data.businesses
            this.setState({stores: data.data.businesses})
        })
        .catch((err) => {
            console.log(err)
        })

    }

    render(){
        
        return(
            <React.Fragment>
                <code>Do you remember me</code>
                <h5>{this.state.stores}</h5>
            </React.Fragment>
        )
    }

}
export default MultiBuss