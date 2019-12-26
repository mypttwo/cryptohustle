import React from 'react';

import {AppContext} from '../Containers/AppContextProvider/appContextProvider';

export function withAppContext(Component){
    return function AppContextConsumerComponent(props){
        return(
            <AppContext.Consumer>
                {state => <Component {...props} {...state} />}
            </AppContext.Consumer>
        )

    }
}