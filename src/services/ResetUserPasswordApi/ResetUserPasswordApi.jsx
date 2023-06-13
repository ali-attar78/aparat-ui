
import request from "./request";



class ResetUserPasswordApi {

  async ResetUserPassword(endpoint) {

    let result = null,error=null;    

    
    try {
      const response = await request.put(endpoint);
      result = response.data;
      
    } catch (ex) {
      error=ex;
        console.log(ex);
    }
    
    return { result,error };

  }

  
}

const create = () => new ResetUserPasswordApi();

export default create;
