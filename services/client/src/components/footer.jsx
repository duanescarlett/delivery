import React, {Component} from 'react'

class Footer extends Component {
    render(){
        return(
            <React.Fragment>
                <footer class="footer mt-auto py-3">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary footer">
                        <a class="navbar-brand" href="/">Delapp</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                            <a class="nav-item nav-link active" href="/">About Us<span class="sr-only">(current)</span></a>
                            <a class="nav-item nav-link" href="/">Mission</a>
                            <a class="nav-item nav-link" href="/">Contact</a>
                            <a class="nav-item nav-link" href="/">FAQs</a>
                            <a class="nav-item nav-link" href="/">Tutorial</a>
                            </div>
                        </div>
                    </nav>   
                </footer>
            </React.Fragment>
        )
    }
}

export default Footer