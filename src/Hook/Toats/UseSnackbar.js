import styled from '@emotion/styled';
import { Alert, Snackbar } from '@mui/material';
// import StyleMuiOveride from '_/utils/StyleMuiOveride';

function UseSnackbar({ open, message, type, placement = '', styleOveride = {} }) {
    let anchorOrigin;

    switch (placement) {
        case 'topLeft':
            anchorOrigin = {
                vertical: 'top',
                horizontal: 'left',
            };
            break;
        case 'topCenter':
            anchorOrigin = {
                vertical: 'top',
                horizontal: 'center',
            };
            break;
        case 'topRight':
            anchorOrigin = {
                vertical: 'top',
                horizontal: 'right',
            };
            break;
        case 'bottomLeft':
            anchorOrigin = {
                vertical: 'bottom',
                horizontal: 'left',
            };
            break;
        case 'bottomCenter':
            anchorOrigin = {
                vertical: 'bottom',
                horizontal: 'center',
            };
            break;
        case 'bottomRight':
            anchorOrigin = {
                vertical: 'bottom',
                horizontal: 'right',
            };
            break;

        default:
            break;
    }

    const StyledSnackbar = styled(Snackbar)(({ theme }) => styleOveride);

    const StyledMuiAlert = styled(Alert)(({ theme }) => styleOveride);

    return (
        <>
            {type === 'default' ? (
                <StyledSnackbar open={open} message={message} anchorOrigin={anchorOrigin}></StyledSnackbar>
            ) : (
                <StyledSnackbar open={open} anchorOrigin={anchorOrigin}>
                    <StyledMuiAlert severity={type}>{message}</StyledMuiAlert>
                </StyledSnackbar>
            )}
        </>
    );
}

export default UseSnackbar;
