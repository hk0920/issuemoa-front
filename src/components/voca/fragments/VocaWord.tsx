import React, { useState, useEffect, useCallback } from "react";
import ReactCardFlip from "react-card-flip";
import { useSpring, animated } from "react-spring";
import { Dialog } from "../../index";
import { useNavigate } from "react-router-dom";
import * as VocaApi from "../../../api/learning";
import * as AuthApi from "../../../api/auth";
import classNames from "classnames";

interface Voca {
  id: number;
  word: string;
  mean: string;
}

interface DialogState {
  title: string;
  context: string;
  buttonText: string;
}

const LIMIT = 30;

const VocaWord: React.FC = () => {
  const [voca, setVoca] = useState<Voca[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [totalCnt, setTotalCnt] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogState>({
    title: "확인",
    context: "",
    buttonText: "",
  });
  const [isSound, setIsSound] = useState(false);
  const navigate = useNavigate();

  const currentWord = voca[currentIndex] || { word: "", mean: "" };

  const fetchData = useCallback(async () => {
    try {
      const response = await VocaApi.getVocaList(offset, LIMIT);
      if (response) {
        setVoca(response.list);
        setTotalCnt(response.totalCnt);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [offset]);

  useEffect(() => {
    fetchData();
  }, []);

  const flipCard = () => setIsFlipped(!isFlipped);

  const showNextWord = (learnYn: string, direction: "prev" | "next" | "") => {
    if (!currentWord) return;

    VocaApi.save({ vocaId: currentWord.id, learnYn });

    let nextIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0) {
      setDialog({ ...dialog, context: "첫 단어입니다." });
      return;
    }

    if (nextIndex >= voca.length) {
      if (offset >= totalCnt) {
        setDialog({
          ...dialog,
          context: "마지막 단어입니다. 다음 업데이트를 기대해주세요!",
        });
      } else {
        setOffset(offset + LIMIT);
      }
      return;
    }

    if (isFlipped) setIsFlipped(!isFlipped);
    setIsSliding(true);

    setCurrentIndex(nextIndex);
  };

  const handleAuthCheck = async (learnYn: string) => {
    const isAuthenticated = await AuthApi.checkUserAuthentication();
    if (!isAuthenticated) {
      setDialog({
        context: "로그인 후 이용해 주세요!",
        buttonText: "로그인",
        title: "확인",
      });
      setModalOpen(true);
      return;
    }

    showNextWord(learnYn, "");
  };

  const speakWord = (text?: string) => {
    if (!window.speechSynthesis || !text) {
      alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }

    const speechMsg = new SpeechSynthesisUtterance(text);
    speechMsg.lang = "en-US";
    speechMsg.rate = 1.0;

    speechMsg.onend = () => {
      setIsSound(false);
    };

    setIsSound(true);
    setIsSliding(false);
    window.speechSynthesis.speak(speechMsg);
  };

  const Word: React.FC<{ children: React.ReactNode; isSliding?: boolean }> = ({
    children,
    isSliding,
  }) => {
    const slideInAnimation = useSpring({
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0%)" },
      reset: true,
    });
    return (
      <animated.div
        style={isSliding ? slideInAnimation : {}}
        className="box__word"
      >
        {children}
      </animated.div>
    );
  };

  return (
    <div className="box__component-word">
      <Dialog
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => navigate("/mypage")}
        {...dialog}
      />
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="box__card">
          <Word isSliding={isSliding}>
            {/* <button type="button" className="button__prev" onClick={() => showNextWord("N", "prev")} /> */}
            <span className="text__word">{currentWord.word}</span>
            <button
              type="button"
              className={classNames("button__listen", isSound && "active")}
              onClick={() => speakWord(currentWord.word)}
            />
          </Word>
          <button type="button" className="button__confirm" onClick={flipCard}>
            ✔️
          </button>
        </div>
        <div className="box__card">
          <Word isSliding={isSliding}>
            <span className="text__word">{currentWord.mean}</span>
          </Word>
          <button type="button" className="button__confirm" onClick={flipCard}>
            ✔️
          </button>
        </div>
      </ReactCardFlip>
      <div className="box__buttons">
        <button
          type="button"
          className="button__word button__after"
          onClick={() => handleAuthCheck("N")}
        >
          다음에 보기 ✍️
        </button>
        <button
          type="button"
          className="button__word button__next"
          onClick={() => handleAuthCheck("Y")}
        >
          알고 있어요 😊
        </button>
      </div>
    </div>
  );
};

export default VocaWord;
