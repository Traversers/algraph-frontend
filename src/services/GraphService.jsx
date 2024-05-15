import { GRAPH_URL } from "../constants/constants";
import axios from "axios";
const createGraph = async (graphData, user) => {
  try {
    const response = await axios({
      method: "post",
      url: `${GRAPH_URL}/publish`,
      data: graphData,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getGraph = async (id) => {
  try {
    const response = await axios({
      method: "post",
      url: `${GRAPH_URL}/getGraph`,
      data: { id },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const setGraph = async (id, graphData) => {
  try {
    const response = await axios({
      method: "put",
      url: `${GRAPH_URL}/update`,
      data: { id, graphData },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteGraph = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${GRAPH_URL}/delete`,
      data: { id },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const getPreviewGraph = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${GRAPH_URL}/all`,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default {
  createGraph,
  getGraph,
  setGraph,
  deleteGraph,
  getPreviewGraph,
};
