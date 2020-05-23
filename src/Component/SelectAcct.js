import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TransitionsModal from './Modal'
import Grid from "@material-ui/core/Grid";
import {useSelector} from 'react-redux'

const useStyles = makeStyles(theme => ({
    choseAcct: {
        color: '#444',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
            color: '#3f51b5',
        },
    },
    acct_container: {
        fontWeight: 'bold',
        textAlign: 'center',        
    },
    // acctTypes: {
    //     padding: '0.6rem',
    //     borderRadius: '4px',
    //     '&:hover': {
    //         backgroundColor: '#aaa',
    //     },
    // },
    acctType: {
        padding: '0.6rem',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: '#aaa',
        },
        [theme.breakpoints.down('md')]: {
            backgroundColor: '#3f51b5',
            width: '100%',
            color: '#fff',
            padding: '0.4rem',
            marginBottom: '0.4rem',
        },
    },
}))

const SelectAcct = (props) => {
    const ab = useStyles()
    const store = useSelector(state => state)
    return (
        <>
            <TransitionsModal open={store.trans.merged}>
                <p className={ab.choseAcct}>Choose account for this transaction</p>
                <Grid container className={ab.acct_container}>
                    <Grid item md={6} xs={12} className={ab.acctType} onClick={() => props.select('savings')}>
                        Saving
                    </Grid>
                    <Grid item md={6} xs={12} className={ab.acctType} onClick={() => props.select('current')}>
                        Current
                    </Grid>
                </Grid>
            </TransitionsModal>
    </>
    );
};

export default SelectAcct;