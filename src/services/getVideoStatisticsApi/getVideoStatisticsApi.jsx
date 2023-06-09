import request from "./request";

class getVideoStatisticsApi {
  async getVideoStatistics(endpoint,days) {
    let result = null;
    let error = null;


    try {
      if(days){
        const response = await request.get(`${endpoint}/?last_n_date=${days}`);
        result = response.data;
      }
      else{
        const response = await request.get(endpoint);
        result = response.data;
      }
    } catch (ex) {
      error = true;
      console.log(ex);
    }

    return { result, error };
  }
}

const create = () => new getVideoStatisticsApi();

export default create;
