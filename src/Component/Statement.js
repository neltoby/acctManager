import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceOutlined from '@material-ui/icons/AccountBalanceOutlined';
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import Forward from "@material-ui/icons/ArrowForward"; 
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ErrorBoundary from './ErrorBoundary'
import TransitionsModal from './Modal'
import DialogModal from './DialogModal'
import useGenkey from './useGenkey'
import useFindacct from './useFindacct'
import BankHeader from './BankHeader'
import BackComponent from './BackComponent';
import {checkStatement, statementErr, statement, statementDenied} from '../action'
import {useSelector, useDispatch} from 'react-redux'
import isJson from '../isJson';

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
    table: {
        minWidth: 500,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        width: '100%',
        overflow: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            height: '100vh',
        },
    },
    sec_root: {
        display: 'flex',
        height: '50vh',
        alignItems: 'center',
    },
    typeLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '2rem',
    }
}))

    const accttypes = ['Savings', 'Current']
    const cheading = ['Date', 'Transaction Type', 'Amount', 'Bank', 'Account Debited', 'Account Name' ]
    const dheading = ['Date', 'Transaction Type', 'Amount', 'Phone Number', 'Bank', 'Account Credited', 'Account Name']

const Statement = (props) => {
    const {account, bank} = props
    const ab = useStyles()
    const {acctToken} = useGenkey(account)
    const id = useFindacct(account)
    const store = isJson(useSelector(state => state))

    const cre = (isJson(store.trans.statement))
    const cred = isJson(cre[id[0].Id])
    const credited = isJson(cred.credit) 
    const debited = isJson(cred.debit) 
    const accessMap =isJson(store.trans.statementAccess)
    const access = accessMap[id[0].Id]

    const dispatch = useDispatch()
    const [key, setKey] = React.useState('')
    const [merge, setMerge] = React.useState(false)
    const [showKey, setShowKey] = React.useState(false)
    React.useEffect(() => {
        if (accessMap[id[0].Id]){
            return
        }else{
            dispatch(statement({bid: id[0].Id, credit: [], debit: []}))
            dispatch(statementDenied(id[0].Id))
        }       
    },[account, bank])
    const handleClickShowKey = (event) => {
        setShowKey(!showKey)
    }
    const handleMouseDownKey = event => {
        event.preventDefault();
    };
    const handleListItemClick = (acct) => {
        setMerge(false)
        dispatch(checkStatement(acctToken, {key: key, bkid: id[0].Id, type: id[0].Type, selected: acct.toLowerCase()}))
    }
    const handleSubmit = () => {
        if(key.trim().length){
            if(store.trans.genKey.status === 'active' && key === store.trans.genKey.code){
                if (id[0].Type === 'Merged Savings/Current'){
                    setMerge(true)
                }else{
                    dispatch(checkStatement(acctToken, {key: key, bkid: id[0].Id, type: id[0].Type}))
                } 
            }else{
                dispatch(statementErr('Invalid TBT key'))
                setTimeout(() => {
                    dispatch(statementErr(''))
                }, 3000);
            }
        }else{
            dispatch(statementErr('Enter TBT key'))
            setTimeout(() => {
                dispatch(statementErr(''))
            }, 3000);
        }
    }
    
    return (
        <>
            <ErrorBoundary>
                <Grid item container md={9} xs={12} className={ab.root}>
                    <Paper square elevation={3} className={ab.header} >
                        <BankHeader bank={bank} account={account} />
                            <Grid container className={ab.sec_root}>
                                {access ?
                                <>
                                    {credited.length ? 
                                    <>
                                        <Typography variant='caption' component='div' className={ab.typeLabel}>
                                            Credited Transactions
                                        </Typography>
                                        <TableContainer className={ab.container}>
                                            <Table className={ab.table} stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                    {cheading.map((col, i) => (
                                                        <TableCell
                                                        key={`${i}${col}`}
                                                        align='right'
                                                        style={{ minWidth: 170 }}
                                                        >
                                                        {col}
                                                        </TableCell>
                                                    ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {credited.map((item, i) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={`${i}debit`}>
                                                            <TableCell align='right'>
                                                                {item.DateTime}
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                {item.TransType}
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                {item.Amt}
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                {item.Bank}
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                {item.Acct}
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                {item.FirstName} {item.LastName}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </> : <Typography variant='caption' component='div' className={ab.credit}>
                                            You have not had any credit Transaction
                                        </Typography>}
                                    {debited.length ? 
                                        <>
                                            <Typography variant='caption' component='div' className={ab.typeLabel}>
                                                Debit Transactions
                                            </Typography>                                          
                                            <TableContainer className={ab.container}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                        {dheading.map((col, i) => (
                                                            <TableCell
                                                            key={`${i}${col}`}
                                                            align='right'
                                                            style={{ minWidth: 170 }}
                                                            >
                                                            {col}
                                                            </TableCell>
                                                        ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {debited.map((item, i) => (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={`${i}debit`}>
                                                                <TableCell align='right'>
                                                                    {item.DateTime}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    {item.TransType}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    {item.Amt}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    {item.Phone ? item.Phone : ''}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    {item.Bank ? item.Bank : ''}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    {item.Acct ? item.Acct : ''}
                                                                </TableCell>
                                                                <TableCell align='right'>
                                                                    {item.FirstName || item.LastName ? `${item.FirstName} ${item.LastName}` : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </> : <Typography variant='caption' component='div' className={ab.credit}>
                                            You have not had any debit Transaction
                                        </Typography>
                                    } 
                                    </>
                                 : 
                                <>
                                    <Grid item container md={3} sm={2} xs={2}></Grid>
                                    <Grid item container md={6} sm={8} xs={8} className={ab.grid}>
                                        <TextField 
                                            onChange={(e) => setKey(e.target.value)}
                                            id="amt" 
                                            label="TBT Key" 
                                            type={showKey ? 'text' : 'password'}
                                            name='key' 
                                            value={key}
                                            variant="standard" 
                                            required 
                                            fullWidth
                                            helperText={store.trans.statementLoading ? 'Processing...' : store.trans.statementErr ? store.trans.statementErr : ''}
                                            InputProps={{
                                                endAdornment: (
                                                    <>
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
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleSubmit}
                                                                onMouseDown={handleMouseDownKey}
                                                                edge="end"
                                                                className={ab.icon}
                                                            >
                                                                <Forward />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    </>
                                                ),style: { color: '#444', fontWeight: 'bold'}
                                            }}
                                        />
                                    </Grid>
                                    <Grid item container md={3} sm={2} xs={2}></Grid> 
                                </>     
                                }                     
                            </Grid>
                    </Paper>
                    <BackComponent />
                </Grid>
                {merge ? 
                    <DialogModal open={merge} title='Choose account' close={() => setMerge(false)} type='statement'>
                        <List component='nav'>
                            {accttypes.map(acct => (
                                <ListItem button onClick={() => handleListItemClick(acct)} key={acct}>
                                <ListItemIcon>
                                  <AccountBalanceOutlined />
                                </ListItemIcon>
                                
                                <ListItemText primary={acct} />
                                </ListItem>                           
                            ))}
                        </List>
                    </DialogModal> : ''
                }
                {store.trans.statementLoading ? 
                    <TransitionsModal open={store.trans.statementLoading}>
                        <>
                            <ColorCircularProgress size={20} thickness={5} />
                            <Typography variant="body2" className={ab.bodyBold}>
                                Loading statement of account
                            </Typography>
                        </>
                    </TransitionsModal> : ''
                }
            </ErrorBoundary>
        </>
    );
};

export default Statement;