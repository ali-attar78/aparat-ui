
import request from "./request";



class UploadVideoService {

  async Upload(file ,endpoint, onUploadProgress) {

    let result = null, error = null;    

    const videoData = new FormData();
    videoData.append("video", file);   
     
    try {
      const response = await request.post(endpoint, videoData, {
        onUploadProgress: onUploadProgress
      });
      
      result = response.data;
      
    } catch (ex) {
      
        error = true;
      }
    
    
    
    return { result, error };

  }
}

const create = () => new UploadVideoService();

export default create;
