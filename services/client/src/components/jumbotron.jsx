import React, {Component} from 'react'
import axios from 'axios'
import supermarket from '../../src/img/supermarket-4052658_1280.jpg'
import pharmacy from '../../src/img/pharmacy.jpg'
import restaurant from '../../src/img/restaurant.jpg'
import logoPng from '../../src/logoTrans.png'

class Jumbotron extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount = () => {
        axios.get('/api/business') 
        .then((res) => {
            // console.log(res)
            this.setState(() => ({
                businesses: res.data.businesses
            }))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(function () {
            // always executed
        })
    }

    render(){
        return(
            <React.Fragment>
                <div class="jumbotron jumbotron-fluid border">
                    <div class="container">
                        {/* <h1 class="display-4 agentOrange">Delapp</h1> */}
                        <p class="lead">
                            <p>
                                <img src={logoPng} alt="png logo" />
                            </p>
                            <h3 class="whiteText">Delapp is an open e-commerce platform</h3>
                            <p class="whiteText">
                                Find local business that will deliver products to your location <br />
                                Browse their inventory, make your purchase and share your <br />
                                location for efficient contact less shopping.
                            </p>
                        </p>
                    </div>
                </div>

                <div class="container jumbo">
                    <div class="row">
                        <div class="col order-last">
                            <div class="card card-style">
                                <img src={supermarket} class="card-img-top" width="400" height="200" alt="display" />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Supermarkets</h3>
                                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                    <a href="/multibuss/Supermarket" class="btn btn-primary text-center">Find Local Supermarkets</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card card-style">
                                <img src={pharmacy} class="card-img-top" width="400" height="200" alt="..." />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Pharmacies</h3>
                                    <p class="card-text">
                                        
                                    </p>
                                    <a href="/multibuss/Pharmacy" class="btn btn-primary  text-center">Find Local Pharmacies</a>
                                </div>
                            </div>
                        </div>
                        <div class="col order-first">
                            <div class="card card-style">
                                <img src={restaurant} class="card-img-top" width="400" height="200" alt="..." />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Restaurants</h3>
                                    <p class="card-text">
                                        
                                    </p>
                                    <a href="/multibuss/Restaurant" class="btn btn-primary text-center">Find Local Restaurants</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row top-margin-dos">
                        <div class="col order-last">
                            <div class="card card-style">
                                <img src={supermarket} class="card-img-top" width="400" height="200" alt="display" />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Convenience</h3>
                                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                    <a href="/multibuss/Convenience" class="btn btn-primary text-center">Find Local Convienience</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card card-style">
                                <img src={pharmacy} class="card-img-top" width="400" height="200" alt="..." />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Speciality</h3>
                                    <p class="card-text">
                                        
                                    </p>
                                    <a href="/multibuss/Speciality" class="btn btn-primary  text-center">Find Local Speciality Stores</a>
                                </div>
                            </div>
                        </div>
                        <div class="col order-first">
                            <div class="card card-style">
                                <img src={restaurant} class="card-img-top" width="400" height="200" alt="..." />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Discount</h3>
                                    <p class="card-text">
                                        
                                    </p>
                                    <a href="/multibuss/Discount" class="btn btn-primary text-center">Find Local Discount Stores</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row top-margin-dos">
                        <div class="col order-last">
                            <div class="card card-style">
                                <img src={supermarket} class="card-img-top" width="400" height="200" alt="display" />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Other</h3>
                                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                    <a href="/multibuss/Other" class="btn btn-primary text-center">Find Other Local Stores</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card card-style">
                                <img src={pharmacy} class="card-img-top" width="400" height="200" alt="..." />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Electronics</h3>
                                    <p class="card-text">
                                        
                                    </p>
                                    <a href="/multibuss/Electronic" class="btn btn-primary  text-center">Find Local Electronic Stores</a>
                                </div>
                            </div>
                        </div>
                        <div class="col order-first">
                            <div class="card card-style">
                                <img src={restaurant} class="card-img-top" width="400" height="200" alt="..." />
                                <div class="card-body mx-auto">
                                    <h3 class="card-title text-center">Hardware</h3>
                                    <p class="card-text">
                                        
                                    </p>
                                    <a href="/multibuss/Hardware" class="btn btn-primary text-center">Find Local Hardware Stores</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
     
            </React.Fragment>
        )
    }
}

export default Jumbotron