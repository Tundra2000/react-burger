import { dataPath, orderPath } from "./constants";

class Api {
  constructor(dataUrl, orderUrl) {
    this._dataUrl = dataUrl;
    this._orderUrl = orderUrl;
  }

  checkResponse(response) {
    return response.ok ? response.json() : Promise.reject("Error!!!");
  }

  getIngredients() {
    return fetch(this._dataUrl).then(this.checkResponse).catch(console.log);
  }

  postOrder(data) {
    return fetch(this._orderUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then(this.checkResponse)
      .catch(console.log);
  }
}

const api = new Api(dataPath, orderPath);
export default api;
