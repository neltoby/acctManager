import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom' 
import isJson from '../isJson';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import IconButton from '@material-ui/core/IconButton';
import {removeSideBar} from '../action'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // marginLeft: '2rem'
    },
    text: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#7f7f7f',
    }
}))

const UserBank = (props) => {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()
    const store =isJson (useSelector(state => state));
    const overlayFxn = () => {
        dispatch(removeSideBar())
    }
    return (
        <>
            <Grid item md={12} className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {store.home.bank.map((item, i) => {
                        let loc = item.Bank.replace(/\s/g, '-');
                        return(
                            <ListItem
                                key={`${item}${i}`}
                                button
                                onClick={props.overlay ? () => {history.push(`/bank/${item.Country}/${loc}/${item.Acct}`); overlayFxn();} : () => history.push(`/bank/${item.Country}/${loc}/${item.Acct}`)}
                            >
                                <ListItemText 
                                    primary={item.Bank} 
                                    secondary={item.Acct}
                                />
                                <ListItemSecondaryAction className={classes.text}>
                                        {item.Transaction} Transaction
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
        </>
    );
};

export default UserBank;