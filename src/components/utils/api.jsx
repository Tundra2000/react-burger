// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // прокидываем ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // нпрокидываем ошибку наверх, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// url для запроса храним в urls.jsx, options - параметры запроса (PUT, POST, ... )
export const request = (url, options) => { 
  return fetch(url, options)
    .then(checkResponse)
    .then(checkSuccess);
};