import React from "react";
import Ripples from "react-ripples";
const Otbtn = ({ text, setTurn, sM, id, setSD, SD }) => {
  return (
    <Ripples
      className="Otbtn"
      onClick={() => {
        if (setTurn) {
          setTurn("tovar");
          setSD({
            ...SD,
            filial_id: id,
          });
        } else {
          setSD({
            ...SD,
            tovar_key: id,
          });
          sM(true);
        }
      }}
    >
      <div>{text}</div>
    </Ripples>
  );
};

export default Otbtn;
