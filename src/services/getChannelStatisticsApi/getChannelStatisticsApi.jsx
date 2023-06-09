import request from "./request";

class getChannelStatisticsApi {
  async getChannelStatistics(range,endpoint) {
    let result = null,
      error = null;

    try {
      if(range){
        const response = await request.get(`${endpoint}/?last_n_date=${range}`);
        result = response.data;
      }
      else{
        const response = await request.get(endpoint);
        result = response.data;
      }
    } catch (ex) {
      error = ex;
      console.log(ex);
    }

    return { result, error };
  }
}

const create = () => new getChannelStatisticsApi();

export default create;
