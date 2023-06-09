
import request from "./request";



class UploadVideoBannerService {

  async uploadVideoBanner(file ,endpoint) {

    let result = null, error = null;    

    const bannerData = new FormData();
    bannerData.append("banner", file);   
     
    try {
      const response = await request.post(endpoint, bannerData);
      
      result = response.data;
      
    } catch (ex) {
      
        error = ex;
      }
    
    
    
    return { result, error };

  }
}

const create = () => new UploadVideoBannerService();

export default create;
