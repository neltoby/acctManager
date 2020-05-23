import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import access from '../BanksLogo/accessDiamond.png'
import gtb from '../BanksLogo/gtb.jpg'
import providus from '../BanksLogo/providusBank.jpg'

const useStyles = makeStyles(theme => ({
    roots: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
}))

const GeneralInfo = () => {
    const classes = useStyles();
    const items = [{src: access, name: 'Access Bank', theme: 'Latest with us'},
    {src: gtb, name: 'Guarantee Trust Bank', theme: 'Latest with us'},
    {src: providus, name: 'Providus Bank', theme: 'Latest with us'}]
    return (
        <>
            <List className={classes.roots}>
                {items.map((item,i) => {
                    if(i === items.length - 1){
                        return (                                           
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.src} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {item.theme}
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        )
                    }else{
                        return(
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.src} />
                                </ListItemAvatar>
                                <ListItemText
                                primary={item.name}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {item.theme}
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                            />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                        )
                    }
                    
                })}
            </List>
        </>
    );
};

export default GeneralInfo;