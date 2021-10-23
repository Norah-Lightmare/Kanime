import React, { FC, HTMLAttributes, useEffect, useRef } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, close, ...rest }) => {
  const background = useRef<HTMLDivElement>();

  const handleClose = ({ target }) => {
    if (background.current === target) {
      close && close();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={background} onClick={handleClose} className="modal">
      <div {...rest} />
    </div>
  );
};

export default Modal;
