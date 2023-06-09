import request from "./request";

class EditCategoryApi {
  async EditCategory(category, endpoint) {
    let result = null,error=null;

    const data = {
      title: category,
      icon: null,
      banner_id: null,
    };

    try {
      const response = await request.put(endpoint, data);

      result = response.data;
    } catch (ex) {
      error=ex;
      console.log(ex);
    }

    return { result,error };
  }
}

const create = () => new EditCategoryApi();

export default create;
