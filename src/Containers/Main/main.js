import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


import Navbar from '../Navbar/navbar';
import { switchCase } from '@babel/types';
import Dashboard from '../Dashboard/dashboard';
import Settings from '../Settings/settings';
import Live from '../LIve/live';



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
            this.setState({
                logout : true
            })           
        }
    }

    handleLogout = () => {
        this.setState({
            logout : true
        })
    }

    handleClickLive = () => {
        this.setState({
            display : this.LIVE
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

    getComponentForDisplay = () => {
        switch (this.state.display) {
                case this.DASHBOARD:
                    return <Dashboard 
                    authToken={this.state.authToken} 
                    userDbId={this.state.userDbId}
                    handleLogout={this.handleClickLogout} />
                    break;
                case this.LIVE:
                    return <Live 
                    authToken={this.state.authToken} 
                    userDbId={this.state.userDbId}
                    handleLogout={this.handleClickLogout} />
                    break; 
                case this.SETTINGS:
                    return <Settings 
                    authToken={this.state.authToken} 
                    userDbId={this.state.userDbId}
                    handleLogout={this.handleClickLogout} />
                    break;                       
            default:
                    return <Dashboard 
                    authToken={this.state.authToken} 
                    userDbId={this.state.userDbId}
                    handleLogout={this.handleClickLogout} />
                break;
        }
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
            onClickLogout={this.handleClickLogout}
            onClickDashboard={this.handleClickDashboard}
            onClickLive={this.handleClickLive}
            onClickSettings={this.handleClickSettings}/>
                {this.getComponentForDisplay()}
            </React.Fragment>
        )
    }
}

export default Main;