import { ReactComponent as MainLogo } from './logo.svg';
import { ReactComponent as MainSearch } from './search.svg';
import { ReactComponent as Vipbox } from './vip.svg';

const LogoIcon = () => <MainLogo />;
const SearchIcon = () => <MainSearch />;
const VipBox = () => <Vipbox />;

const icon = {
    clear: require('./clear.png'),
    // vipBox: require('./vip.svg').default,
};

export { LogoIcon, SearchIcon, VipBox, icon };
