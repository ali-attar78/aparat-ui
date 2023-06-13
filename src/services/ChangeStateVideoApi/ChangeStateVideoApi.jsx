import request from "./request";

class ChangeStateVideoApi {
  async ChangeStateVideo(data,endpoint) {

    let result=null,error=null;
    
    const state={
      'state' : data
    }

    try {
      const response = await request.put(endpoint,state);
      result = response.data;
    } catch (ex) {
      error = ex;
      console.log(ex);
    }

    return { result, error };
  }
}

const create = () => new ChangeStateVideoApi();

export default create;
