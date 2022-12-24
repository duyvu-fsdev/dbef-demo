import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const ButtonCustom = ({
    to,
    href,
    onClick,
    // set/add class for button as props
    // outline = 'false',
    // primary = 'false',
    // text = 'false',
    // scale = 'false',
    // disable = 'false',

    //insert  icon at Button side
    leftIcon,
    rightIcon,

    //another class outside Button component
    className,
    //insert  data from outside Button component
    children,

    //another Attribute
    ...passProps
}) => {
    let Comp = 'button';
    const props = {
        onClick,

        //another Attribute
        ...passProps,
    };

    //delete listenerEvent when has prop (class) 'disable'
    // if (disable) {
    //     Object.keys(props).forEach((key) => {
    //         if (key.startsWith('on') && typeof props[key] === 'function') {
    //             delete props[key];
    //         }
    //     });
    // }

    // set type off Button to Link/ <a><a/>  (default is button with onClick prop )
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    // set/add class for button similar props of Button component
    const classes = cx({
        // outline,
        // primary,
        // text,
        // scale,
        // disable,
        [className]: className,
    });

    return (
        <Comp>
            <Button className={classes} {...props}>
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Button>
        </Comp>
    );
};

export default ButtonCustom;
