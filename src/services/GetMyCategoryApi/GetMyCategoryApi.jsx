
import request from "./request";



class GetMyCategoryApi {

  async GetMyCategory(endpoint) {

    let result = null,error=null;    

    
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

const create = () => new GetMyCategoryApi();

export default create;
