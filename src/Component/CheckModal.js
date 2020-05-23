import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import AccountBalanceOutlined from '@material-ui/icons/AccountBalanceOutlined';
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { blue } from '@material-ui/core/colors';
import {displayCheckKeyFalse, checkBalErr, checkBal, acctBal} from '../action'
import {useDispatch, useSelector} from 'react-redux'
import useGenkey from './useGenkey'
import useFindacct from './useFindacct'
import isJson from '../isJson';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    amt: {
        fontWeight: 'bold',
        fontSize: '1.3rem',
        color: '#555',
    }
});

const CheckModal = (props) => {
    const ab = useStyles()
    const {open, account} = props
    const store = isJson(useSelector(state => state))
    const {acctToken} = useGenkey(account)
    const id = useFindacct(account)
    const dispatch = useDispatch()
    const [merge, setMerge] = React.useState(false)
    const [key, setKey] = React.useState('')
    const [showKey, setShowKey] = React.useState(false)
    const onChange = (e) => {
        setKey(e.target.value)
    }
    const handleClose = () => {
        dispatch(displayCheckKeyFalse())
        if (Object.entries(store.trans.accountBal).length) {
            dispatch(acctBal({}))
        }
    }
    const handleListItemClick = (acct) => {
        setMerge(false)
        dispatch(checkBal(acctToken, {key: key, bkid: id[0].Id, type: id[0].Type, selected: acct}))
    }
    const handleSubmit = () => {
        if (key.trim().length) {
            if(store.trans.genKey.status === 'active' && key === store.trans.genKey.code){
                if (id[0].Type === 'Merged Savings/Current'){
                    setMerge(true)
                }else{
                    dispatch(checkBal(acctToken, {key: key, bkid: id[0].Id, type: id[0].Type}))
                }               
            }else{
                dispatch(checkBalErr('Invalid TBT key'))
                setTimeout(() => {
                    dispatch(checkBalErr(''))
                }, 3000);
            }
        }else{
            dispatch(checkBalErr('Enter TBT key'))
            setTimeout(() => {
                dispatch(checkBalErr(''))
            }, 3000);
        }
    }
    const handleClickShowKey = (event) => {
        setShowKey(!showKey)
    }
    const handleMouseDownKey = event => {
        event.preventDefault();
    };
    const accttypes = ['Savings', 'Current']
    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{merge ? 'Select an Account' : 
                Object.entries(store.trans.accountBal).length ? 'Available Balance' : 'Security Check'}
            </DialogTitle>
            {merge ? 
            <>
                <List>
                    {accttypes.map(acct => (
                    <ListItem button onClick={() => handleListItemClick(acct)} key={acct}>
                        <ListItemAvatar>
                        <Avatar className={ab.avatar}>
                            <AccountBalanceOutlined />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={acct} />
                    </ListItem>
                    ))}
                </List>
            </> : 
            <>
                <DialogContent>
                    <DialogContentText>
                        {Object.entries(store.trans.accountBal).length ? '' : 
                            'To ensure authorised access to your account, please enter your TBT key'
                        }
                    </DialogContentText>
                    {Object.entries(store.trans.accountBal).length ?
                        <>
                            <p>
                                {store.trans.accountBal.type}
                            </p>
                                {store.trans.accountBal.selected ?
                                    <p>
                                        {store.trans.accountBal.selected}
                                    </p> : ''
                                }
                            <p className={ab.amt}>
                                {`${store.trans.accountBal.currency}${store.trans.accountBal.amt}`}
                            </p> 
                        </> :
                        <TextField
                            autoFocus
                            margin="dense"
                            id="key"
                            name='key'
                            label="TBT Key"
                            value={key}
                            onChange={onChange}
                            type={showKey ? 'text' : 'password'}
                            fullWidth
                            helperText={store.trans.balLoading ? 'Processing...' : store.trans.checkBalErr ? store.trans.checkBalErr : ''}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowKey}
                                            onMouseDown={handleMouseDownKey}
                                            edge="end"
                                        >
                                            {!showKey ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                        </IconButton>
                                    </InputAdornment>
                                ),style: { color: '#444', fontWeight: 'bold'}
                            }}
                        />
                    }                  
                </DialogContent>
                <DialogActions>
                {Object.entries(store.trans.accountBal).length ? '' : 
                    <Button onClick={handleSubmit} color="primary" disabled={store.trans.balLoading}>
                        Continue
                    </Button>
                }
                    <Button onClick={handleClose} color="primary" disabled={store.trans.balLoading}>
                        Cancel
                    </Button>
                </DialogActions>
            </>
        }
        </Dialog>
    );
};

export default CheckModal;