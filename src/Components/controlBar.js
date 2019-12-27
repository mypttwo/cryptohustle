import React from 'react';

import currencyList from '../Utils/currencyList';
import marketList from '../Utils/marketList';


const controlBar = (props) => {
    let clmarkup = Object.values(currencyList).map(currency => <a key={currency.symbol} className="dropdown-item" href="#" onClick={() => props.selectCurrency(currency)}>{currency.symbol}</a>);
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
                    <div className="dropdown-menu">
                    {clmarkup}
                    </div>
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