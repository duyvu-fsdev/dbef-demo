import { Box, Typography } from '@mui/material';

function Search() {
    return (
        <div>
            <Typography variant="h3">Search</Typography>
            <Box
                sx={{
                    width: { 0: '30%', 760: '100%', 1200: '50%' },
                    height: 300,
                    backgroundColor: { 0: 'red', 760: '#333', 1200: '#0099' },
                    margin: '0 auto',
                }}
            />
        </div>
    );
}
export default Search;
