
import request from "./request";



class DeleteVideoItemApi {

  async deleteVideoItem(endpoint) {

    let result = null , error = false ;   

    
    try {
      const response = await request.delete(endpoint);

      result = response.data;
      
    } catch (ex) {
        console.log(ex);
        error = true ;
    }
    
    return { result ,error};

  }
}

const create = () => new DeleteVideoItemApi();

export default create;
