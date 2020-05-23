import React from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom' 
import {useDispatch, useSelector} from 'react-redux'
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import Slide from '@material-ui/core/Slide';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Money from '@material-ui/icons/Money';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import LocalLibraryOutlined from '@material-ui/icons/LocalLibraryOutlined';
import AccountBalanceOutlined from '@material-ui/icons/AccountBalanceOutlined';
import MobileFriendly from '@material-ui/icons/MobileFriendly';
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
import {removeSideBar, displayCheckKey, displayAccts} from '../action'
import isJson from '../isJson';
// import useFindacct from './useFindacct'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiListItemText-primary':{
            fontWeight: 'bold',
            color: '#7f7f7f',
        },
    },
    contain: {
        height: '90vh',
        [theme.breakpoints.down('md')]: {
            display: 'none',
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
    bank: {
        color: '#7f7f7f',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        }
    },
    service: {
        color: '#7f7f7f',
        marginTop: '1rem',
        fontWeight: 'bold !important',
        fontSize: '1.4rem !important',
        '&:hover':{
            backgroundColor: '#fff',
            fontSize: '1.4rem !important',
        },
    },
    mobile: {
        width: '55%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        overflowY: 'scroll',
        backgroundColor: '#fff',
    }
}))

const AllowedSide = (props) => {
    const {bank, acct} = props
    const ab = useStyles();
    // const id = useFindacct(acct)
    const history = useHistory()
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const store = isJson(useSelector(state => state))
    const banksaccess = isJson(store.home.bank)
    const otherBanks = banksaccess.filter(element => {return element.Bank !== bank})
    let currentBank = banksaccess.filter(element => {return element.Bank === bank && element.Acct!== acct})
    let src = bank === 'First Bank' ? first : bank === 'Guarantee Trust Bank' ? gtb : 
    bank === 'Providus Bank' ? providus : bank === 'Polaris Bank' ? polaris : 
    bank === 'Sterling bank' ? sterling : bank === 'Keystone' ? keystone : bank === 'Eco Bank' ?
    eco : bank === 'First City Monument Bank' ? fcmb : bank === 'Access Bank' ? acces : 
    bank === 'Stanbic IBTC' ? stanbic : bank === 'United Bank of Africa' ? uba : bank === 'Wema Bank' ?
    wema : bank === 'Fidelity Bank' ? fidelity : bank === 'Union Bank' ? union : zenith ;
    const pushHistory = (val) => {
        history.push(`${match.url}/${val}`)
    }
    const closePush = (val) => {
        dispatch(removeSideBar())
        pushHistory(val)
    }
    const fxn = props.overlay ? closePush : pushHistory ;
    const checkBal = () => {
        dispatch(removeSideBar())
        dispatch(displayCheckKey())
    }
    const otherbanksFxn = () => {
        console.log(otherBanks)
        dispatch(displayAccts(otherBanks))
        dispatch(removeSideBar())
    }
    const sameBankFxn = () => {
        console.log(currentBank)
        dispatch(displayAccts(currentBank))
        dispatch(removeSideBar())
    }
    const otherBanksDisplay = otherBanks.length ? {name:'Other Banks', onClick: otherbanksFxn, icon: <LibraryBooksOutlinedIcon />}: null ;
    const sameBank = currentBank.length ? {name:`Other ${bank} account`, onClick: sameBankFxn, icon: <LibraryAddCheckOutlinedIcon />}: null ;
    let items = [{name: 'SERVICES'},{name:'Transfer', onClick: () => fxn('transfer'), icon: <Money /> },
    {name:'Mobile Top Up', onClick: () => fxn('top-up'), icon: <MobileFriendly />}, 
    {name:'Check Bal', onClick: checkBal, icon: <AccountBalanceOutlined />}, 
    {name:'Statement of Account', onClick: () => fxn('statement'), icon: <LocalLibraryOutlined />},
    sameBank, otherBanksDisplay
    ]
    const content = (
        <>
            <img src={src} width='100%' height='200' alt={bank} />
            <Typography variant='caption' component='div' className={ab.bank}>
                {bank}
            </Typography>
            <Typography variant='h5' component='div' className={ab.bank}>
                {acct}
            </Typography>
            <List  component="nav" aria-label="main banks-option" className={ab.root}>
                {items.map((item, i) => {
                    if(item !== null){
                        if(item.onClick){
                            return(
                                <ListItem
                                    button
                                    onClick={item.onClick}
                                    key={i}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            )
                        }else{
                            return(
                                <ListItem button className={ab.service} key={i}>                                          
                                    {item.name}
                                </ListItem>
                            )
                        }
                    }
                    return null
                })}
            </List>
        </>
    ) 
    const mobile = (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Paper square elevation={3} className={ab.mobile}>{content}</Paper>
        </Slide>
    )
    const desktop = (
        <Grid item md={3} container className={ab.contain}>
            <div className={ab.container} >
                <Box
                    boxShadow={2}
                    bgcolor="background.paper"
                    m={1}
                    p={1}
                    style={{ width: '100%', height: '100%', overflowY: 'scroll',paddingBottom: '0',marginBottom: '0' }}
                >
                    {content}
                </Box>
            </div>
        </Grid>
    )
    return (
        <>
            {props.overlay ? mobile : desktop }
        </>
    );
};

export default AllowedSide;