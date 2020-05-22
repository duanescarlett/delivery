import React, {Component} from 'react'
import ls from 'local-storage'
import axios from 'axios'

class MultiBuss extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: ls.get('token'),
            type: this.props.match.params.type,
            stores: []
        }
    }

    componentDidMount = () => {
        this.renderData()
    }

    renderData = async() => {
        await axios({
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
            this.setState({stores: data.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <React.Fragment>
                <h2>Stores</h2>
                <p>
                    {
                        this.state.stores.map((business, i) => (
                            <p key={i}>
                                <a href={"/businessPro/" + business}>{business}</a>
                            </p>
                        ))
                    }
                </p>
            </React.Fragment>
        )
    }

}
export default MultiBuss