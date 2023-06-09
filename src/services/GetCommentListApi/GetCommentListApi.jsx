
import request from "./request";



class GetCommentListApi  {

  async GetCommentList (endpoint) {

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

const create = () => new GetCommentListApi ();

export default create;
