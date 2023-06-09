import request from "./request";

class PostCommentApi {
  async PostComment(data, endpoint) {
    let result = null;
    let error = null;
    console.log(data);


    try {
      const response = await request.post(endpoint, data);
      result = response.data;
    } catch (ex) {
      error=ex;
      console.log(ex);
    }

    return { result , error};
  }
}

const create = () => new PostCommentApi();

export default create;
