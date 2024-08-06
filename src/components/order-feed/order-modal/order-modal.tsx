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
    

    if ( modalType === 'orders' && orderDetail.number) {
        window.history.replaceState(null, orderDetail.name, "/profile/orders/" + orderDetail.number)
    }

    if ( modalType === 'feed' && orderDetail.number) {
        window.history.replaceState(null, orderDetail.name, '/feed/' + orderDetail.number)
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