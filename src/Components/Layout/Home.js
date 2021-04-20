import { ArrowLeftOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import FetchApi from "../FetchApi";
import OModal from "./OModal";
import Otbtn from "./Otbtn";
import ReactHtmlParser from "react-html-parser";

const Home = ({ setLogin }) => {
  const [turn, setTurn] = useState("home");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [royxat, setRoyxat] = useState({
    filial: [],
    otchot: [],
  });
  const [sendData, setSendData] = useState({
    filial_id: null,
    tovar_key: null,
    date1: null,
    date2: null,
  });

  const [serData, setSerData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const resp = await FetchApi("/get_fillial.php", "GET");

    const otres = await FetchApi("/get_otchot_royxat.php", "GET");
    if (otres.status === 200) {
      setRoyxat({
        filial: resp.data,
        otchot: otres.data,
      });
    }
    setLoading(false);
  };

  const Back = () => {
    if (turn === "home") {
      // setLogin(false);
      window.close();
    } else if (turn === "tovar") {
      setTurn("home");
    } else if (turn === "server") {
      setTurn("tovar");
    }

    setSendData({
      filial_id: null,
      tovar_key: null,
      date1: null,
      date2: null,
    });
  };
  console.log(serData);
  return (
    <>
      <div className="navBar">
        <ArrowLeftOutlined onClick={Back} />
      </div>
      <div className="home">
        <Spin spinning={loading}>
          {turn === "home" ? (
            <>
              {royxat.filial.map(f => (
                <Otbtn
                  key={f.key}
                  id={f.key}
                  setSD={setSendData}
                  SD={sendData}
                  setTurn={setTurn}
                  text={f.title}
                ></Otbtn>
              ))}
            </>
          ) : null}

          {turn === "tovar" ? (
            <>
              {royxat.otchot.map(d => (
                <Otbtn
                  key={d.key}
                  id={d.key}
                  setSD={setSendData}
                  SD={sendData}
                  text={d.otchot_nomi}
                  turn="tovar"
                  sM={setVisible}
                ></Otbtn>
              ))}
            </>
          ) : null}

          {turn == "server" ? (
            <>
              <div
                style={{
                  maxWidth: "475px",
                  height: "100vh",
                  overflow: "auto",
                }}
              >
                {ReactHtmlParser(serData)}
              </div>
            </>
          ) : null}

          <OModal
            load={loading}
            setLoad={setLoading}
            setV={setVisible}
            setSerData={setSerData}
            setSD={setSendData}
            SD={sendData}
            setTurn={setTurn}
            visible={visible}
          ></OModal>
        </Spin>
      </div>
    </>
  );
};

export default Home;
