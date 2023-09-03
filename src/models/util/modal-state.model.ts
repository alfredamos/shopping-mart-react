
export class ModalState {
  
  constructor(
    public closeButtonName: string,
    public modalMessage: string,
    public modalTitle: string,
    public saveButtonName: string,
    public isDelete: boolean
  ) {}
}