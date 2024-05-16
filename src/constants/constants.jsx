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
  GET_GRAPH: "Get Graph",
  RUN_ALGO: "Run Algorithm",
};

export const LOGIN_ALERTS = {
  GENERIC_ERROR: "Something went wrong. Please try again.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  USERNAME_REQUIRED: "Please input your username!",
  PASSWORD_REQUIRED: "Please input your password!",
  LOG_IN: "Log In",
  NO_ACCOUNT: "Don't Have an account?",
  REGISTER: "Register now!",
};

export const SIGNUP_ALERTS = {
  GENERIC_ERROR: "Something went wrong. Please try again.",
  MISSING_FIELDS: "Please fill all the fields.",
  EMAIL_REQUIRED: "Please input your email!",
  EMAIL_INVALID: "Please input a valid email!",
  NAME_REQUIRED: "Please input your name!",
  PASSWORD_REQUIRED: "Please input your password!",
  PASSWORD_CONFIRM_REQUIRED: "Please confirm your password!",
  CONFIRM_PASSWORD: "Confirm Password",
  PASSWORD_LENGTH: "Password must be at least 6 characters long.",
  PASSWORDS_DONT_MATCH: "Passwords do not match!",
  USER_EXISTS: "User already exists.",
  REGISTER: "Register",
  HAVE_ACCOUNT: "Already have an account?",
  LOGIN: "Log In!",

};

export const GRAPH_PREVIEW = {};

export const BACKEND_URL = "http://localhost:8000";
export const BACKEND_AUTH_URL = "http://localhost:8000/auth";
export const BACKEND_LOGIN_URL = "http://localhost:8000/auth/login";
export const BACKEND_REGISTER_URL = "http://localhost:8000/auth/register";
export const TEST_BACKEND_URL = "http://localhost:3000";
export const GRAPH_URL = "http://localhost:8000/graph";
