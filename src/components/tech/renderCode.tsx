import React from "react";

const renderCode = (content: string) => {
  const imageUrlMatches = content.match(
    /https:\/\/img1\.daumcdn\.net.*?\.png/g
  );

  if (imageUrlMatches && imageUrlMatches.length > 0) {
    const images = imageUrlMatches.map((imageUrl, index) => (
      <img
        key={index}
        src={imageUrl}
        alt={`Image ${index}`}
        onClick={() => window.open(imageUrl)}
      />
    ));

    const lastImageIndex = imageUrlMatches.length - 1;
    const textWithoutImages = content
      .split(imageUrlMatches[lastImageIndex])
      .join("");

    return (
      <div>
        {images}
        <p
          dangerouslySetInnerHTML={{
            __html: textWithoutImages.replace(/\n/g, "<br>"),
          }}
        />
      </div>
    );
  }

  if (content.includes("```")) {
    const contentArray = content.split("``");
    const context = contentArray.map((item, idx) => {
      let result =
        item
          .replace("`", "")
          .replaceAll(/\n/g, "<br/>")
          .replaceAll("  ", "&ensp;")
          .replace("java<br/>", "<code class='box__code'>") + "</code>";

      if (result.includes("// ")) {
        const resultText = result
          .substring(result.indexOf("// "))
          .split("<br/>");
        resultText.map((text, q) => {
          if (!text.includes("// ")) return false;
          let commentText = text.substring(
            text.indexOf("// ", text.indexOf("<br/>"))
          );
          result = result.replace(
            commentText,
            "<span class='text__comment'>" + commentText + "</span>"
          );
        });
      }

      return result;
    });

    return (
      <>
        {context.map((item, idx) => {
          return (
            <div
              key={idx}
              dangerouslySetInnerHTML={{
                __html: item,
              }}
            ></div>
          );
        })}
      </>
    );
  } else {
    return (
      <p
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
      />
    );
  }
};

export default renderCode;
