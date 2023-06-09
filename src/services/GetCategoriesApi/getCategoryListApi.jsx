
import request from "./request";



class getCategoryListApi {

  async getCategory(endpoint) {

    let result = null;    

    
    try {
      const response = await request.get(endpoint);
      // setAuth(response.data);

      result = response.data;
      
    } catch (ex) {
        console.log(ex);
    }
    
    return { result };

  }
}

const create = () => new getCategoryListApi();

export default create;
