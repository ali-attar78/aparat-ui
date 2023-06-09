import request from "./request";

class UpdateSocialsChannelApi {
  async UpdateSocialsChannel(data, endpoint) {
    let result = null,error=null;

    try {
      const response = await request.put(endpoint, data);

      result = response.data;
    } catch (ex) {
      error=ex;
      console.log(ex);
    }

    return { result,error };
  }
}

const create = () => new UpdateSocialsChannelApi();

export default create;
