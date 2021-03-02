import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { deleteChatRoom } from '../../reducks/chats/operations.js'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'
import SettingsIcon from '@material-ui/icons/Settings'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  appbar: {
    top: '55px',
    height: '35px',

    position: 'fixed',
    display: 'flex',
    zIndex: 50,
    width: '100%',
    boxShadow: 'none',
    backgroundColor: 'white',
    borderBottom: '1px solid #00000022',
    [theme.breakpoints.up('sm')]: {
      height: '48px',
      top: '70px',
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 230px)',
    },
  },
  title: {
    color: '#000000de',
    fontSize: 16,
    marginBottom: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
      marginBottom: 0,
    },
  },
  grow: {
    flexGrow: 1,
  },
  chat_menu: {
    display: 'none',
  },
  menuButtonTrue: {
    display: 'block',
  },
  menuButtonFalse: {
    display: 'none',
  },
  none: {
    display: 'none',
  },
  icon: {
    width: theme.spacing(2.8),
    height: theme.spacing(2.8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  menuButton: {
    marginBottom: 14,
    marginRight: -3,
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
      marginBottom: 0,
    },
  },
}))

const AppBarSubHeader = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [rid, setRid] = useState('')

  useEffect(() => {
    if (props.view === true) {
      const id = window.location.pathname.split('/chat/room')[1]
      if (id !== '') {
        const path = id.split('/')[1]
        setRid(path)
      }
    }
  }, [rid])

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleRoomEdit = (rid) => {
    setAnchorEl(null)
    dispatch(push('/chat/edit/' + rid))
  }
  const handleRoomDelete = (rid) => {
    setAnchorEl(null)
    dispatch(deleteChatRoom(rid))
  }

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar variant="dense">
        <Typography className={classes.title} variant="h6" color="inherit">
          {props.subtitle}
        </Typography>
        <div className={classes.grow} />

        <div
          className={
            props.view && rid.length > 12
              ? classes.menuButtonTrue
              : classes.menuButtonFalse
          }
        >
          <IconButton
            className={classes.menuButton}
            edge="end"
            aria-label="menu"
            onClick={handleMenu}
          >
            {/* <MoreIcon className={classes.icon} /> */}
            <SettingsIcon className={classes.icon} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleRoomEdit(rid)}>ルーム編集</MenuItem>
            <MenuItem onClick={() => handleRoomDelete(rid)}>
              ルーム削除
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
export default AppBarSubHeader
