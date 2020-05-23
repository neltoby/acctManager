import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Side from './Side'
import Main from './Main'
import Footer from './Footer'
import Typography from "@material-ui/core/Typography";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'Zenith Bank',
        imgPath: zenith,   
        names: 'Frank Furtz',
        comment: 'I have had a wonderful experience with no itch using this platform'
    },
    {
        label: 'Union Bank',
        imgPath: union,
        names: 'Chloe Patrick',
        comment: "It's made banking easy and managing my account with ease"    
    },
    {
        label: 'Wema Bank',
        imgPath: wema,
        names: 'Amaze Dee',
        comment: 'My fone now has less banking apps but i have all my bank and account on the go with this!'  
    },
    {
        label: 'United Bank of Africa',
        imgPath: uba,
        names: 'Joe Melody',
        comment: 'Hmmm, i so love this! its banking made easy!'    
    },
    {
        label: 'Stanbic IBTC',
        imgPath: stanbic,
        names: 'Manny Andre',
        comment: 'Well done to Acct manager!'   
    },
    {
        label: 'Access Bank',
        imgPath: acces,
        names: 'Maureen Ney',
        comment: 'This has eased the many having to remember all the details of my various account'  
    },
    {
        label: 'First City Monument Bank',
        imgPath: fcmb,
        names: 'Lucy Rachio',
        comment: 'Amaziiinng! Thank you Account Managers'   
    },
    {
        label: 'Fidelity Bank',
        imgPath: fidelity,
        names: 'Leo Rush',
        comment: 'I have had a burden taking from making transaction.Thanks guys!'    
    },
    {
        label: 'Keystone Bank',
        imgPath: keystone,
        names: 'Lucy May',
        comment: 'thanks for this innovation, its life saving'  
    },
    {
        label: 'Guarantee Trust Bank',
        imgPath: gtb,
        names: 'Amby Laura',
        comment: 'I just keep loving this innovation'   
    },
    {
        label: 'Sterling Bank ',
        imgPath: sterling,
        names: 'Mulik Hassan',
        comment: 'Please we need more of this from you guys!'
    },
    {
        label: 'Polaris Bank',
        imgPath: polaris,
        names: 'Morris Goey',
        comment: 'Nothing has tasted better in recent time to me than banking now. Thanks again'
    },
    {
        label: 'Providus Bank',
        imgPath: providus,
        names: 'Kay Florence',
        comment: 'Never saw this coming, thought online banking was at its peak'
    },
    {
        label: 'First Bank',
        imgPath: first,
        names: 'Rigo Lance',
        comment: 'This tech is soooo amazing'
    },
    {
        label: 'Eco Bank',
        imgPath: eco,
        names: 'Austin Jay',
        comment: 'Nigeria taking the tech space!'
    },
  ];

const useStyles = makeStyles(theme => ({
    broot: {
        flexGrow: 1,
        backgroundColor: 'rgba(128,128,128,0.1)',
    },
    roots: {
        flexGrow: 1,
        backgroundColor: '#332e2d',
    },
    lroot: {
        width: '100%',
        backgroundColor: 'inherit',
        color: 'white',
    },
    lroots: {
        marginBottom: '1.5rem',
    },
    litem: {
        color: 'white',
    },
    inline: {
        display: 'inline',
        color: 'white',
    },
    contain: {
        marginBottom: '2rem',
        backgroundColor: '#7f7f7f',
    }
}))

const Home = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    // const maxSteps = tutorialSteps.length;

    // const handleNext = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep - 1);
    // };

    const handleStepChange = step => {
        setActiveStep(step);
    };
    return (
        <>           
            <Grid container spacing={2} className={classes.container}>
                <Side />
                <Main />
            </Grid>
            <Grid container spacing={2} className={classes.roots}>
                <Grid item container spacing={2} className={`${classes.roots} ${classes.contain}`}>
                    <Grid item md={3} spacing={2}>
                        
                    </Grid>
                    <Grid item md={6} xs={12} spacing={2}>
                        <div className={classes.root}>
                            <Paper square elevation={0} className={classes.header}>
                                <Typography className={classes.wid}>{tutorialSteps[activeStep].name}</Typography>
                            </Paper>                                   
                            <AutoPlaySwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                                className={classes.rootsDiv}
                            >
                                {tutorialSteps.map((step, index) => (
                                <div key={step.label} className={classes.list}>                                   
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <List className={classes.lroot}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={step.imgPath} />
                                                </ListItemAvatar>
                                                <ListItemText className={classes.litem}
                                                primary={step.label}
                                                secondary={
                                                    <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {step.names}
                                                    </Typography>
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {`" — ${step.comment}…"`}
                                                    </Typography>
                                                    
                                                    </React.Fragment>
                                                }
                                                />
                                            </ListItem>
                                        </List>
                                    
                                    ) : null}
                                </div>
                                ))}
                            </AutoPlaySwipeableViews>
                            
                        </div>
                        
                    </Grid>
                    <Grid item md={3} spacing={2}>
                        
                    </Grid>
                </Grid>
                <Grid  container spacing={2} className={classes.lroots}>
                    <Footer />
                </Grid>               
            </Grid>
            
        </>
    );
};

export default Home;