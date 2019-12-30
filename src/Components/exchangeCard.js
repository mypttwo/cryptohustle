import React from 'react';

import ExchangeDataList from './exchangeDataList';

const ExchangeCard = (props) => {

    let collapseId = props.exchangeData.exchangeKey + 'collapse';
    
        return(
            <div className="col-sm-3 mb-2">
                <div className="card mb-2">
                    <div className="card-header">{props.exchangeData.exchangeName}</div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Last Price : {props.exchangeData.data.lastPrice}</li>
                    <li className="list-group-item">Buy : {props.exchangeData.data.buy}</li>
                    <li className="list-group-item">Sell : {props.exchangeData.data.sell}</li>
                </ul>
                <div className="card-body">
                    <p>
                        <a className="btn btn-light" data-toggle="collapse" href={"#" + collapseId} role="button" aria-expanded="false" aria-controls="collapse">
                        Show All
                        </a>
                    </p>
                    <div className="collapse" id={collapseId}>
                        <div className="collapse card card-body" id={collapseId}>
                            <ExchangeDataList data={props.exchangeData.data.allData} />
                        </div>
                    </div>   
                </div>
                <div className="card-footer">
        <small className="text-muted">Last updated : {'' + new Date()}</small>
                </div>
            </div> 
          </div>       
      )            
    
}

export default ExchangeCard