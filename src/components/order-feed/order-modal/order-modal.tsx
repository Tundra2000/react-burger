import React from 'react';
import Modal from '../../modal/modal';
import { useModal } from '../../../hooks/useModal';
import { ViewOrder } from '../order-view/order-view';
import { useSelector } from '../../../hooks/useReducer';
import { IOrder } from "../../utils/types";

const withModal = (WrappedComponent: React.ElementType) => (props: {modalType?: string, item?: IOrder}) => {
    const { modalType, ...exProps } = props;
    const { modalState, openModal, closeModal } = useModal();
    
    const orderDetail = useSelector((state) => state.order.orderDetail);
    const title = 'Детали заказа';
    
    //переделать отображение в зависимости от локализации (откуда запускалось модальное окно)

    //window.history.replaceState(null, orderDetail.name, '/feed/' + orderDetail._id);

    if ( modalType === 'orders' && orderDetail._id) {
        window.history.replaceState(null, orderDetail.name, "/profile/orders/" + orderDetail._id)
    }

    if ( modalType === 'feed' && orderDetail._id) {
        window.history.replaceState(null, orderDetail.name, '/feed/' + orderDetail._id)
    }

    return (
        <>
            <WrappedComponent {...exProps} modalOpen={openModal} />
            {modalState.isOpen &&
                <Modal header={title} onClose={closeModal} >
                    {<ViewOrder item={orderDetail}/>}
                </Modal>
            }
        </>

    )
};


export default withModal