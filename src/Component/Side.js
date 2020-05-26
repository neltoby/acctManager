import React from 'react';
import { useHistory } from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import { IconContext } from 'react-icons'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import UserBank from './UserBank'
import GeneralInfo from './GeneralInfo'
import {useSelector, useDispatch} from 'react-redux'
import {removeSideBar} from '../action'
import isJson from '../isJson';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '80vh',
        marginBottom: '2rem',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'inherit',
        [theme.breakpoints.up('md')]: {
            width: '90%',
            fontSize: '0.9rem',
        },
    },
    overlayContainer: {
        width: '85%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: '#fff',
        overflow: 'scroll',
    },
    but: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(4),
    },
    invoice: {
        backgroundColor: '#428af5',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#fff',
        width: '70%',
        borderRadius: '180px',
        '&:hover': {
            backgroundColor: '#008000',
        },
        [theme.breakpoints.up('md')]: {
            width: '90%',
            fontSize: '1.0rem',
            '&:hover': {
                backgroundColor: '#008000',
            },
        },
    },
    bold: {
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#7f7f7f',
        marginTop: '1.5rem',
        textAlign: 'center',
    },
}))

const Side = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state))
    const home = isJson(store.home);
    const content = home.bank.length ? <><Typography variant='body1' className={classes.bold}>
    YOUR {home.bank.length > 1 ? 'ACCOUNTS' : 'ACCOUNT'}
</Typography><UserBank {...props}/></> : <GeneralInfo/> ;
    let size = props.overlay ? '1em' : '2em';
    const history = useHistory();
    const direct = location => {
        history.push(location)
    }
    let contentProperty = (
        <>
            <div className={classes.but}>
                <Button 
                    fullWidth={true} 
                    className={classes.invoice}
                    onClick={props.overlay ? () => {direct('/open-account'); dispatch(removeSideBar())} : () => direct('/open-account')}
                >
                    OPEN AN ACCOUNT 
                </Button>
            </div>
    
            <IconContext.Provider value={{ className: 'ul-icon', size: size, color: '#004d4d' }}>
                {content}
            </IconContext.Provider>
        </>
    )

    return (
        <>
            {props.overlay ? 
            <div className={classes.overlayContainer}>
                {contentProperty}
            </div> : 
            <Grid item md={3} className={classes.root}>
                <div className={classes.container} >
                    <Box
                        boxShadow={2}
                        bgcolor="background.paper"
                        m={1}
                        p={1}
                        style={{ width: '100%', height: '100%', overflowY: 'scroll',paddingBottom: '0',marginBottom: '0' }}
                    >
                        {contentProperty}
                    </Box>
                </div>
            </Grid>
            }
            
        </>
    );
};

export default Side;