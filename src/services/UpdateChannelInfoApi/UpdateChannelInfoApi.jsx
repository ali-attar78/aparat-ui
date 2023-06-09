import request from "./request";

class UpdateChannelInfoApi {
  async UpdateChannelInfo(params, endpoint) {
    let result = null,error=null;

    try {
      const response = await request.put(endpoint, params);

      result = response.data;
    } catch (ex) {
      error=ex;
      console.log(ex);
    }

    return { result,error };
  }
}

const create = () => new UpdateChannelInfoApi();

export default create;
