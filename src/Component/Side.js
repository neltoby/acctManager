import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import { IconContext } from 'react-icons'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import UserBank from './UserBank'
import GeneralInfo from './GeneralInfo'
import {useSelector} from 'react-redux'
import isJson from '../isJson';

const ColorCircularProgress = withStyles({
    root: {
        color: '#00695c',
    },
})(CircularProgress);

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
    const store = isJson(useSelector(state => state))
    const [loading, setLoading] = React.useState(true);
    const home = isJson(store.home);
    console.log(home)
    const content = home.bank.length ? <><Typography variant='body1' className={classes.bold}>
    YOUR {home.bank.length > 1 ? 'ACCOUNTS' : 'ACCOUNT'}
</Typography><UserBank/></> : <GeneralInfo/> ;
    let size = props.overlay ? '1em' : '2em';
    const history = useHistory();
    const direct = location => {
        history.push(location)
    }
    React.useEffect(() => {
        const interval = setTimeout(() => {
                setLoading(false)
            }, 1000);
        return () => clearInterval(interval)       
    })
    
    return (
        <>
            <Grid item md={3} className={classes.root}>
                <div className={classes.container} >
                    <Box
                        boxShadow={2}
                        bgcolor="background.paper"
                        m={1}
                        p={1}
                        style={{ width: '100%', height: '100%', overflowY: 'scroll',paddingBottom: '0',marginBottom: '0' }}
                    >
                        <div className={classes.but}>
                            <Button 
                                fullWidth={true} 
                                className={classes.invoice}
                                onClick={() => direct('/open-account')}
                            >
                               OPEN AN ACCOUNT 
                            </Button>
                        </div>
                
                        <IconContext.Provider value={{ className: 'ul-icon', size: size, color: '#004d4d' }}>
                            {content}
                        </IconContext.Provider>
                    </Box>
                </div>    
            </Grid>
            
        </>
    );
};

export default Side;