import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';



class Settings extends Component{
    state = {
        exchanges : []
    }
    componentDidMount(){
        axios.get(`${server}/exchange`).then((res) => {
            console.log(res.data);
            if(res.data){
                let updatedExchanges =  res.data.map((exchange) => {
                    exchange.isSelected = true;
                    return exchange;
                });
                this.setState({
                    exchanges : updatedExchanges
                })
            }


        }).catch((err) => {
            console.error(err);
            
        })
    }

    handleCheckboxChange = (exchangeName) => {
        let exchanges = [...this.state.exchanges];
        let exchangesUpdated = exchanges.map((exchange) => {
            if(exchange.name == exchangeName){
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
                <div key={exchange.name} className="form-check form-check-inline">
                <input checked={exchange.isSelected} onChange={() => this.handleCheckboxChange(exchange.name)} className="form-check-input" type="checkbox" id={"Checkbox" + exchange.name} value={exchange.name}/>
                <label className="form-check-label" htmlFor={"Checkbox" + exchange.name}>{exchange.name}</label>
                </div>            
            )
        });        
    }

    handleSave = () => {
        //ToDo
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
                <div className="pt-3"><button onClick={this.handleSave} type="button" class="btn btn-primary">Save</button></div>
            </div> 
        )
    }
}

export default Settings;


