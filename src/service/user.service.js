import apiClient from "../config/apiClient";

class UserService {
  async postUserPhotos(photos) {
    try {
      const response = await apiClient.post("/user/img/upload", { photos });

      return response.data;
    } catch (error) {
      console.log("error - ", error);
      throw new Error("Image Upload failed try again after some time");
    }
  }

  async getAllPhotos(userId) {
    try {
      let response;
      if (userId) {
        response = await apiClient.get(`/user/get/img?userId=${userId}`);
      } else {
        response = await apiClient.get("/user/get/img");
      }
      return response.data;
    } catch (error) {
      throw new Error("Image fetch error", error);
    }
  }

  async deletePhotoById(photoId) {
    try {
      const response = await apiClient.delete(`/user/img/delete/${photoId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error while deleting photo", error);
    }
  }

  async followUnfollowHandler(status, userId) {
    try {
      const response = await apiClient.post(
        `/request/send/${status}/${userId}`,
        {},
      );

      return response.data;
    } catch (error) {
      throw new Error("error while sending request", error);
    }
  }
}

export default new UserService();
