import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';


import Navbar from '../Navbar/navbar';
import Dashboard from '../Dashboard/dashboard';
import Settings from '../Settings/settings';
import Live from '../Live/live';

import AuthContext from '../../authContext';



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
        if(this.state.authToken){
            switch (this.state.display) {
                    case this.DASHBOARD:
                        return <Dashboard />

                    case this.LIVE:
                        return <Live />

                    case this.SETTINGS:
                        return <Settings />
                        
                default:
                        return <Dashboard />

            }
        } 
    }

    render(){
        if(this.state.logout){
            return <Redirect to={{
                pathname:'/'
            }} />
        }
        

        return(
            <AuthContext.Provider 
            value={{
                authToken : this.state.authToken, 
                userDbId : this.state.userDbId,
                doLogout : this.handleClickLogout
                }}   >  
            <React.Fragment>
            <Navbar 
            onClickLogout={this.handleClickLogout}
            onClickDashboard={this.handleClickDashboard}
            onClickLive={this.handleClickLive}
            onClickSettings={this.handleClickSettings}/>
                {this.getComponentForDisplay()}
            </React.Fragment>
            </AuthContext.Provider>
        )
    }
}

export default Main;