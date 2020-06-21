import React, {Component} from 'react'
import ls from 'local-storage'
// import Dropzone from './imgDropZone'
import axios from 'axios'

class BusinessPro extends Component {

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

    onTextChangeCA = e => {
        e.preventDefault()
        // console.log("Event: " + e.target.files)
        console.log(e.target.files[0])
        this.setState({
          [e.target.id]: e.target.files[0]
        })
    }

    renderData = async() => {
        ls.set('store', this.state.type)
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

    upload = e => {
        e.preventDefault()
        const { dp_upload } = this.state
        let formData = new FormData()
        formData.append('img', dp_upload)
        axios({
            method: 'post',
            url: '/api/dp/' + ls.get('store'),
            headers: {
                'Authorization': 'bearer ' + ls.get('token'),
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(res => {
            console.com("This is the server's response..................")
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){

        return(
            <React.Fragment>
            <div>
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Example file input</label>
                        <input 
                            type="file" 
                            class="form-control-file" 
                            onChange={e => this.onTextChangeCA(e)}
                            id="dp_upload" />
                        <button 
                            type="submit" 
                            class="btn btn-primary" 
                            onClick={(e) => this.upload(e)}>Upload</button>
                        </div>
                </form>
            </div>
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
export default BusinessPro