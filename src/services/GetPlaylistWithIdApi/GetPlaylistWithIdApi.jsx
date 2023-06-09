
import request from "./request";



class GetPlaylistWithIdApi {

  async GetPlaylistWithId(endpoint) {

    let result = null;    

    
    try {
      const response = await request.get(endpoint);

      result = response.data;
      
    } catch (ex) {
        console.log(ex);
    }
    
    return { result };

  }
}

const create = () => new GetPlaylistWithIdApi();

export default create;
