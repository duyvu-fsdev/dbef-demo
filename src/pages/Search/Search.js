import { Box, Typography } from '@mui/material';
import { MyTextField } from '_/components/CustomComponents/CustomComponents';

function Search() {
    return (
        <Box>
            <Typography variant="h3">Search</Typography>
            <Box
                sx={{
                    width: { 0: '30%', 760: '100%', 1200: '50%' },
                    height: 300,
                    backgroundColor: { 0: 'red', 760: '#333', 1200: '#0099' },
                    margin: '0 auto',
                }}
            />
            <MyTextField type="text" label="test" />
        </Box>
    );
}
export default Search;
