import React, {Component} from 'react'
import ls from 'local-storage'

class MultiBuss extends Component {

    constructor(props){
        super(props)
        this.state = {
            token: ls.get('token')
        }
    }

    render(){
        const {type} = this.props.match.params
        return(
            <React.Fragment>
                <code>{type}</code>
            </React.Fragment>
        )
    }
}
export default MultiBuss