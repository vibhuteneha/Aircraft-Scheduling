import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ handleClose }, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            dialog.current.showModal();
        }
    }));

    return createPortal (
        <dialog ref={dialog} className="modal">
            <h2>Uhh ohh...</h2>
            <p>Looks like you forgot to select an aircraft!</p>

            <form method="dialog" onSubmit={handleClose}>
                <button onClick={() => dialog.current.close()}>Close</button>
            </form>
        </dialog>, document.getElementById("modal-root")
    );
});

export default Modal;