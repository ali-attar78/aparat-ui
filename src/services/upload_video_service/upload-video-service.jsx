
import request from "./request";



class UploadVideoService {

  async Upload(file ,endpoint) {

    let result = null, error = null;    

    const videoData = new FormData();
    videoData.append("video", file);
    
    try {
      const response = await request.post(endpoint, videoData);
      // setAuth(response.data);

      result = response.data;
      
    } catch (ex) {
      if(ex.response && ex.response.status===401){
        error = true;
      }
      else{
        console.log("هر خطایی");

      }
    }
    
    return { result, error };

  }
}

const create = () => new UploadVideoService();

export default create;
