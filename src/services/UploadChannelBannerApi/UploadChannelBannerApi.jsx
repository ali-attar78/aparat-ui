
import request from "./request";



class UploadChannelBannerApi {

  async UploadChannelBanner(file ,endpoint, onUploadProgress) {

    let result = null, error = null;    

    const bannerData = new FormData();
    bannerData.append("banner", file);   
     
    try {
      const response = await request.post(endpoint, bannerData);
      
      result = response.data;
      
    } catch (ex) {
      
        error = true;
      }
    
    
    
    return { result, error };

  }
}

const create = () => new UploadChannelBannerApi();

export default create;
