import React from "react";

function TextWelcome() {
  var [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const list = document.querySelectorAll(".text");

    const time = setInterval((e) => {
      list.forEach((e) => {
        e.classList.remove("change-properties");
      });

      list[index].classList.add("change-properties");
      setIndex(index++);

      if (index === list.length) {
        index = 0;
      }
    }, 200);

    return () => {
      clearInterval(time);
    };
  }, []);
  return (
    <div>
      <span className="text">W</span>
      <span className="text">e</span>
      <span className="text">l</span>
      <span className="text">c</span>
      <span className="text">o</span>
      <span className="text">m</span>
      <span className="text">e</span>
      <span className="text">!</span>
    </div>
  );
}

export default TextWelcome;
