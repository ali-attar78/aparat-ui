import request from "./request";

class ResendVarificationUserCodeApi {
  async ResendVarificationUserCode(data, endpoint) {
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

const create = () => new ResendVarificationUserCodeApi();

export default create;
