import React from 'react';

import currencyList from '../Utils/currencyList';
import marketList from '../Utils/marketList';

const getCurrencyListJSX = (props) => {
    return Object.values(currencyList)
    .map(currency => {
    return (
    <li key={currency.symbol}>
        <a  className="dropdown-item" href="#" 
        onClick={() => props.selectCurrency(currency)}>{currency.symbol}</a>
    </li>);
    });
}

const controlBar = (props) => {
    let mlmarkup = Object.values(marketList).map(currency => <a key={currency.symbol} className="dropdown-item" href="#" onClick={() => props.selectMarket(currency)}>{currency.symbol}</a>);
    
    return(
        <div className="row">
            <div className="col-sm-3 pt-3">
            <div className="btn-group" role="group" aria-label="Button group">
                {/* <button type="button" className="btn btn-primary" onClick={props.loadData}>Refresh</button> */}
                
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" >
                    CURRENCY
                    </button>
                    <ul className="dropdown-menu columns">
                    {getCurrencyListJSX(props)}
                    </ul>
                </div>
                
                <div className="btn-group" role="group">
                    <button id="btnGroupDrop2" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" >
                    MARKET
                    </button>
                    <div className="dropdown-menu">
                    {mlmarkup}
                    </div>
                </div>                
                
                </div>                    
            </div>                
    </div>            
    )
}

export default controlBar;