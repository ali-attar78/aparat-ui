import request from "./request";

class VerifyRegisterUserApi {
  async VerifyRegisterUser(data, endpoint) {
    let result = null,
      error = null;

    try {
      const response = await request.post(endpoint, data);
      result = response.data;
    } catch (ex) {
      error = ex;
      console.log(ex);
    }

    return { result, error };
  }
}

const create = () => new VerifyRegisterUserApi();

export default create;
