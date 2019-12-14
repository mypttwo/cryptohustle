import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


import Navbar from '../Navbar/navbar';



class Main extends Component{
    DASHBOARD = 1;
    LIVE = 2;
    SETTINGS = 3;
    state = {
        display : this.DASHBOARD,
        authToken : null,
        userDbId : null,
        logout :false
    }

    componentDidMount(){
        if(this.props.location.state && this.props.location.state.authToken){
            console.log(this.props.location.state.authToken);
            this.setState({
                authToken : this.props.location.state.authToken,
                userDbId : this.props.location.state.userDbId
            })
        }
        else {
            console.log('no authToken');
        }
    }

    handleLogout = () => {
        this.setState({
            logout : true
        })
    }

    handleClickHome = () => {
        this.setState({
            display : this.HOME
        })
    }
    handleClickDashboard = () => {
        this.setState({
            display : this.DASHBOARD
        })
    }
    handleClickSettings = () => {
        this.setState({
            display : this.SETTINGS
        })
    }

    handleClickLogout = () => {
        this.setState({
            logout : true
        })
    }

    render(){
        if(this.state.logout){
            return <Redirect to={{
                pathname:'/'
            }} />
        }


        return(
            <React.Fragment>
            <Navbar 
            authToken={this.state.authToken} 
            onClickLogout={this.handleClickLogout}/>
                <div>{this.state.authToken}</div>
                <div>{this.state.userDbId}</div>
            </React.Fragment>
        )
    }
}

export default Main;