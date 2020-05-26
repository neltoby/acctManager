import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Home from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import LiveHelpOutlined from '@material-ui/icons/LiveHelpOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneOutlined from '@material-ui/icons/NotificationsNoneOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import isJson  from '../isJson'
import {removeSideBar, displaySideBar, loggingOut} from '../action'
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: '#fff',
    },
  grow: {
    flexGrow: 1,
  },
  badges: {
      backgroundColor: ' #0040ff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'block',
    color: ' #0040ff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
        width: '30%',
        fontSize: '1.2rem',
        
    },
  },
  icon: {
      color: '#aaa',
  },
  first: {
      marginLeft: 0,
  },
  flexItem: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 2rem',
      color: '#000',
      justifyContent: 'center',
      alignItems: 'start',
  },
  support: {
    marginRight: theme.spacing(5),
    color: '#000',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: '#ddd',
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(5),
    width: '40%',
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(3),
      width: '50%',
      fontSize: '0.7rem',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
  },
  inputRoot: {
    color: '#aaa',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  img: {
    borderRadius: '50%',
  }
}));

export default function Header() {
  const classes = useStyles();
  const store = isJson(useSelector(state => state))
  const dispatch = useDispatch()
  const history = useHistory()
  let action = store.home.side ? removeSideBar : displaySideBar ;
  let src = store.home.user.Pix ? `http://localhost:3000/${store.home.user.Pix}` : ''
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const redirect = (val) => {
    history.push(val)
    handleMobileMenuClose();
  }
  const logout = () => {
    dispatch(loggingOut())
    handleMenuClose()
  }
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton aria-label="My Account" color="inherit">
            <PersonIcon />        
        </IconButton>
        <p>My account</p>
        </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton aria-label="Logout" color="inherit">
            <ExitToAppIcon />        
        </IconButton>
        <p>Log out</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => redirect('/')}>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <Home />        
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton aria-label="show 4 new mails" color="inherit">
            <MailIcon />        
        </IconButton>
        <p>SUPPORT</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose} >
        <IconButton aria-label="show 11 new notifications" color="inherit">
            <LiveHelpOutlined />        
        </IconButton>
        <p>FAQ</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton aria-label="show 8 new notifications" color="inherit">
          <Badge badgeContent={8} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>NOTIFICATION</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <img src={src} width='35' height='35' alt={store.home.user.FirstName} className={classes.img} />
        </IconButton>
        <p> Hello {store.home.user.FirstName} {store.home.user.LastName}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar> 
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="primary"
                aria-label="open drawer"
                onClick={() => dispatch(action())}
            >
                <MenuIcon />
            </IconButton>        
          <Typography className={classes.title} variant="h6" noWrap={true}>
            Acct Manager
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          
          <div className={classes.sectionDesktop}>   
            <Typography onClick={() => redirect('/')} className={`${classes.support} ${classes.first} `} variant="body1" noWrap={true}>
                <Home />
            </Typography>
            <Typography className={`${classes.support} ${classes.first} `} variant="body1" noWrap={true}>
                SUPPORT
            </Typography>
            <Typography className={classes.support} variant="body1" noWrap={true}>
                FAQ
            </Typography>
                
            <IconButton aria-label="show 8 new notifications" color="inherit">
              <Badge badgeContent={8} color="primary">
                <NotificationsNoneOutlined className={classes.icon} />
              </Badge>
            </IconButton>
            
            <div className={classes.flexItem}>
                <span className={classes.span} >Hello</span><span>{store.home.user.FirstName} {store.home.user.LastName}</span>
            </div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              { store.home.user.Pix ? <img src={src} width='35' height='35' alt={store.home.user.FirstName} className={classes.img} /> : <Avatar><PersonIcon /></Avatar>}
            </IconButton>
            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              style={{color: "#ddd"}}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}