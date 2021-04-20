import { message } from "antd";
import { BaseUrl } from "../BaseUrl";
import axios from "axios";
// url, method, data , id

const FetchApi = async (url, method, data = null, id = null) => {
  const uri = id ? url + "/" + id : url;
  try {
    return await axios({
      method: method,
      url: BaseUrl + uri,
      data: data,
    });
  } catch (error) {
    message.error("aloqa yo'q");
  }
};

export default FetchApi;
