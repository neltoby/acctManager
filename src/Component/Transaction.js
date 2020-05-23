import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Fab from '@material-ui/core/Fab';
import BackComponent from './BackComponent';
// import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {ButtonFinish} from './ButtonCollection'
import ErrorBoundary from './ErrorBoundary'
import TransitionsModal from './Modal'
import {useSelector, useDispatch} from 'react-redux'
import first from '../BanksLogo/FirstBank.png'
import providus from '../BanksLogo/providusBank.jpg'
import polaris from '../BanksLogo/polaris.png'
import sterling from '../BanksLogo/Sterling-Bank.jpg'
import gtb from '../BanksLogo/gtb.jpg'
import keystone from '../BanksLogo/keystone.jpg'
import eco from '../BanksLogo/ecobank.jpg'
import fcmb from '../BanksLogo/fcmb.png'
import fidelity from '../BanksLogo/Fidelity-bank.jpg'
import acces from '../BanksLogo/accessDiamond.png'
import stanbic from '../BanksLogo/Stanbic-IBTC-Bank.png'
import uba from '../BanksLogo/UBA.jpg'
import wema from '../BanksLogo/Wema-Bank.jpg'
import union from '../BanksLogo/unionBank.png'
import zenith from '../BanksLogo/ZenithBank.jpg'
import isJson  from '../isJson'
import useFindacct from './useFindacct';
import useGenkey from './useGenkey'
import BankHeader from './BankHeader'
import SelectAcct from './SelectAcct'
import {confirmTrans,  mergedSaving, transLoadingStop,
    submitMerged, confirmTransaction, recontinueTrans, transEnd} from '../b_action'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const ColorCircularProgress = withStyles({
    root: {
        // color: '#fff',
        color: '#00695c',
    },
})(CircularProgress);


const useStyles = makeStyles(theme => ({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    option: {
        fontSize: 15,
        '& > span': {
          marginRight: 10,
          fontSize: 18,
        },       
    },
    grid: {
        [theme.breakpoints.down('md')]: {
            width: '70%',
            marginBottom: '2rem',
        },
    },
    sec_root: {
        marginTop: '2rem',
        padding: '0 1rem',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            marginTop: 0,       
        },
    },
    overflow: {
        overflowY: 'scroll',
        height: '100%',
    },
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
    acctTypes: {
        padding: '0.6rem',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: '#aaa',
        },
    },
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
    img: {
        borderRadius: '2px',
    },
    direction: {
        position: 'absolute',
        display: 'none',
        right: '0.7rem',
        bottom: '2rem',
        margin: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            display: 'block',
        }
        
    },
    end_trans: {
        color: '#fff',
        backgroundColor: '#3f51b5'
    },
    err: {
        marginTop: '1rem',
        marginBottom: '-1rem',
        color: 'tomato',
        fontSize: '0.9rem',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        height: '65vh',
        width: '60%',
        overflow: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '100vh',
        },
    },
    
}))
const banks = [
    {name: 'First Bank', src: first},
    {name: 'Guarantee Trust Bank', src: gtb},
    {name: 'Providus Bank', src: providus},
    {name: 'Polaris Bank', src: polaris},
    {name: 'Sterling bank', src: sterling},
    {name: 'Keystone', src: keystone},
    {name: 'Eco Bank', src: eco},
    {name: 'First City Monument Bank', src: fcmb},
    {name: 'Access Bank', src: acces},
    {name: 'Stanbic IBTC', src: stanbic},
    {name: 'United Bank of Africa', src: uba},
    {name: 'Wema Bank', src: wema},
    {name: 'Fidelity Bank', src: fidelity},
    {name: 'Union Bank', src: union},
    {name: 'Zenith Bank', src: zenith},
]

