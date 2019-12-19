import React from 'react';

const defaultAuthContext = {
    authToken : null,
    userDbId : null
}

const AuthContext = React.createContext(defaultAuthContext);


export default AuthContext;