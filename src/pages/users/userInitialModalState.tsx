import { ModalState } from "../../models/util/modal-state.model";


export const userInitialModalState: ModalState = {
  closeButtonName: "back",
  modalMessage: "Do you really want to delete this user?",
  modalTitle: "User Delete Confirmation!",
  isDelete: false,
  saveButtonName: "Delete",
};
