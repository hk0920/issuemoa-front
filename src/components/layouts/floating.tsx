import React from "react";

const Floating = () => {
  const topEvent = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="box__floating">
      <button type="button" className="button__top" onClick={() => topEvent()}>
        <span className="text">Top</span>
        <span className="for-a11y">상단으로 이동</span>
      </button>
    </div>
  );
};

export default Floating;
