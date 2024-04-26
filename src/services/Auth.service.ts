import axios from "axios";

// const port = "http://127.0.0.1:8000";

//jwt-token
export const jwtTokenHandler = async () => {
  try {
    const token = localStorage.getItem("jwtToken");

    console.log(token);

    const resp = await axios.get("/api/auth/verifyToken/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (resp.data.message) {
      return [true, resp.data.data];
    }
    return [false, {}];
  } catch (err) {
    console.log(err);
    return [false, {}];
  }
};

// login

export const loginHandler = async (data: any) => {
  try {
    const resp = await axios.post("/api/auth/login/", data);
    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

export const adminLoginHandler = async (data: any) => {
  try {
    const resp = await axios.post("/api/admin/login/", data);

    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

// get question
export const getQuestionHandler = async () => {
  try {
    const resp = await axios.get("/api/user/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    console.log(resp);

    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

export const startGameHandler = async () => {
  try {
    const resp = await axios.get("/api/user/start-game/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

export const submitGameHandler = async (data: any) => {
  try {
    const mapToObject = (map: any) => Object.fromEntries(map.entries());

    const resp = await axios.post("/api/user/submit/", mapToObject(data), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

export const createUserHandler = async (data: any) => {
  try {
    console.log("Bearer " + localStorage.getItem("jwtToken"));
    const resp = await axios.post("/api/admin/create/", data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

export const reportHandler = async () => {
  try {
    console.log("Bearer " + localStorage.getItem("jwtToken"));
    const resp = await axios.post(
      "/api/user/report/",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );

    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};

export const getAllHandler = async () => {
  try {
    console.log("Bearer " + localStorage.getItem("jwtToken"));
    const resp = await axios.get(
      "/api/admin",

      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      }
    );

    return resp.data;
  } catch (err) {
    if (err.response) return err.response.data;

    return false;
  }
};
