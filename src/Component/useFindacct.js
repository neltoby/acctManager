import React from 'react';
import {useSelector} from 'react-redux'
import isJson from '../isJson'

const useFindacct = (account) => {
    const store = isJson(useSelector(state => state))
    const id = store.home.bank.filter((val) => {
            if(val.Acct === account) return val
        })
    return id
}

export default useFindacct;