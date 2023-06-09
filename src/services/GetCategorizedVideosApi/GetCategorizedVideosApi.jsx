
import request from "./request";



class GetCategorizedVideosApi {

  async GetCategorizedVideos(endpoint) {

    let result = null ;
    let error = null; 

    
    try {
      const response = await request.get(endpoint);

      result = response.data;
      
    } catch (ex) {
      error=ex;
        console.log(ex);
    }
    
    return { result,error };

  }
}

const create = () => new GetCategorizedVideosApi();

export default create;
