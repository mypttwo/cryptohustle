import React, {Component} from 'react';
import axios from 'axios';

import Navbar from '../Navbar/navbar';
import {validateEmail} from '../../Utils/validator';
const {server} = require('../../config');





class SignUp extends Component{
    state = {
        email : '',
        password : '',
        confirmPassword : '',
        error : '',
        success : ''
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
    updateConfirmPassword = (event) => {
        this.setState({
            confirmPassword : event.target.value
        })
    }



    save = () => {
        
        console.log(server);
        
        if(this.state.password.localeCompare(this.state.confirmPassword) != 0){
            this.setState({
                error : 'The passwords dont match...',
                success : ''
            })
            return;
        } else {
            this.setState({
                error : ''
            })
        }
        if(!validateEmail(this.state.email)){
            this.setState({ 
                error : `${this.state.email} does not look like a valid email...`,
                success : ''
            })
            return;
        } else {
            this.setState({error : ''})
        }
        axios.post(`${server}/register`,
        {
            email : this.state.email, 
            password : this.state.password
        }).then((data) => {
            console.log(data);
            
            this.setState({
                success : 'Success'
            })
        }).catch((error) => {
            if(error.response){
                this.setState({ 
                    error : `${error.response.data}`,
                    success : ''
                });
            } else {
                console.log(`${error.message} : server possibly down`);
                
                this.setState({ 
                    error : 'The server maybe down. Please try again in some time...',
                    success : ''
                });                
            }

        })
    }

    resetError =() => {
        this.setState({ error : ''});        
    }
    resetSuccess = () => {
        this.setState({success : ''});
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
    getSuccessMarkup = () => {
        if(this.state.success){
            return(
            <div className="alert alert-primary mt-3" role="alertSuccess">
            <h4 className="alert-heading">
                Congratulations!    
                <button onClick={this.resetSuccess} type="button" className="close" >
                <span aria-hidden="true">&times;</span>
                </button>            
            </h4>
            <p>You have successfully signed up for Crypto Hustle.</p>
            <hr/>
            <p className="mb-0">Login to start hustling!</p>
          
            </div>                
            )
        }
    }

    render(){
        console.log(server);
        
        return(
            <React.Fragment>
            <Navbar />
            <div className="container pt-5">
            <h2>Sign Up</h2>
            <p>We will never share your information with anyone else.</p>
            <form>
                <div className="form-group">
                    <label htmlFor="signupInputEmail1">Email address</label>
                    <input value={this.state.email} onChange={this.updateEmail} type="email" className="form-control" id="signupInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="signupInputPassword1">Password</label>
                    <input value={this.state.password} onChange={this.updatePassword} type="password" className="form-control" id="signupInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="signupInputPassword2">Confirm Password</label>
                    <input value={this.state.confirmPassword} onChange={this.updateConfirmPassword} type="password" className="form-control" id="signupInputPassword2" placeholder="Password"/>
                </div>                
                <button type="button" onClick={this.save} className="btn btn-primary">Submit</button>
                {this.getErrorMarkup()}
                {this.getSuccessMarkup()}
            </form>
            </div> 
            </React.Fragment>   
        )
    }
}

export default SignUp;