import { useState } from "react";
import { Container } from "react-bootstrap";
import { Dialog } from "../index";
import { useNavigate } from "react-router-dom";
import VocaWord from "./fragments/VocaWord";
import ComponentTitle from "../common/ComponentTitle";

function Quiz() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dialogTitle = "확인";
  const dialogContext = "";
  const dialogButtonText = "";

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmModal = () => {
    setModalOpen(false);
    navigate("/mypage");
  };

  return (
    <Container className="page__sub page__voca">
      <Dialog
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        title={dialogTitle}
        context={dialogContext}
        buttonText={dialogButtonText}
      />
      <div className="box__inner">
        <ComponentTitle
          title={"영어단어"}
          subTitle={"영어단어를 쉽고 간단하게 배워봅시다"}
        />
        <VocaWord />
      </div>
    </Container>
  );
}

export default Quiz;
