const api = {
  hostname: "https://handsomelai.shop/api",
  async getProducts(category, paging) {
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}`
    );
    return await response.json();
  },
  async getShopStocks(id) {
    const response = await fetch(`${this.hostname}/products/shops?id=${id}`);
    return await response.json();
  },
  async getCampaigns() {
    const response = await fetch(`${this.hostname}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword, paging) {
    const response = await fetch(
      `${this.hostname}/products/search?keyword=${keyword}&paging=${paging}`
    );
    return await response.json();
  },
  async getProduct(id) {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(`${this.hostname}/products/details?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  },
  async checkout(data, jwtToken) {
    const response = await fetch(`${this.hostname}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async signin(data) {
    const response = await fetch(`${this.hostname}/user/signin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    return await response.json();
  },
  async getProfile(jwtToken) {
    const response = await fetch(`${this.hostname}/user/profile`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    return await response.json();
  },

  async getHistory() {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(`${this.hostname}/user/browsingHistory`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  },
  async getChatHistory(jwtToken) {
    const userJwtToken = localStorage.getItem("jwtToken") || jwtToken;
    const response = await fetch(`${this.hostname}/user/chat/history`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ jwtToken: userJwtToken }),
    });
    return await response.json();
  },
  async getStock(id) {
    const response = await fetch(
      `https://handsomelai.shop/api/products/shops?id=${id}`
    );

    return await response.json();
  },
};

export default api;
