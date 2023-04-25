
import request from "../services/request";
import authData from "../config/auth";
import {setAuth} from "../utils/auth";



class AuthService {

  async Login(username, password, endpoint) {
    let result = null, error = null;    
    const data = {
      username: username,
      password: password,
      grant_type: authData.grantType,
      client_id: authData.client_id,
      client_secret: authData.client_secret,
    };

    try {
      const response = await request.post(endpoint, data);
      setAuth(response.data);
      result = response.data;
      
    } catch (ex) {
      if(ex.response && ex.response.status===400){
        console.log("ورود ناموفق");
        error = true;
      }
      else{
        console.log("هر خطایی");

      }
    }
    
    return { result, error };

  }
}

const create = () => new AuthService();

export default create;
