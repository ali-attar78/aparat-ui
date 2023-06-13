
import request from "./request";



class UpdateUserApi {

  async UpdateUser(data,endpoint) {

    let result = null,error=null;    

    
    try {
      const response = await request.put(endpoint,data);
      result = response.data;
      
    } catch (ex) {
      error=ex;
        console.log(ex);
    }
    
    return { result,error };

  }

  
}

const create = () => new UpdateUserApi();

export default create;
