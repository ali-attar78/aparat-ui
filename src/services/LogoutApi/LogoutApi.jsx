
import request from "./request";



class LogoutApi {

  async Logout(endpoint) {

    let result = null,error=null;    

    
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

const create = () => new LogoutApi();

export default create;
