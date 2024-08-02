import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ORDER_MODAL_CLOSE } from "../services/actions/order";

export const useModal = () => {
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState({
        isOpen: false,
    });
    const openModal = useCallback(() => {
        setModalState({
            isOpen: true,
        });
    }, []);

    const closeModal = useCallback(() => {
        setModalState({ isOpen: false });
        dispatch({
            type: ORDER_MODAL_CLOSE
        })
    }, [dispatch]);

    return {
        modalState,
        openModal,
        closeModal,
    };
};