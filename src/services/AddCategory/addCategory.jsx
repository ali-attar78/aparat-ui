import request from "./request";

class addCategoryService {
  async addCategory(category, endpoint) {
    let result = null,error=null;

    const data = {
      title: category,
      icon: null,
      banner_id: null,
    };

    try {
      const response = await request.post(endpoint, data);
      // setAuth(response.data);

      result = response.data;
    } catch (ex) {
      error=ex;
      console.log(ex);
    }

    return { result,error };
  }
}

const create = () => new addCategoryService();

export default create;
