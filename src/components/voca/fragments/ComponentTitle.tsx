import React from "react";

interface propsType {
  title: String;
  subTitle: String;
}

const ComponentTitle = (data: propsType) => {
  const { title, subTitle } = data || null;
  return (
    <div className="box__component-title">
      <h2 className="text__h2">{title}</h2>
      <p className="text__sub">{subTitle}</p>
    </div>
  );
};

export default ComponentTitle;
