import React, {Component} from 'react';

import currencyList from '../../Utils/currencyList';
import marketList from '../../Utils/marketList';

class SettingsExchangeSetup extends Component{

    state = {
        selectedCurrency : currencyList['eth'],
        selectedMarket : marketList['btc'],
    }

    addCurrencyMarketPair = () => {
        this.props.addCurrencyMarketPair(this.props.exchange, this.state.selectedCurrency, this.state.selectedMarket);
    }

    selectCurrency = (currency) => {
        console.log(currency);
        this.setState((state, props) => {
            return {selectedCurrency : currency}
        })
    }
    selectMarket = (market) => {
        console.log(market);
        this.setState({
            selectedMarket : market
        })
    }

    getCurrencyListJSX = () => {        
        return Object.values(currencyList)
        .map(currency => {
        return (
            <div key={currency.symbol} className="col-4">
                <a className="dropdown-item" data-dismiss="modal"
                    href="#" 
                    onClick={() => this.selectCurrency(currency)}>
                    {currency.symbol}
                </a>
            </div>        
            );
        });
    }

    getCurrencyListModalJSX = (exchange) => {
        return (
                <div className="modal fade" id={"currenciesModal" + exchange.key} tabIndex="-1" role="dialog" aria-labelledby="currenciesModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="currenciesModalTitle">Currencies</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        {this.getCurrencyListJSX(exchange)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
        )
    }
    
    render(){
        let exchange = this.props.exchange;

        let mlmarkup = Object.values(marketList)
        .map(currency => <a key={currency.symbol} className="dropdown-item" href="#" onClick={() => this.selectMarket(currency)}>{currency.symbol}</a>);            
        
        let currencyMarketPairsJSX = exchange.currencyMarketPairs.map((cmp,index) => {
            return (
                <tr key={index}>
                    <td><button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.deleteCurrencyMarketPair(exchange, index)}>Delete</button></td>
                    <td>{cmp.currency}</td>
                    <td>{cmp.market}</td> 
                </tr>               
            )
        })

        return (
            <React.Fragment key={exchange.key}>
            <div key={exchange.key} className="htmlForm-check htmlForm-check-inline pt-3">
            <input checked={exchange.isSelected} onChange={() => this.props.handleCheckboxChange(exchange.key)} className="htmlForm-check-input" type="checkbox" id={"Checkbox" + exchange.name} value={exchange.name}/>
            <label className="htmlForm-check-label pl-2" htmlFor={"Checkbox" + exchange.name}>{exchange.name}</label>
            </div> 
            <form>
            <div className="form-row pt-2">
            <table className="table table-sm table-bordered">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">Currency</th>
                <th scope="col">Market</th>
                </tr>
            </thead>
            <tbody>
                {currencyMarketPairsJSX}
            </tbody>
            </table>                
            </div>
            <div className="form-row pt-2">
                <div className="btn-group" role="group" aria-label="Button group">
                    <div className="btn-group" role="group">
                        <button className="btn btn-outline-primary" type="button" id="button-addon1" onClick={this.addCurrencyMarketPair}>Add</button>
                        <button id="btnGroupDrop1" type="button" 
                        className="btn btn-success dropdown-toggle" data-toggle="modal"
                        data-target={"#currenciesModal" + exchange.key} >
                        {this.state.selectedCurrency.symbol}
                        </button>
                        {this.getCurrencyListModalJSX(exchange)}
                    </div>
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop2" type="button" className="btn btn-success dropdown-toggle" data-toggle="dropdown" >
                        {this.state.selectedMarket.symbol}
                        </button>
                        <div className="dropdown-menu">
                        {mlmarkup}
                        </div>
                    </div>                    
                </div>
                

            </div>
            </form>
            </React.Fragment>           
        )
    }
}

export default SettingsExchangeSetup;