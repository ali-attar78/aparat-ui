import request from "./request";

class addVideoService {
  async addVideo(data, endpoint) {
    let result = null;
    console.log(data);


    try {
      const response = await request.post(endpoint, data);
      // setAuth(response.data);

      result = response.data;
    } catch (ex) {
      console.log(ex);
    }

    return { result };
  }
}

const create = () => new addVideoService();

export default create;
