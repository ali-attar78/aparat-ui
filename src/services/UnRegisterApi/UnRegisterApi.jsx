
import request from "./request";



class UnRegisterApi {

  async UnRegister(endpoint) {

    let result = null,error=null;    

    
    try {
      const response = await request.delete(endpoint);
      result = response.data;
      
    } catch (ex) {
      error=ex;
        console.log(ex);
    }
    
    return { result,error };

  }
}

const create = () => new UnRegisterApi();

export default create;
