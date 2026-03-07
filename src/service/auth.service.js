import apiClient from "../config/apiClient";

class AuthService {
  async getImageKitToken() {
    try {
      const response = await apiClient.get("/imagekit/auth");

      return response.data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  }
}

export default new AuthService();
