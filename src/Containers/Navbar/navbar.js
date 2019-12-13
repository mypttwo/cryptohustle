import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

const appname = 'Crypto Hustle';

class Navbar extends Component{

    HOME = 1;
    ABOUT = 2;
    CONTACT = 3;
    SIGNUP = 4;
    LOGIN = 5;


    state = {
        active : this.HOME
      }

    getClassName = (link) => link === this.state.active? "nav-link active" : "nav-link";

    getNavbarEntries = () => {
        return (
            <React.Fragment>
            <ul className="navbar-nav">
            <li className="nav-item">
              <a className={this.getClassName(this.ABOUT)} >About</a>
            </li>
            <li className="nav-item">
              <a className={this.getClassName(this.CONTACT)} >Contact</a>
            </li>
           </ul>      
            <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
            <NavLink activeClassName="nav-link active" className="nav-link" to="/signup"><span className="fas fa-user"></span> Sign Up</NavLink>
            </li>
            <li className="nav-item">
            <NavLink activeClassName="nav-link active" className="nav-link" to="/login"><span className="fas fa-user"></span> Login</NavLink>
            </li>
          </ul> 
          </React.Fragment>              
        )
    }
    render(){
        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
            <Link className="navbar-brand" to="/" >{appname}</Link>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb" aria-expanded="true">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navb" className="navbar-collapse collapse hide">
            {this.getNavbarEntries()}
            </div>
          </nav>            
        )
    }
}

export default Navbar;