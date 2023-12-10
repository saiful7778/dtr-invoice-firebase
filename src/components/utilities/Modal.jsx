import PropTypes from "prop-types";

const ModalComponent = ({ show, children }) => {
  if (show) {
    document.body.classList.add("overflow-y-hidden");
  } else {
    document.body.classList.remove("overflow-y-hidden");
  }
  return (
    show && (
      <div
        className="pointer-events-auto fixed inset-0 z-[1000] flex items-center justify-center bg-gray-800/30"
        role="dialog"
        aria-hidden={show}
      >
        <div className="con-bg border-color relative w-full max-w-xl rounded-lg border p-4 shadow">
          {children}
        </div>
      </div>
    )
  );
};

ModalComponent.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

const ModalBody = ({ children }) => {
  return <div>{children}</div>;
};

ModalBody.propTypes = {
  children: PropTypes.node,
};

const ModalFooter = ({ children }) => {
  return (
    <div className="mt-2 flex items-center justify-center gap-2">
      {children}
    </div>
  );
};

ModalFooter.propTypes = {
  children: PropTypes.node,
};

const Modal = Object.assign(ModalComponent, {
  Body: ModalBody,
  Footer: ModalFooter,
});

export default Modal;
