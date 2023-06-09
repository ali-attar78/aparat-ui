import request from "./request";

class addPlaylistService {
  async addPlaylist(playllist, endpoint) {
    let result = null;

    const data = {
      title: playllist,
    };

    try {
      const response = await request.post(endpoint, data);

      result = response.data;
    } catch (ex) {
      console.log(ex);
    }

    return { result };
  }
}

const create = () => new addPlaylistService();

export default create;
