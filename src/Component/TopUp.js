import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import ErrorBoundary from './ErrorBoundary'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import BankHeader from './BankHeader'
import Fab from '@material-ui/core/Fab';
import BackComponent from './BackComponent';
// import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TransitionsModal from './Modal'
import Button from '@material-ui/core/Button';
import {ButtonFinish} from './ButtonCollection'
import TopUpInput from './TopUpInput'
import SelectAcct from './SelectAcct'
import useFindacct from './useFindacct';
import useGenkey from './useGenkey'
import {topUp, transEnd, transLoading, transErr, transLoadingStop, 
    mergedSaving, mergedSavingFalse} from '../b_action'
import {useSelector, useDispatch} from 'react-redux'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const ColorCircularProgress = withStyles({
    root: {
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
    direction: {
        marginRight: '1rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    head: {
        display: 'flex',
    },
    textarea: {
        width: '70%',
    },
    heading: {
        display: 'flex',
        flexGrow: '0 1',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        color: '#3f51b5',
        marginBottom: '0.5rem',
        width: '50%',

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
            padding: '0 2%',
        },
    },
    down: {
        position: 'absolute',
        display: 'none',
        right: '0.7rem',
        bottom: '2rem',
        margin: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            display: 'block',
        }
    },
    sec_root: {
        marginTop: '1.5rem',
    },
}))

const TopUp = (props) => {
    const {bank, account} = props
    const ab = useStyles()
    const id = useFindacct(account)
    const store = useSelector(state => state)
    const {acctToken} = useGenkey(account)
    const [key, setKey] = React.useState('')
    const [showKey, setShowKey] = React.useState(false)
    const [inputs, setInputs] = React.useState([{num: '', amt: '', net: '', err: ''}])
    const dispatch = useDispatch()
    React.useEffect(() => {
        if(store.trans.success){
            setInputs([{num: '', amt: '', net: '', err: ''}])
        }
    }, [store.trans.success])
    const handleClickShowKey = (event) => {
        setShowKey(!showKey)
    }
    const handleMouseDownKey = event => {
        event.preventDefault();
    };
    const endTransaction = () => {
        dispatch(transEnd())
    }
    const selectAcct = (val) => {
        const obj = {bank: bank, type: id[0].Type, bkid: id[0].Id, key: key,
            selected: val, input: inputs}
        dispatch(mergedSavingFalse())
        dispatch(topUp(obj, acctToken))
    }
    const removeErr = () => {
        const newInputs = [...inputs]
        newInputs.forEach(element => {
            element['err'] = ''                   
        });
        setInputs(newInputs)
    }
    const remove = () => {
        
    }
    const submitForm = (e) => {
        e.preventDefault()
        const newInputs = [...inputs]
        let err = false
        newInputs.forEach(element => {
            if(element.num.length < 1 || isNaN(element.num)){
                element['err'] = 'Enter a valid mobile number'
                err = true
            }else if(element.amt.length < 1 || isNaN(element.amt)){
                element['err'] = 'Enter a valid amount'
                err = true
            }
            else if(element.net.length < 1){
                element['err'] = 'Select network'
                err = true
            }
            
        });
        if (err) {
            setInputs(newInputs)
            err = false
            setTimeout(() => {
                removeErr()
            }, 4000);
        }else{
            if(cookies.get(acctToken) && store.trans.genKey.status === 'active' && 
            key === store.trans.genKey.code){
                if(id[0].Type === 'Merged Savings/Current'){
                    dispatch(mergedSaving())
                }else{
                    let obj = {bank: bank, type: id[0].Type, bkid: id[0].Id, acct: account, input: inputs}
                    dispatch(topUp(obj, acctToken))
                }
            }else{
                dispatch(transLoading())
                dispatch(transErr('Enter a valid key'))
                setTimeout(() => {
                    dispatch(transErr(''))
                    dispatch(transLoadingStop())
                }, 2000);
            }
        }
        
    }
    const handleonChange = (event, i) => {
        event.persist()
        let newInputs = inputs.slice()
        newInputs[i] = {
            ...newInputs[i],
            [event.target.name]: event.target.value
        }
        setInputs(newInputs)
    }
    const onChangeKey = (e) => {
        setKey(e.target.value)
    }
    const addInputs = () => {
        setInputs([
            ...inputs,
            {num: '', amt: '', net: '', err: ''}
        ])
    }
    const removeInputs = (i) => {
        let newInputs = inputs.slice()
        newInputs.splice(i, 1)        
        setInputs(newInputs)
    }
    return (
        <>
            <ErrorBoundary>
                
                    <Grid item container md={9} xs={12} className={ab.root}>
                        <Paper square elevation={3} className={ab.header} >
                            <BankHeader bank = {bank} account = {account} />
                            <form className={ab.overflow} autoComplete="off" onSubmit={submitForm}>
                                <Typography variant='body2' component='div' className={ab.head}>
                                    <Typography variant='body2' component='div' className={ab.heading}>
                                        <>
                                            <Fab size='small' 
                                                color="primary" 
                                                aria-label="add" 
                                                className={ab.direction}
                                                onClick={addInputs}
                                                >
                                                +
                                            </Fab> Recharge Multiple
                                        </>
                                    </Typography>
                                    <Typography variant='body2' component='div' className={ab.heading}>
                                        <TextField 
                                            onChange={onChangeKey} 
                                            label="Key" 
                                            name='key' 
                                            type={showKey ? 'text' : 'password'}
                                            value={key}
                                            variant="standard" 
                                            required
                                            className={ab.textarea} 
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
                                    </Typography>
                                </Typography> 
                                {inputs.map((input, i) => {
                                    return (
                                        <TopUpInput 
                                            input={input} 
                                            id={i} 
                                            key={i} 
                                            onChange={handleonChange}
                                            onRemove={store.trans.topUp.transLoading ? remove : removeInputs}
                                        />
                                    )
                                })}  
                                <Grid container className={ab.sec_root}>
                                    <Grid item container md={3} xs={2}></Grid>
                                    <Grid item container md={6} xs={8} className={ab.grid}>
                                        <ButtonFinish text='Continue' width={true} loading={store.trans.topUp.transLoading} />
                                    </Grid>            
                                    <Grid item container md={3} xs={2}></Grid>
                                </Grid> 
                            </form>                                               
                        </Paper>
                        <BackComponent /> 
                    </Grid>
                
                {store.trans.transLoading ? <TransitionsModal open={store.trans.transLoading}>{store.trans.transErr ? 
                    <Typography component='div' variant="body2" className={ab.bodyBold}>
                        <p className={ab.failed}>Transaction Failed!</p>
                        {store.trans.transErr}
                    </Typography> :  
                    store.trans.success ?
                    <Typography component='div' variant="body2" className={ab.bodyBold}>
                        <p className={ab.failed}>Transaction was successful!</p> 
                        <Button className={ab.end_trans} fullWidth onClick={endTransaction}> Finished</Button>
                    </Typography> : 
                    <>
                        <ColorCircularProgress size={20} thickness={5} />
                        <Typography variant="body2" className={ab.bodyBold}>
                            Transaction processing...
                        </Typography>
                    </>
                    }
                    </TransitionsModal> : ''
                }
                {store.trans.merged ? <SelectAcct select = {selectAcct} /> : '' }
            </ErrorBoundary>
        </>
    );
};

export default TopUp;