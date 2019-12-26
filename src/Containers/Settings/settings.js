import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';
import AuthContext from '../../authContext';
import {withAppContext} from '../../HOC/withAppContext';
import {getAuthConfig} from '../../Utils/getAuthConfig';


class Settings extends Component{

    static contextType = AuthContext;
    
    state = {
        exchanges : []
    }
    componentDidMount(){
        let config = getAuthConfig(this.context); 
        axios.get(`${server}/user/trackedexchanges`, config).then((res) => {
            console.log(res.data);
            if(res.data){
                let updatedExchanges =  this.props.exchanges.map((exchange) => {
                    exchange.isSelected = false;
                    let filteredExchanges = res.data.filter((trackedExchange) => trackedExchange.exchangeKey === exchange.key);
                    exchange.isSelected = filteredExchanges.length?  true : false;
                    return exchange;
                });
                
                this.setState({
                    exchanges : updatedExchanges
                })
            }


        }).catch((err) => {
            console.error(err);
            
        })
        console.log(this.props.exchanges);        
    }

    handleCheckboxChange = (exchangeKey) => {
        let exchanges = [...this.state.exchanges];
        let exchangesUpdated = exchanges.map((exchange) => {
            if(exchange.key == exchangeKey){
                exchange.isSelected = !exchange.isSelected
            }
            return exchange;
        })
        this.setState({
            exchanges : [...exchangesUpdated]
        })
    }

    getExchangeJSX = () => {
        return this.state.exchanges.map((exchange) => {
            return (
                <div key={exchange.key} className="form-check form-check-inline">
                <input checked={exchange.isSelected} onChange={() => this.handleCheckboxChange(exchange.key)} className="form-check-input" type="checkbox" id={"Checkbox" + exchange.name} value={exchange.name}/>
                <label className="form-check-label" htmlFor={"Checkbox" + exchange.name}>{exchange.name}</label>
                </div>            
            )
        });        
    }

    handleSave = () => {
      
        let config = getAuthConfig(this.context); 

        let selectedExchangesKeys = this.state.exchanges.filter(exchange => exchange.isSelected).map(exchange => exchange.key);

        axios.post(`${server}/user/trackedexchanges`,selectedExchangesKeys, config).then((res) => {
            console.log(res);
            
        }).catch((err) => {
            console.log(err);
            
        })
    }

    render(){
        return(
            <div className="container pt-5">
                <h2>Settings</h2>
                <hr/>
                <h4>Dashboard Settings</h4>
                <p>Select the Exchanges you wish to track.</p>
                <div className="form">
                    {this.getExchangeJSX()}
                </div>
                <div className="pt-3"><button onClick={this.handleSave} type="button" className="btn btn-primary">Save</button></div>
            </div> 
        )
    }
}

export default withAppContext(Settings);


