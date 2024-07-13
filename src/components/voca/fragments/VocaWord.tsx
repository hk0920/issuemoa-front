import ReactCardFlip from "react-card-flip";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Dialog } from "../../index";
import { useNavigate } from "react-router-dom";
import * as VocaApi from "../../../api/learning";
import * as AuthApi from "../../../api/auth";

interface Voca {
  id: number;
  word: string;
  mean: string;
}

const VocaWord = () => {
  const [voca, setVoca] = useState<Voca[]>([]);
  const [vocaId, setVocaId] = useState<number>();
  const [word, setWord] = useState<string>();
  const [mean, setMean] = useState<string>();
  const [offset, setOffset] = useState<number>(0);
  const [paramOffset, setParamOffset] = useState<number>(0);
  const [totalCnt, setTotalCnt] = useState<number>();
  const [currentIndex, setcurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("확인");
  const [dialogContext, setDialogContext] = useState<string>("");
  const [dialogButtonText, setDialogButtonText] = useState<string>("");
  const navigate = useNavigate();
  const limit = 30;

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmModal = () => {
    setModalOpen(false);
    navigate("/mypage");
  };

  // 뒤집기 모션
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    setIsSliding(false);
  };

  // API - 단어 목록 가져오기
  const fetchData = async () => {
    try {
      setcurrentIndex(0);
      const response = await VocaApi.getVocaList(paramOffset, limit);
      if (response) {
        setVoca(response.list);
        setOffset(response.offset);
        setTotalCnt(response.totalCnt);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 다음 단어 보여주기
  const nextWord = (afterView: String, direction: String): void => {
    let nextIndex = 0;

    if (afterView) {
      const learnData = {
        vocaId: vocaId,
        learnYn: afterView === "Y" ? "N" : "Y",
      };

      // 학습진도 등록
      VocaApi.save(learnData);

      if (direction === "prev") {
        if (currentIndex === 0) {
          setDialogContext("첫 단어 입니다.");
          return;
        }
        setcurrentIndex(currentIndex - 1);
        nextIndex = currentIndex - 1;
      } else {
        setcurrentIndex(currentIndex + 1);
        nextIndex = currentIndex + 1;
      }
    }

    if (voca.length !== 0 && voca.length <= nextIndex) {
      if (offset === totalCnt) {
        setDialogContext("마지막 단어입니다. 다음 업데이트를 기대해주세요!");
        setIsSliding(false);
      } else {
        setParamOffset(paramOffset + limit);
      }

      return;
    }

    setWord("");
    setMean("");

    if (isFlipped) {
      setIsFlipped(false);
    }

    setIsSliding(true);

    // 슬라이드 후 단어 변경
    setTimeout(() => {
      setVocaId(voca?.[nextIndex]?.id);
      setWord(voca?.[nextIndex]?.word);
      setMean(voca?.[nextIndex]?.mean);
      setIsSliding(false);
    }, 200);
  };

  const handlePrevImageClick = () => {
    nextWord("Y", "prev");
  };

  const handleButton = async (afterView: string) => {
    const isAuthenticated = await AuthApi.checkUserAuthentication();

    if (!isAuthenticated) {
      setDialogContext("로그인 후 이용해 주세요!");
      setDialogButtonText("로그인");
      handleOpenModal();
      return;
    }

    if (!isButtonDisabled) {
      // 버튼 비활성화 상태로 변경
      setButtonDisabled(true);

      // 일정 시간 후에 버튼을 다시 활성화
      setTimeout(() => {
        nextWord(afterView, "");
        setButtonDisabled(false);
      }, 130);
    }
  };

  const handleAfterWordClick = () => {
    handleButton("Y");
  };

  const handleNextWordClick = () => {
    handleButton("N");
  };

  const speakWord = (text?: string) => {
    if (
      typeof SpeechSynthesisUtterance === "undefined" ||
      typeof window.speechSynthesis === "undefined"
    ) {
      alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }

    if (text !== undefined) {
      window.speechSynthesis.cancel();

      const speechMsg = new SpeechSynthesisUtterance();
      speechMsg.rate = 1;
      speechMsg.pitch = 1;
      speechMsg.lang = "en-US";
      speechMsg.text = text;

      window.speechSynthesis.speak(speechMsg);
    }
  };

  const Word = ({
    children,
    isSliding,
  }: {
    children: React.ReactNode;
    isSliding?: boolean;
  }) => {
    const slideInAnimation = useSpring({
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0%)" },
      reset: true,
    });

    return (
      <animated.div style={isSliding ? slideInAnimation : {}}>
        <div className="box__word">
          <button
            type="button"
            className="button__prev"
            onClick={handlePrevImageClick}
          ></button>
          <span className="text__word">{children}</span>
          <button
            type="button"
            className="button__listen"
            onClick={() => speakWord(word)}
            style={{ display: isFlipped ? "none" : "block" }}
          ></button>
        </div>
      </animated.div>
    );
  };

  useEffect(() => {
    fetchData();
  }, [paramOffset]);

  useEffect(() => {
    nextWord("", "");
  }, [voca]);

  return (
    <div className="box__component-word">
      <Dialog
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
        title={dialogTitle}
        context={dialogContext}
        buttonText={dialogButtonText}
      />
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="box__card">
          <Word isSliding={isSliding}>{word}</Word>
          <button type="button" className="button__confirm" onClick={flipCard}>
            ✔️
          </button>
        </div>
        <div className="box__card">
          <Word isSliding={isSliding}>{mean}</Word>
          <button type="button" className="button__confirm" onClick={flipCard}>
            ✔️
          </button>
        </div>
      </ReactCardFlip>
      <div className="box__buttons">
        <button
          type="button"
          className="button__word button__after"
          onClick={handleAfterWordClick}
        >
          다음에 보기 ✍️
        </button>
        <button
          type="button"
          className="button__word button__next"
          onClick={handleNextWordClick}
        >
          알고 있어요 😊
        </button>
      </div>
    </div>
  );
};

export default VocaWord;
