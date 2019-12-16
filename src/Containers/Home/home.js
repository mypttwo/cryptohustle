import React, {Component} from 'react';
import Navbar from '../Navbar/navbar';

class Home extends Component{
    render(){
        return (
            <React.Fragment>
            <Navbar/>
            <main role="main">
                <div className="jumbotron header">
                <div className="container">
                    <h1 className="display-4">Welcome to Crypto Hustle!</h1>
                    <p>Find more than 1000 crypto currencies compiled on one dashboard. You get crypto coin arbitrage and exchange based arbitrage, depending on your selected percentage. Our crypto arbitrage bot browser tool contains information about all popular crypto currencies like Bitcoin, Ethereum, XRP, EOS, plus many more.</p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                </div>
                </div>

                <div className="container">

                <div className="row">
                    <div className="col-md-4">
                    <h2>Coins</h2>
                    <p>Get live, up-to-the-minute prices of cryptocurrency coins and tokens! </p>
                    <p><a className="btn btn-secondary text-dark" href="#" role="button">View details &raquo;</a></p>
                    </div>
                    <div className="col-md-4">
                    <h2>Exchanges</h2>
                    <p>Track the leading exchanges in the world with live ticker information. </p>
                    <p><a className="btn btn-secondary text-dark" href="#" role="button">View details &raquo;</a></p>
                    </div>
                    <div className="col-md-4">
                    <h2>Arbitrage</h2>
                    <p>Take advantage of profitable arbitrage oppurtunities across multiple exchanges.</p>
                    <p><a className="btn btn-secondary text-dark" href="#" role="button">View details &raquo;</a></p>
                    </div>
                </div>

                <hr/>

                </div> 

                </main>
            </React.Fragment>            
        )
    }
}

export default Home;