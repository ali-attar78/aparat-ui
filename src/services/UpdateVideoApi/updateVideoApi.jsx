import request from "./request";

class updateVideoApi {
  async updateVideo(data, endpoint) {
    let result = null;
    let error = null;
    console.log(data);


    try {
      const response = await request.put(endpoint, data);
      // setAuth(response.data);

      result = response.data;
    } catch (ex) {
      error=ex;
      console.log(ex);
    }

    return { result,error };
  }
}

const create = () => new updateVideoApi();

export default create;
