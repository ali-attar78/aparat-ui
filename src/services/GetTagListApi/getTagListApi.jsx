
import request from "./request";



class getTagsListApi {

  async GetTags(endpoint) {

    let result = null;    

    
    try {
      const response = await request.get(endpoint);
      // setAuth(response.data);

      result = response.data;
      
    } catch (ex) {
      // if(ex.response && ex.response.status===401){
        console.log(ex);

      // }
      // else{
      //   console.log("هر خطایی");

      // }
    }
    
    return { result };

  }
}

const create = () => new getTagsListApi();

export default create;
