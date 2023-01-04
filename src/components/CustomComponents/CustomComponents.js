import { AppBar, styled, TextField, Tooltip, useScrollTrigger, useTheme } from '@mui/material';
import { cloneElement } from 'react';

export const MyTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& fieldset': {
            borderColor: '#aeaeae',
        },
        '&:hover fieldset': {
            borderColor: '#c7c7c7',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});

export const MyTooltip = styled(Tooltip)({
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& fieldset': {
            borderColor: '#aeaeae',
        },
        '&:hover fieldset': {
            borderColor: '#c7c7c7',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});

export const MyAppBar = ({ children }) => {
    const ScrollHandler = ({ window, children }) => {
        const theme = useTheme();

        const trigger = useScrollTrigger({
            disableHysteresis: true,
            threshold: 50,
            target: window ? window() : undefined,
        });

        let bgcl;
        if (theme.palette.mode === 'dark') bgcl = 'black';
        else bgcl = '#f1f1f1';

        return cloneElement(children, {
            // set style
            style: {
                backgroundColor: trigger ? bgcl : theme.palette.background.default,
                transition: '0.5s',
                boxShadow: trigger ? '' : 'none',
                backgroundImage: 'none',
                display: 'block',
            },
        });
    };

    const ScrollToChangeStyle = (props) => {
        return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
    };

    return (
        <ScrollToChangeStyle>
            <AppBar position="static">{children}</AppBar>
        </ScrollToChangeStyle>
    );
};

// Tooltip - click
// const [open, setOpen] = useState(false);

// const handleTooltipClose = () => {
//     setOpen(false);
// };

// const handleTooltipOpen = () => {
//     setOpen(true);
// };

// <ClickAwayListener onClickAway={handleTooltipClose}>
// <Tooltip
//     className={cx('tooltip')}
//     title={<UserPopper />}
//     arrow
//     TransitionComponent={Zoom}
//     PopperProps={{
//         disablePortal: true,
//     }}
//     onClose={handleTooltipClose}
//     open={open}
//     disableFocusListener
//     disableHoverListener
//     disableTouchListener
// >
//     <div onClick={handleTooltipOpen} className={cx('user-box')}>
//         <UserAvatar />
//     </div>
// </Tooltip>
// </ClickAwayListener>
