import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';

const appname = 'Crypto Hustle';

class Navbar extends Component{

    HOME = 1;
    ABOUT = 2;
    CONTACT = 3;
    SIGNUP = 4;
    LOGIN = 5;
    DASHBOARD = 6;
    LIVE = 7;
    SETTINGS = 8;


    state = {
        active : this.HOME
      }

    getClassName = (link) => link === this.state.active? "nav-link active" : "nav-link";

    getNavbarEntries = () => {
      console.log(this.props.authToken);
      
      if(this.props.authToken){
        return(
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
            <a onClick={this.props.onClickDashboard} className={this.getClassName(this.DASHBOARD)} >Dashboard</a>
          </li>
          <li className="nav-item">
            <a onClick={this.props.onClickLive} className={this.getClassName(this.LIVE)} >Live</a>
          </li>
          <li className="nav-item">
            <a onClick={this.props.onClickSettings} className={this.getClassName(this.SETTINGS)} >Settings</a>
          </li>  
          <li className="nav-item">
                <a className="nav-link"  onClick={this.props.onClickLogout}><span className="fas fa-user"></span> Logout</a>
          </li>                 
        </ul> 
        </React.Fragment>
        )
      } else {
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