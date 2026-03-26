import apiClient from "../config/apiClient";

class PaymentService {
  async verifyUserPremium() {
    try {
      const response = await apiClient.get("/shop/premium/verify");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async createOrder(membershipType) {
    try {
      const response = await apiClient.post("/shop/payment/create", {
        membershipType,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PaymentService();
