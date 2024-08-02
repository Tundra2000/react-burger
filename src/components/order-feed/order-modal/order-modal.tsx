import React, { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../modal/modal';
import { useModal } from '../../../hooks/useModal';
import Error from './error/error';
import IngredientDetails from '../../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import Loading from './loading/loading';
import { ViewOrder } from '../order-view/order-view';
import { useSelector } from '../../../hooks/useReducer';
import { useLocation } from 'react-router-dom';



const withModal = (WrappedComponent: React.ElementType) => (props: any) => {
    const navigate = useNavigate();

    const { modalType, ...exProps } = props;
    const { modalState, openModal, closeModal } = useModal();
    //const viewIngredient = useSelector((state) => state.ingredientDetail.ingredient)??[];
    
    const orderDetail = useSelector((state) => state.order.orderDetail);
    const order = useSelector((state) => state.order.order);
    const orderRequest = useSelector((state) => state.order.orderRequest);

    const location = useLocation();
    let from = location.state?.from || '/';

    const type = (Object.keys(orderDetail).length === 0)
        ? 'feed'
        : (order !== 0 && !orderRequest)
            ? 'order'
            : (orderRequest)
                ? 'loading'
                : 'error';

    const title = 'orderDetail';



    /*if ( type === 'ingredient' ) {
        window.history.replaceState(null, viewIngredient.name , "/ingredients/" + viewIngredient._id)
        //navigate(-1);
    }*/

    if ( type === 'feed' ) {
        window.history.replaceState(null, orderDetail.name, '/feed/' + orderDetail._id)
        //navigate(-1);
    }

    const closeIngModal = () => {
        navigate('/')
        closeModal();
    }

    return (
        <>
            <WrappedComponent {...exProps} modalOpen={openModal} />
            {modalState.isOpen &&
                <Modal header={title} onClose={closeModal} >
                    {
                        {
                            'error': <Error error='' />,
                            'ingredient': <IngredientDetails />,
                            'order': <OrderDetails />,
                            'loading': <Loading />,
                            'feed': <ViewOrder item={orderDetail}/>,
                        }[type]
                    }
                </Modal>
            }
        </>

    )
};




export default withModal