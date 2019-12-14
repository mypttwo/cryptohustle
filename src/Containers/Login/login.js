import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Navbar from '../Navbar/navbar';
import {server} from '../../config';


class Login extends Component{

    state = {
        email : '',
        password : '',
        authToken : null,
        userDbId: null,
        error : '',
    }

    isAuthenticated = (authToken, userDbId) => {
        
        this.setState({
          authToken : authToken,
          userDbId : userDbId
        })
    }

    updateEmail = (event) => {
        this.setState({
            email : event.target.value
        })
    }

    updatePassword = (event) => {
        this.setState({
            password : event.target.value
        })
    }

    resetError =() => {
        this.setState({ error : ''});        
    }

    save = () => {
        axios.post(`${server}/login`,{
            email : this.state.email,
            password : this.state.password
        }).then((res) => {
            
            this.isAuthenticated(res.data.authToken, res.data.userDbId);
        }).catch((error) => {
            if(error.response){
                this.setState({
                    error : error.response.data
                })
            }
        })
    }

    getErrorMarkup(){
        if(this.state.error){
            return(
                <div className="alert alert-warning alert-dismissible fade show mt-3">
                <strong>Sorry!</strong> {this.state.error}
                <button onClick={this.resetError} type="button" className="close" >
                <span aria-hidden="true">&times;</span>
                </button>
                </div>                
            )
        }       
    }    

    render(){
        if(this.state.authToken){
            return <Redirect to={{
                pathname:'/hustle',
                state:{
                    authToken:this.state.authToken,
                    userDbId : this.state.userDbId
                }
            }} />
        }
        return(
            <React.Fragment>
            <Navbar/>
            <div className="container pt-5">
            <h2>Login</h2>

            <form>
                <div className="form-group">
                    <label htmlFor="loginInputEmail1">Email address</label>
                    <input value={this.state.email} onChange={this.updateEmail} type="email" className="form-control" id="loginInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="loginInputPassword1">Password</label>
                    <input value={this.state.password} onChange={this.updatePassword} type="password" className="form-control" id="loginInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="loginCheck1"/>
                    <label className="form-check-label" htmlFor="loginCheck1">Remember me</label>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.save}>Submit</button>
                {this.getErrorMarkup()}                
            </form>
            </div> 
            </React.Fragment>   
        )
    }
}

export default Login;