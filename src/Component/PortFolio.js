import React from 'react';
import {makeStyles,useTheme} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
// import Slide from '@material-ui/core/Slide';
import Typography from "@material-ui/core/Typography";
import Mood from '@material-ui/icons/Mood'
import AccountBalance from '@material-ui/icons/AccountBalance'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';
// import nigerianbanks from '../BanksLogo/nigerianbanks.png'
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
import man from  '../BanksLogo/excitedman.webp'
import manWith from  '../BanksLogo/manWith.webp'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'Zenith Bank',
        imgPath: zenith   
    },
    {
        label: 'Union Bank',
        imgPath: union   
    },
    {
        label: 'Wema Bank',
        imgPath: wema   
    },
    {
        label: 'United Bank of Africa',
        imgPath: uba    
    },
    {
        label: 'Stanbic IBTC',
        imgPath: stanbic   
    },
    {
        label: 'Access Bank',
        imgPath: acces   
    },
    {
        label: 'First City Monument Bank',
        imgPath: fcmb    
    },
    {
        label: 'Fidelity Bank',
        imgPath: fidelity    
    },
    {
        label: 'Keystone Bank',
        imgPath: keystone    
    },
    {
        label: 'Guarantee Trust Bank',
        imgPath: gtb    
    },
    {
        label: 'Sterling Bank ',
        imgPath: sterling
    },
    {
        label: 'Polaris Bank',
        imgPath: polaris
    },
    {
        label: 'Providus Bank',
        imgPath: providus
    },
    {
        label: 'First Bank',
        imgPath: first
    },
    {
        label: 'Eco Bank',
        imgPath: eco
    },
  ];

const useStyles = makeStyles(theme => ({
    roots: {
        flexGrow: 1,
    },
    root: {
        marginTop: '1rem',
    },
    content: {
        height: '100%',
        width: '97%',
    },
    trans: {
        margin: 0,
        height: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
        border: '1px solid red',
        [theme.breakpoints.up('md')]: {
            width: '97%',
            fontSize: '0.9rem',
        },
    },
    paper: {
        paddingTop: '1rem',
    },
    head: {
        textAlign: 'center',
        margin: '1rem 0',
        fontWeight: 'bold',
        [theme.breakpoints.down('md')]: {
            fontSize: '1.3rem'
        }
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: '#fff',
        color: '#7f7f7f',
      },
    wid: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    img: {
        height: 350,
        display: 'block',
        overflow: 'hidden',
        width: '100%',
    },
    roos: {
        width: '97%',
    },
    cardContainer: {
        width: '90%',
        marginLeft: '7%',
    },
    croot: {
        display: 'flex',
        marginBottom: '3rem',
      },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '55%'
    },
    c_content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '45%',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    acct: {
        width: 19,
        height: 19,
        color: '#aaa',
        paddingRight: '0.6rem',
    },
    transSection: {
        marginTop: '1rem',
        padding: '0 1rem',

    },
    typoTrans: {
        fontSize: '1.2rem',
        textAlign: 'center',
    },
}));

const PortFolio = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleStepChange = step => {
        setActiveStep(step);
    };
    return (
        <Grid item container md={9} xs={12} className={classes.roots}>
                {/* <div className={classes.container}> */}
                    <Box
                        boxShadow={2}
                        bgcolor="background.paper"
                        m={1}
                        p={1}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <Grid container className={classes.roots}>
                            <Grid item container md={7} xs={12} className={classes.trans}>
                                <div className={classes.roots}>
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        color="textPrimary"
                                        className={classes.head}
                                    >
                                        Our Partners 
                                    </Typography>
                                    <div className={classes.root}>
                                        <Paper square elevation={0} className={classes.header}>
                                            <Typography className={classes.wid}>{tutorialSteps[activeStep].label}</Typography>
                                        </Paper>                                   
                                        <AutoPlaySwipeableViews
                                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                            index={activeStep}
                                            onChangeIndex={handleStepChange}
                                            enableMouseEvents
                                            className={classes.rootsDiv}
                                        >
                                            {tutorialSteps.map((step, index) => (
                                            <div key={step.label}>
                                                {Math.abs(activeStep - index) <= 2 ? (
                                                <img className={classes.img} src={step.imgPath} alt={step.label} />
                                                ) : null}
                                            </div>
                                            ))}
                                        </AutoPlaySwipeableViews>
                                        <MobileStepper
                                            steps={maxSteps}
                                            position="static"
                                            variant="text"
                                            activeStep={activeStep}
                                            nextButton={
                                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                               
                                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                            </Button>
                                            }
                                            backButton={
                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                
                                            </Button>
                                            }
                                        />
                                    </div>
                                    
                                </div>
                            </Grid>
                            <Grid item md={5} className={classes.trans}>
                                <div className={classes.cardContainer}>
                                    <Card className={classes.croot}>
                                        <div className={classes.details}>
                                            <CardContent className={classes.c_content}>
                                            <Typography component="h5" variant="h5">
                                                One Platform, All Banks
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                              <AccountBalance className={classes.acct} />  Transactions
                                            </Typography>
                                            </CardContent>
                                            <div className={classes.controls}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Now, you dont need several applications to make transactions from your several banks.
                                                    You have got all in one!                          
                                                </Typography>
                                            </div>
                                        </div>
                                        <CardMedia
                                            component="img"
                                            height='inherit'                                           
                                            className={classes.cover}
                                            image={man}
                                            title="Live from space album cover"
                                        />
                                    </Card>
                                    <Card className={classes.croot}>
                                        <CardMedia
                                            component="img"   
                                            height='inherit'                                   
                                            className={classes.cover}
                                            image={manWith}
                                            title="Live from space album cover"
                                        />
                                        <div className={classes.details}>
                                            <CardContent className={classes.c_content}>
                                            <Typography component="h5" variant="h5">
                                                Seemless, Easy n Fast
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                              <Mood className={classes.acct} />  Smile all the way!
                                            </Typography>
                                            </CardContent>
                                            <div className={classes.controls}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Have lightning speed in making transaction. Now it easy and seemless.
                                                    Smile all the way                       
                                                </Typography>
                                            </div>
                                        </div>
                                        
                                    </Card>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Box>
                {/* </div> */}
            </Grid>
    );
};

export default PortFolio;