import React, {Component} from 'react';
import axios from 'axios';

import {server} from '../../config';

export const AppContext = React.createContext('app');

class AppContextProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            exchanges : []
        }
    }

    componentDidMount(){
        axios.get(`${server}/exchange`).then((res) => {
            if(res.data){
                this.setState({
                    exchanges : res.data
                })
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    render(){
        return (
            <AppContext.Provider
            value={{
                ...this.state
            }}>
                {this.props.children}
            </AppContext.Provider>
        )

    }
}

export default AppContextProvider;