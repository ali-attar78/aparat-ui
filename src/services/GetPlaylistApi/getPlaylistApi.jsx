
import request from "./request";



class getPlaylistApi {

  async getPlaylist(endpoint) {

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

const create = () => new getPlaylistApi();

export default create;
