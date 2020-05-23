import React from 'react';
// import { useSelector } from 'react-redux';
// import Transactions from './Transactions'
import PortFolio from './PortFolio'
// import isJson from '../isJson';

const Main = () => {
    
    // const store = isJson(useSelector(state => state))
    // const content = store.home.transaction.length ? <Transactions /> : <PortFolio /> ;
    return (
        <>
            <PortFolio />
        </>
    );
};

export default Main;