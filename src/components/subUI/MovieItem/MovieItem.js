import { Box } from '@mui/material';

import ContentItem from './ContentItem';

function MovieItem({ content = [], page, isWatchLater }) {
    const renderContent = () => {
        return content.map((item, index) => <ContentItem key={index} data={item} isWatchLater={isWatchLater} />);
    };

    return page === 'Home' ? (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    0: 'repeat(2, 1fr)',
                    480: 'repeat(3, 1fr)',
                    760: 'repeat(4, 1fr)',
                    960: 'repeat(5, 1fr)',
                    1200: 'repeat(6, 1fr)',
                    1360: 'repeat(7, 1fr)',
                    1480: 'repeat(8, 1fr)',
                    1600: 'repeat(6, 1fr)',
                },
                minHeight: '280px',
                gridAutoRows: 0,
                gridTemplateRows: '1fr',
                overflowY: 'hidden',
                columnGap: {
                    0: '2px',
                    760: '3px',
                    960: '5px',
                    1360: '6px',
                    1600: '8px',
                },
            }}
        >
            {renderContent()}
        </Box>
    ) : (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    0: 'repeat(2, 1fr)',
                    480: 'repeat(3, 1fr)',
                    760: 'repeat(4, 1fr)',
                    960: 'repeat(5, 1fr)',
                    1200: 'repeat(6, 1fr)',
                    1360: 'repeat(7, 1fr)',
                    1480: 'repeat(8, 1fr)',
                    1600: 'repeat(6, 1fr)',
                },
                minHeight: '280px',

                gridAutoRows: 'auto',
                gap: {
                    0: '2px',
                    760: '3px',
                    960: '5px',
                    1360: '6px',
                    1600: '8px',
                },
            }}
        >
            {renderContent()}
        </Box>
    );
}

export default MovieItem;
