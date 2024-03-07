const ChangeBg = () => {
  const changeColor = () => {
    document.body.style.background = "red";
  };

  return (
    <>
      <div id="color">
        <button onClick={() => changeColor()}>Change Baground Color</button>
      </div>
    </>
  );
};
export default ChangeBg;
