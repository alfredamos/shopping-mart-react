import { ModalState } from "../models/util/modal-state.model";

export const initialModalState: ModalState = {  
  closeButtonName: "",
  modalMessage: "",
  modalTitle: "",
  saveButtonName: "",
  isDelete: false,

}

export class ModalAction {
  constructor(public type: string, public payload: ModalState) {}
}