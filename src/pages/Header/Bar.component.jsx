import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '9vh',
    maxHeight: '9vh',
    position: 'fixed',
  },
  paper: {
    height: 140,
    width: 100,
  },
  rootSearch: {
    marginLeft: '500px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: 325,
  },
  iconButton: {
    padding: 10,
  },
  favorite: {
    marginLeft: '300px',
  },
  itemList: {
    width: '20vw',
    padding: '20px',
  },
}));

const Navigation = (props) => {
  const classes = useStyles();
  const { deAuthenticate, handleSubmit, handleSearchInput, search, handleShowFavorites } =
    props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={deAuthenticate}>Log out</MenuItem>
    </Menu>
  );

  return (
    <>
      <Grid item xs={12}>
        <AppBar position="static" className={classes.root}>
          <Toolbar style={{ width: '100vw' }}>
            <IconButton edge="start" color="inherit" onClick={() => toggleDrawer()}>
              <MenuIcon />
            </IconButton>
            <Paper className={classes.rootSearch}>
              <form className={classes.container} onSubmit={handleSubmit}>
                <InputBase
                  name="search"
                  className={classes.input}
                  placeholder="Search"
                  value={search}
                  inputProps={{ 'aria-label': 'search input' }}
                  disabled={true}
                  onChange={(e) => handleSearchInput(e)}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </Paper>
            <IconButton
              className={classes.favorite}
              disabled={true}
              onClick={() => handleShowFavorites()}
            >
              <FavoriteIcon style={{ color: 'red' }} />
            </IconButton>
            <IconButton disabled={true} color="inherit">
              <InvertColorsIcon />
            </IconButton>
            <IconButton edge="end" onClick={handleOpenMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            {renderMenu}
          </Toolbar>
        </AppBar>
      </Grid>
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className={classes.itemList}>Item here</div>
      </Drawer>
    </>
  );
};

export default Navigation;