const Transaction = (props) => {
    const {account} = props
    const bnk = props.bank
    const store = isJson(useSelector(state => state))
    const ab = useStyles();
    const {confirmKey, acctToken} = useGenkey(account)
    const id = useFindacct(account)
    const [bank, setInputsBank] = React.useState('')
    const [inputs, setInputs] = React.useState({ acct: '', key: '', pin: '', amt: '' })
    const [acctType, setAcctType] = React.useState('')
    const [showKey, setShowKey] = React.useState(false)
    const [showPin, setShowPin] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [err, setErr] = React.useState({err: false, errText: ''})
    const dispatch = useDispatch()
    
    const selectAcct = (val) => {
        setAcctType(val)
        const formData = {bank: bank, acct: inputs.acct, key: inputs.key, 
            pin: inputs.pin, bkid: id[0].Id, type: id[0].Type, selected: val, amt: inputs.amt}
        dispatch(submitMerged(formData, acctToken))
    }
    const handleClickShowKey = (event) => {
        setShowKey(!showKey)
    }
    const handleMouseDownKey = event => {
        event.preventDefault();
    };
    const handleClickShowPin = (event) => {
        setShowPin(!showPin)
    }
    const handleMouseDownPin = event => {
        event.preventDefault();
    };
    React.useEffect(() => {
        confirmKey()
    }, [props.account])
    React.useEffect(() => {
        if(store.trans.success){
            setInputs({ acct: '', key: '', pin: '', amt: '' })
            setInputsBank('')
        }
    }, [store.trans.success])
    const endTransaction = () => {
        dispatch(transEnd())
    }
    const cancelTrans = () => {
        dispatch(confirmTransaction({}))
        dispatch(transLoadingStop())
    }
    const continueTrans = () => {
        const formData = {bank: bank, acct: inputs.acct, 
             bkid: id[0].Id, type: id[0].Type, selected: acctType, amt: inputs.amt, key: inputs.key}
        dispatch(recontinueTrans(formData, acctToken))
    }
    const handleonChange = (event) => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        })
    }
    const handleBankChange = (value) => {
        if(value !== null || value.trim().length ){
            setInputsBank(value)
        }else{
            setInputsBank('')
        }
    }
    const setErrorText = (val, type='others') => {
        if(type === 'key'){           
            setErr({
                ...err,
                err: true,
                errText: val,
            })
            if (count === 4) {
                console.log('it is 5 now')
            }
            setCount(count + 1)
            
        }else{
            setErr({
                ...err,
                err: true,
                errText: val
            })
        }
        setTimeout(() => {
            setErr({
                ...err,
                err: false,
                errText: '',
            })
        }, 4000);
        
    }
    const submitForm = (e) => {
        e.preventDefault()
        if(bank.length && inputs.acct.length === 10 && !isNaN(inputs.acct) && store.trans.genKey.status === 'active'
         && inputs.key === store.trans.genKey.code && inputs.pin.length){
            const formData = {bank: bank, acct: inputs.acct, key: inputs.key, 
                pin: inputs.pin, bkid: id[0].Id, type: id[0].Type, amt: inputs.amt}
            if(id[0].Type === 'Merged Savings/Current'){
                dispatch(mergedSaving())
            }else{
                dispatch(confirmTrans(formData, acctToken))
            }
        }else{

            if(!bank.length){
                setErrorText('Select a bank for your transaction!')
            }else if(!inputs.acct.length){
                setErrorText('Enter account number!')
            }else if(isNaN(inputs.acct)){
                setErrorText('Account number is invalid')
            }else if(inputs.acct.length !== 10){
                console.log(inputs.acct.length)
                setErrorText('Enter a 10 digit account number')
            }else if(!inputs.pin.length){
                setErrorText('Enter your pin!')
            }else if(store.trans.genKey.status !== 'active'){
                setErrorText('Expired key')
            }
            else if(inputs.key !== store.trans.genKey.code){
                setErrorText('Enter a valid key', 'key')
            }
        }
    }
    console.log(id)
    return (
        <>
        <ErrorBoundary>
            <Grid item container md={9} xs={12} className={ab.root}>
                <Paper square elevation={3} className={ab.header} >
                    <BankHeader bank={bnk} account={account} />
                    {/* <Typography variant='caption' component='div' className={ab.heading}>
                        
                    </Typography> */}
                    <form className={ab.overflow} noValidate autoComplete="off" onSubmit={submitForm}>
                        <Grid container className={ab.sec_root}>                   
                            <Grid item container md={6} sm={12} xs={12} className={ab.grid}>
                                <Autocomplete
                                    id="country-select-demo"
                                    style={{ width: 300 }}
                                    onChange={(event, value, reason) => value !== null ? handleBankChange(value.name) : handleBankChange('')}
                                    options={banks}
                                    classes={{
                                        option: ab.option,
                                    }}
                                    autoHighlight
                                    getOptionLabel={option => option.name}
                                    renderOption={option => (
                                        <React.Fragment>
                                        <span><img className={ab.img} src={option.src} width='50' height='50' alt={option.name} /></span>
                                        {option.name} 
                                        </React.Fragment>
                                    )}
                                    renderInput={params => (
                                        <TextField
                                        {...params}
                                        label="Choose a bank"
                                        variant="standard"
                                        value={bank}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item container md={1} xs={false}>

                            </Grid>
                            <Grid item container md={5} sm={12} xs={12} className={ab.grid}>
                                <TextField 
                                    onChange={handleonChange}
                                    id="acct" 
                                    label="Account" 
                                    name='acct' 
                                    type='number'
                                    value={inputs.acct}
                                    variant="standard" 
                                    required 
                                    fullWidth 
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={ab.sec_root}> 
                            <Grid item container md={1} xs={false}></Grid>
                            <Grid item container md={4} sm={12} xs={12} className={ab.grid}>
                                <TextField 
                                    onChange={handleonChange}
                                    id="key" 
                                    label="Key" 
                                    type={showKey ? 'text' : 'password'}
                                    name='key' 
                                    value={inputs.key}
                                    variant="standard" 
                                    required 
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowKey}
                                                    onMouseDown={handleMouseDownKey}
                                                    edge="end"
                                                    className={ab.icon}
                                                >
                                                    {!showKey ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),style: { color: '#444'}
                                    }}
                                 />
                            </Grid>
                            <Grid item container md={2} xs={false}></Grid>
                            <Grid item container md={4} sm={12} xs={12} className={ab.grid}>
                                <TextField 
                                    onChange={handleonChange}
                                    id="pin" 
                                    type={showPin ? 'text' : 'password'}
                                    label="Pin" 
                                    name='pin' 
                                    value={inputs.pin}
                                    variant="standard" 
                                    required 
                                    fullWidth 
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPin}
                                                    onMouseDown={handleMouseDownPin}
                                                    edge="end"
                                                    className={ab.icon}
                                                >
                                                    {!showPin ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),style: { color: '#444'}
                                    }}
                                />
                            </Grid>
                            <Grid item container md={1} xs={false}></Grid>
                        </Grid>
                        <Grid container className={ab.sec_root}> 
                            <Grid item container md={3} xs={false}></Grid>
                            <Grid item container md={6} sm={12} xs={12} className={ab.grid}>
                                <TextField 
                                    onChange={handleonChange}
                                    id="amt" 
                                    label="Amount" 
                                    type='number'
                                    name='amt' 
                                    value={inputs.amt}
                                    variant="standard" 
                                    required 
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                #
                                            </InputAdornment>
                                        ),style: { color: '#444'}
                                    }}
                                 />
                            </Grid>
                            <Grid item container md={3} xs={false}></Grid>                           
                        </Grid>
                        {err.err ? <div className={ab.err}>{err.errText}</div> : ''} 
                        <Grid container className={ab.sec_root}>
                            <Grid item container md={3} xs={false}></Grid>
                            <Grid item container md={6} sm={12} xs={12} className={ab.grid}>
                                <ButtonFinish text='Process Transaction' width={true} loading={store.trans.transLoading} />
                            </Grid>            
                            <Grid item container xs={3}></Grid>
                        </Grid>
                    </form>

            </Paper>
            </Grid>
            {store.trans.transLoading ? <TransitionsModal open={store.trans.transLoading}>{store.trans.transErr ? 
                <Typography variant="body2" className={ab.bodyBold}>
                    <p className={ab.failed}>Transaction Failed!</p>
                    {store.trans.transErr}
                </Typography> :               
                Object.entries(store.trans.transConfirm).length > 0 ?
                    <> 
                        <p className={ab.choseAcct}>Confirm Account</p>
                        <Typography variant="body2" className={ab.bodyBold}>
                            <p> Name : {store.trans.transConfirm.firstName.toUpperCase()} {store.trans.transConfirm.lastName.toUpperCase()}
                            </p>
                            <p>
                                {store.trans.transConfirm.bank.toUpperCase()}
                            </p>
                            <p>
                                {store.trans.transConfirm.country.toUpperCase()}
                            </p>
                            <Grid container className={ab.acct_container}>
                                <Grid item xs={6} className={ab.acctTypes} onClick={cancelTrans}>
                                    CANCEL
                                </Grid>
                                <Grid item xs={6} className={ab.acctTypes} onClick={continueTrans}>
                                    CONTINUE
                                </Grid>
                            </Grid>
                        </Typography>
                    </> 
                : store.trans.success ?
                    <Typography variant="body2" className={ab.bodyBold}>
                        <p className={ab.failed}>Transaction was successful!</p> 
                        <Button className={ab.end_trans} fullWidth onClick={endTransaction}> Finished</Button>
                    </Typography> 
                :
                    <>
                        <ColorCircularProgress size={20} thickness={5} />
                        <Typography variant="body2" className={ab.bodyBold}>
                            Transaction processing...
                        </Typography>
                    </>              
            } 
            </TransitionsModal> : ''
            }
            {store.trans.merged ? <SelectAcct select = {selectAcct} /> : ''}
                <BackComponent />
            </ErrorBoundary>
        </>
    );
};

export default Transaction;