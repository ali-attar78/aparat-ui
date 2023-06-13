
import request from "./request";



class GetUsersListApi {

  async GetUsersList(endpoint) {

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

const create = () => new GetUsersListApi();

export default create;
