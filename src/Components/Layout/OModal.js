import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { Button, DatePicker, Spin } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";
import moment from "moment";
import FetchApi from "../FetchApi";
const OModal = ({
  visible,
  setV,
  setLoad,
  load,
  setSD,
  SD,
  setSerData,
  setTurn,
}) => {
  const [tip, setTip] = useState("");
  const handleOk = async () => {
    const data = {
      user_id: 5,
      filial_id: SD.filial_id,
      sorov_izox: `${SD.tovar_key}#${moment(SD.date1).format(
        "DD.MM.YYYY"
      )}#${moment(SD.date2).format("DD.MM.YYYY")}`,
    };
    setLoad(true);
    console.log(data);
    setTip("Маьлумотлар серверга юкланмоқда");
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("filial_id", data.filial_id);
    formData.append("sorov_izox", data.sorov_izox);
    const resp = await FetchApi("/in_savl.php", "POST", formData);

    if (resp.status === 200) {
      setTip("Маьлумотлар сервердан олинмоқда");
      const formData2 = new FormData();
      formData2.append("sorov_id", resp.data);

      const inter = setInterval(async () => {
        const resp2 = await FetchApi("/gt_javob2.php", "POST", formData2);
        if (resp2.status === 200) {
          if (resp2.data.length > 100) {
            setSerData(resp2.data);
            clearInterval(inter);
            setV(false);
            setTip("");
            setTurn("server");
            setLoad(false);
          }
        }
      }, 1000);
    }
  };

  const onChange = (string, key) => {
    if (key === "1") {
      setSD({
        ...SD,
        date1: string,
      });
    } else {
      setSD({
        ...SD,
        date2: string,
      });
    }
  };
  return (
    <Modal
      centered
      title="Остатка товара"
      style={{ top: 20 }}
      visible={visible}
      onCancel={() => {
        setV(false);
        setLoad(false);
      }}
      footer={[
        <Button
          disabled={load}
          danger
          type="primary"
          onClick={() => setV(false)}
        >
          Оркага
        </Button>,
        <Button disabled={load} type="primary" onClick={handleOk}>
          Кириш
        </Button>,
      ]}
    >
      <Spin spinning={load} tip={tip}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DatePicker
            onChange={(date, dateString) => onChange(dateString, "1")}
          ></DatePicker>
          &nbsp;
          <SwapRightOutlined style={{ color: "#aaa" }} />
          &nbsp;
          <DatePicker
            onChange={(date, dateString) => onChange(dateString, "2")}
          ></DatePicker>
        </div>
      </Spin>
    </Modal>
  );
};

export default OModal;
