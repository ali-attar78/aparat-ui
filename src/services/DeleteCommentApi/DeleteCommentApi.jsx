
import request from "./request";



class DeleteCommentApi {

  async DeleteComment(endpoint) {

    let result = null , error = false ;   

    
    try {
      const response = await request.delete(endpoint);

      result = response.data;
      
    } catch (ex) {
        console.log(ex);
        error = ex ;
    }
    
    return { result ,error};

  }
}

const create = () => new DeleteCommentApi();

export default create;
