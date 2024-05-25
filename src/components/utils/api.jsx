import { dataPath } from "./constants";

class Api {
  constructor(dataUrl) {
    this._dataUrl = dataUrl;
  }

  checkResponse(response) {
    return response.ok ? 
            response.json() : 
            Promise.reject("Error!!!");
    
  }

  getIngredients() {   
    return fetch(this._dataUrl)
        .then(this.checkResponse)
        .catch(console.log);
  }
}

const api = new Api(dataPath);
export default api;