import React, { FC, ReactNode } from 'react';
import Modal from '../../modal/modal';
import { useModal } from '../../../hooks/useModal';
import { ViewOrder } from '../order-view/order-view';
import { useSelector } from '../../../hooks/useReducer';
import { useLocation } from 'react-router-dom';



const withModal = (WrappedComponent: React.ElementType) => (props: any) => {
    const { modalType, ...exProps } = props;
    const { modalState, openModal, closeModal } = useModal();
    
    const orderDetail = useSelector((state) => state.order.orderDetail);
    const title = 'Детали заказа';
    
    window.history.replaceState(null, orderDetail.name, '/feed/' + orderDetail._id);


    return (
        <>
            <WrappedComponent {...exProps} modalOpen={openModal} />
            {modalState.isOpen &&
                <Modal header={title} onClose={closeModal} >
                    <ViewOrder item={orderDetail}/>
                </Modal>
            }
        </>

    )
};


export default withModal