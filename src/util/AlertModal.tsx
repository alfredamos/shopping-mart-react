interface Props {
  modalMessage: string;
  modalTitle: string;
  modalButtonClose: string;
  modalButtonSave: string;
  modalButtonHandler: (value: boolean) => void;
}

export function AlertModal({
  modalButtonHandler,
  modalButtonSave,
  modalMessage,
  modalTitle,
  modalButtonClose,
}: Props) {
  const tabIndexInt: number = -1;
  return (
    <>
      {/* // <!-- Modal --> */}
      <div
        className="modal"
        id="exampleModal"
        tabIndex={tabIndexInt}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button
                type="button"
                className="btn-close btn-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => modalButtonHandler(false)}
              ></button>
            </div>
            <div className="modal-body">{modalMessage}</div>
            <div className="modal-footer d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                onClick={() => modalButtonHandler(false)}
              >
                {modalButtonClose}
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
                onClick={() => modalButtonHandler(true)}
              >
                {modalButtonSave}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
