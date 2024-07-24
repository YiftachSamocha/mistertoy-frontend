import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';


export function SideBar({ nav }) {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, right: open });
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {nav.map(link => (
                    <ListItem key={link.txt} disablePadding>
                        <NavLink to={link.url}>
                            <ListItemButton>
                                <ListItemText primary={link.txt} />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
            </List>


        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)} className='sidebar-btn'><i className="fa-solid fa-bars"></i></Button>
            <SwipeableDrawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                className='sidebar'
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
}
