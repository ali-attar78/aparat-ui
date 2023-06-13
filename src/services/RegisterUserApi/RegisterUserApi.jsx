import request from "./request";

class RegisterUserApi {
  async RegisterUser(data, endpoint) {
    let result = null;
    let error = null;
    console.log(data);


    try {
      const response = await request.post(endpoint, data);
      result = response.data;
    } catch (ex) {
      error=ex;
      console.log(ex);
    }

    return { result , error};
  }
}

const create = () => new RegisterUserApi();

export default create;
