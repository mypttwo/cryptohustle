import React from 'react';

import {decamelizeWithSpace, toTitleCase} from '../Utils/string';

const exchangeDataList = (props) => {
    if(props.data){
        let response =  Object.keys(props.data).map((key) => {
            return (<p key={key}>{toTitleCase(decamelizeWithSpace(key))} : {props.data[key]}</p>)
               });
               return response;
    }
    return null;
}

export default exchangeDataList;