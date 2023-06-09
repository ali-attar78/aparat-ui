
import request from "./request";



class GetVideoListApi {

  async getVideoList(endpoint) {

    let result = null;    

    
    try {
      const response = await request.get(endpoint);

      result = response.data;
      
    } catch (ex) {
        console.log(ex);
    }
    
    return { result };

  }
}

const create = () => new GetVideoListApi();

export default create;
