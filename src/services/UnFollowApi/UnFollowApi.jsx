
import request from "./request";



class UnFollowApi  {

  async doUnFollow(endpoint) {

    let result = null;    
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

const create = () => new UnFollowApi ();

export default create;
