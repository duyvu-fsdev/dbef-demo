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
                gridTemplateColumns: 'repeat( auto-fill, minmax(175px, 1fr))',
                // minHeight: '280px',
                gridAutoRows: 0,
                gridTemplateRows: '1fr',
                overflowY: 'hidden',
                columnGap: {
                    0: '1px',
                    720: '2px',
                    960: '3px',
                    1360: '4px',
                    1600: '5px',
                },
            }}
        >
            {renderContent()}
        </Box>
    ) : (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat( auto-fill, minmax(175px, 1fr))',
                // minHeight: '280px',
                gridAutoRows: 'auto',
                gap: {
                    0: '1px',
                    720: '2px',
                    960: '3px',
                    1360: '4px',
                    1600: '5px',
                },
            }}
        >
            {renderContent()}
        </Box>
    );
}

export default MovieItem;
