import { ModalState } from "./../models/util/modal-state.model";
import { modalActions } from '../action-constants/modal.constant';
import { ModalAction, initialModalState } from "../actions/modal.action";

export function modalReducer(state: ModalState, action: ModalAction): ModalState{
  
  switch(action.type){
    case modalActions.MODAL_CLOSE: return {...state, 
          closeButtonName: state.closeButtonName,
          modalMessage: state.modalMessage,
          modalTitle: state.modalTitle,
          saveButtonName: state.saveButtonName,
          isDelete: state.isDelete
         };
    case modalActions.MODAL_OPEN: return {
      closeButtonName: state.closeButtonName,
      modalMessage: state.modalMessage,
      modalTitle: state.modalTitle,
      saveButtonName: state.saveButtonName,
      isDelete: state.isDelete,
    };
    default: return initialModalState
  }
}