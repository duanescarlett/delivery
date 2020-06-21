import React, {Component} from 'react'
import ls from 'local-storage'
import axios from 'axios'
import store from './../redux/store'

class MyStores extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: ls.get('token'),
            stores: []
        }
    }

    componentDidMount = () => {
        this.renderData()
        
        // Redux Test
        const unsubscribe = store.subscribe(() => {
            console.log("Store changed", store.getState())
        })

        store.dispatch({
            type: "bugAdded",
            payload: {
                description: "Bug 1"
            }
        })

         unsubscribe()
        // store.dispatch({
        //     type: "bugRemoved",
        //     payload: {
        //         id: 1
        //     }
        // })
        console.log(store.getState())
    }

    renderData = async() => {
        await axios({
            method: 'get',
            url: '/api/business/user',
            headers: {
                'Authorization': 'bearer ' + this.state.token
            }
        })
        .then((data) => {
            // console.log(data)
            this.setState({stores: data.data})
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
                    <p>
                        {
                            this.state.stores.map((store, i) => (
                                <p key={i}>
                                    <a href={"/businessPro/" + store}>{store}</a>
                                </p>
                            ))
                        }
                    </p>
                </div>
            </React.Fragment>
        )
    }
}
export default MyStores