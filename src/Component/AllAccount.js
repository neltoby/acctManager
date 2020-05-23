import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import isJson from '../isJson';
import Restricted from './Restricted'
import Allowed from './Allowed'

const ColorCircularProgress = withStyles({
    root: {
        color: '#00695c',
    },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}))

const AllAccount = (props) => {
    const classes = useStyles();
    const store = isJson(useSelector(state => state))
    const {acct} = useParams()
    const check = store.home.bank.filter(item => {
        if(item.Acct === acct) return  item
    });
    return (
        <Grid container spacing={2} className={classes.container}>
            {check.length ? 
            <Allowed country={props.country} bank={props.bank} acct={acct}/> 
            : <Restricted />}
        </Grid>
    );
};

export default AllAccount;