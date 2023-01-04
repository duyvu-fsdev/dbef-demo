import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { icon } from '_/assets/Icon';

import { selector } from '_/Hook/redux/selector';
import { changeFormSlice, showModalSlice } from '_/Hook/redux/slices';
import { ForgotPassword, Login, Register } from '_/pages';
import EditInfoUser from '_/utils/Auth/EditInfoUser';
import Button from '../Button/Button';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

Modal.propTypes = {};

function Modal() {
    const dispatch = useDispatch();
    const changeForm = useSelector(selector.changeForm);
    const { login, forgot, reg, edit } = changeForm;
    const handleHideModal = () => {
        dispatch(
            showModalSlice.actions.showModal({
                state: false,
            }),
        );
        dispatch(
            changeFormSlice.actions.changeForm({
                state: false,
            }),
        );
    };
    return (
        <div className={cx('wrapper')}>
            <div onClick={handleHideModal} className={cx('overlay')}></div>
            <div className={cx('inner')}>
                <Button className={cx('close-btn')} onClick={handleHideModal}>
                    <img src={icon.clear} alt="" />
                </Button>
                {login && <Login />}
                {reg && <Register />}
                {edit && <EditInfoUser />}
                {forgot && <ForgotPassword />}
            </div>
        </div>
    );
}

export default Modal;
