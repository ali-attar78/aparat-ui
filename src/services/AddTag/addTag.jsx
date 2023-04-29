
import request from "./request";



class addTagService {

  async addTag(tag ,endpoint) {

    let result = null, error = null;    

    const data = {
      title: tag,
    };
    
    try {
      const response = await request.post(endpoint, data);
      // setAuth(response.data);

      result = response.data;
      
    } catch (ex) {
      // if(ex.response && ex.response.status===401){
      // }
      // else{
       console.log(ex);

      // }
    }
    
    return { result, error };

  }
}

const create = () => new addTagService();

export default create;
