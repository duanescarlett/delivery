import React, {Component} from 'react'
// import ls from 'local-storage'

class Jumbotron extends Component {
    render(){
        return(
            <React.Fragment>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Delapp</h1>
                        <p class="lead">
                            <h3>Delapp is an open e-commerce platform</h3>
                            <p>Find local business that will deliver products to your location <br />
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
                                <img src="..." class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card card-style">
                                <img src="..." class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                        <div class="col order-first">
                            <div class="card card-style">
                                <img src="..." class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
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