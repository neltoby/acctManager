import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom' 
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SideModal from './SideModal'
import Side from './Side'
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Money from '@material-ui/icons/Money' 
import Avatar from '@material-ui/core/Avatar';
import BackComponent from './BackComponent';
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
import {openAcct, removeSideBar} from '../action'
import isJson  from '../isJson'

const ColorCircularProgress = withStyles({
    root: {
        // color: '#fff',
        color: '#00695c',
    },
})(CircularProgress);
const BlueCheckbox = withStyles({
    root: {
      color: '#428af5',
      '&$checked': {
        color: '#428af5',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '2rem',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0
        }
    },
    center: {
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        height: '65vh',
        width: '70%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    heading: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'start',
        fontSize: '1.3rem',
        color: '#7f7f7f',
        fontWeight: 'bold',
    },
    name: {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        fontWeight: 'bold',
        fontSize: '1.3rem',
    },
    pic: {
        paddingRight: theme.spacing(6),
        paddingLeft: theme.spacing(3),
    },
    body: {
        fontWeight: 'bold',
        color: '#7f7f7f',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(4),
    },
    listItem: {
        // width: '100% !important',
    },
    selected: {
        display: 'flex',
        justifyContent: 'center',
    },
    container: {
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '90%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '5px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            width: '3px',
            '&:hover': {
                backgroundColor: '#555',
            }
        },
    },
    buttonContainer: {
        display: 'flex',
        marginTop: theme.spacing(4),
        width: '70%',
    },
    button: {       
        width: '40%',
        margin: '0 5% 0 0',
        backgroundColor: '#3f83d4',
        color: '#fff !important',
        '&:hover': {
            backgroundColor: '#014f96',
        }
    },
    text: {
        padding: '1rem',
        color: '#7f7f7f',
    },
    progress: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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
const accounts = ['Savings', 'Current', 'Merged Savings/Current', 'Domicillary']
const cards = ['Velve Debit', 'Master Card']

const OpenAccount = () => {
    const ab = useStyles()
    const store = isJson(useSelector(state => state))
    const history = useHistory()
    const dispatch = useDispatch()
    const [stage, setStage] = React.useState(1)
    const [check, setChecked] = React.useState([0])
    const [selectedCards, setSelectedCards] = React.useState([cards[0]])
    const [loading, setLoading] = React.useState(false)
    const [stageTwo, setStageTwo] = React.useState(null)
    const top = !loading ? stage === 1 ? 'Select Bank' : stage === 2 ? 'Choose an account' : 
    `Select Card(s) for your account` : <ColorCircularProgress size={25} /> ;
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    };
    const cancel = () => {
        setSelectedIndex(null);
    };
    const create = () => {
        setLoading(true)
        let formData = {country: 'Nigeria', bank: banks[selectedIndex].name, type: accounts[stageTwo], cards: selectedCards}
        setTimeout(() => {
            dispatch(openAcct(formData, history))
        }, 2000);      
    }
    const backFxn = () => {
        setLoading(false)
        setStage(stage - 1)
    }
    const nextFxn = () => {
        if(stage === 2){
            if(stageTwo !== null){
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setStage(stage + 1)
                }, 2000);
            }

        }else{
            setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setStage(stage + 1)
                }, 2000);
        }
        
        
    }
    const handleCheckBox = val => {
        const currentIndex = check.indexOf(val);
        let newChecked = [...check];
        let newSelectedCards = [...selectedCards]
        if (currentIndex === -1) {
          newChecked = [...check,val];
          newSelectedCards = [...newSelectedCards, cards[val]]
        } else {
          newChecked.splice(currentIndex, 1);
          newSelectedCards.splice(currentIndex, 1)
        }
        setChecked(newChecked);
        setSelectedCards(newSelectedCards)
    }
    const handleStageTwo = (e, i) => {
        setStageTwo(i)
    }
    const disabled = (stage === 1 && selectedIndex !== null && !loading) || 
    (stage === 2 && stageTwo !== null && !loading) || 
    (stage === 3 && check.length && !loading)  ? false : true ;
    // const backDis = loading ? true 
    const backButton = stage !== 1 ? <Button className={ab.button} disabled={loading} onClick={backFxn}>Back</Button> : '' ;
    const next = stage === 3 ? 'Create Account' : 'Next' ;
    const fxn = stage === 3 ? create : nextFxn ;
    let items = stage === 1 ? banks : stage === 2 ? accounts : cards ;
    const [count, setCount] = React.useState(3)
    
    React.useEffect(() => {
        let myFxn = setInterval(() => {setCount(count-1)}, 1000);
        return () => {
            clearInterval(myFxn)
        }
    }
    ,[store.home.create])
    return (
        <>
            <div className={ab.root}>
                <Grid container spacing={2} className={ab.root}>
                    <Grid item md={3} sm={1} xs={1} className={ab.left}></Grid>
                    <Grid item container md={6} sm={10} xs={10} className={ab.center}>
                        <Paper square elevation={3} className={ab.header} >
                            <Paper className={ab.heading}>
                                <Typography component='div' className={ab.selected}>
                                    <Typography component='span' className={ab.name}>
                                        {top}
                                    </Typography>
                                    { !loading ? stage === 1 ? selectedIndex !== null ? 
                                    <>
                                    <Typography component='span' className={ab.select}> - {banks[selectedIndex].name}</Typography>
                                    <Typography component='span' className={ab.pic}> 
                                        <Avatar alt={banks[selectedIndex].name} src={banks[selectedIndex].src} />    
                                    </Typography>
                                    <Typography component='span' className={ab.cancel} onClick={cancel}> 
                                        &times;
                                    </Typography>
                                    </> : '' : '' : '' }
                                </Typography>
                            </Paper>
                            <div className={ab.container}>
                                {!loading ?
                                <List  component="nav" aria-label="main banks-option" className={ab.listItem}>
                                    {items.map((val, i) => {
                                        if(stage === 1){
                                            return(
                                                <ListItem 
                                                    key={val.name}
                                                    selected={selectedIndex === i}
                                                    onClick={event => handleListItemClick(event, i)}
                                                    button>
                                                    <ListItemAvatar className={ab.body}>
                                                        <Avatar alt={val.name} src={val.src} className={ab.large} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    primary={val.name}
                                                    secondary={val.secondary ? 'Secondary text' : null}
                                                    />
                                                </ListItem>
                                            )
                                        }else if(stage === 2){
                                            return(
                                                <ListItem 
                                                    key={val}
                                                    selected={stageTwo === i}
                                                    onClick={event => handleStageTwo(event, i)}
                                                    button>
                                                    <ListItemText
                                                    primary={val}
                                                    secondary={val.secondary ? 'Secondary text' : null}
                                                    />
                                                </ListItem>
                                            )
                                        }else{
                                            console.log(selectedCards)
                                            return(
                                                <ListItem onClick={() => handleCheckBox(i)}
                                                    selected={selectedIndex === i}
                                                    button>
                                                    <ListItemAvatar className={ab.body}>
                                                        <Avatar>
                                                            <Money />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                    primary={val}
                                                    secondary={val.secondary ? 'Secondary text' : null}
                                                    />
                                                    <ListItemSecondaryAction onClick={() => handleCheckBox(i)}>
                                                        <BlueCheckbox
                                                            checked={check.indexOf(i) !== -1}
                                                            name="sub"
                                                            color="primary"
                                                        />                                  
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )
                                        }
                                    })}
                                </List>
                                : <div className={ab.progress}>{stage === 3 ? !store.home.create ? 
                                <><ColorCircularProgress size={25} /><p>Creating your account</p></> : 
                                <><h3 className={ab.body}>Account Created!</h3>
                                    <Typography component='div' className={ab.text}> 
                                        You will be redirected in {count}s. 
                                        And if you are not redirected, please click the button below    
                                    </Typography>
                                    {setTimeout(() => {
                                        return <Button onClick={() => history.push(`/bank/Nigeria/${banks[selectedIndex].name.replace(/\s/g, '-')}`)} className={ab.button}>
                                            Redirect
                                        </Button> 
                                    }, 3000)}
                                </> :
                                <ColorCircularProgress size={25} />}</div>}
                            </div>
                        </Paper>
                        <div className={ab.buttonContainer}>
                            {backButton}<Button className={ab.button} disabled={disabled} onClick={fxn}> {next}</Button>
                        </div>
                    </Grid>
                    <Grid item md={3} sm={1} xs={1} className={ab.right}></Grid>
                </Grid>
                    <BackComponent />
                {store.home.side ? <SideModal close={() => dispatch(removeSideBar())}><Side overlay={true} /></SideModal> : '' }
            </div>
        </>
    );
};

export default OpenAccount;