import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  context?: string;
  buttonText?: string;
}

const Dialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  context,
  buttonText,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{context}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
        {buttonText && (
          <Button variant="primary" onClick={onConfirm}>
            {buttonText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Dialog;
