import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const appname = 'Crypto Hustle';

class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
            <Link className="navbar-brand" to="/" >{appname}</Link>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navb" className="navbar-collapse collapse hide">

            </div>
          </nav>            
        )
    }
}

export default Navbar;