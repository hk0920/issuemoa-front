import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { VideoPlayer } from '../index'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  context: string;
}

const Player: React.FC<ModalProps> = ({ isOpen, onClose, title, context }) => {
  return (
    <Modal show={isOpen} onHide={onClose} 
      aria-labelledby="contained-modal-title-vcenter" 
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <VideoPlayer videoId={context} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Player;
