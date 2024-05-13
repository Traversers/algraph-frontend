export const CREATE_GRAPH_ERRORS = {
  NODE_EXISTS: "Node already exists.",
  EDGE_EXISTS: "Edge already exists.",
  NODES_LENGTH: "Can't add edge. There must be at least two nodes.",
  NO_NODES: "There are no nodes to delete.",
  NO_EDGES: "There are no edges to delete.",
  SELF_LOOP: "Can't add self loop.",
  NO_NODE_SELECTED: "Please select a node.",
  NO_EDGE_SELECTED: "Please select an edge.",
};

export const CREATE_GRAPH_BUTTONS_TEXTS = {
  ADD_NODE: "Add Node",
  DELETE_NODE: "Delete Node",
  DELETE_EDGE: "Delete Edge",
  CLEAR_ALL: "Clear All",
  CREATE_GRAPH: "Create Graph",
};

export const GRAPH_PREVIEW = {};

export const BACKEND_URL = "http://localhost:8000";
export const BACKEND_AUTH_URL = "http://localhost:8000/auth";
export const BACKEND_LOGIN_URL = "http://localhost:8000/auth/login";
export const BACKEND_REGISTER_URL = "http://localhost:8000/auth/register";
export const TEST_BACKEND_URL = "http://localhost:3000";
export const GRAPH_URL = "http://localhost:8000/graph";
