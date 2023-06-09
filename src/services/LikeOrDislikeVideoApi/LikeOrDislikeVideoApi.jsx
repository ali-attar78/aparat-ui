
import request from "./request";



class LikeOrDislikeVideoApi  {

  async LikeOrDislikeVideo (endpoint) {

    let result = null;    
    let error = null;    


    
    try {
      const response = await request.post(endpoint);

      result = response.data;
      
    } catch (ex) {
      error=ex;
        console.log(ex);
    }
    
    return { result,error };

  }
}

const create = () => new LikeOrDislikeVideoApi ();

export default create;
