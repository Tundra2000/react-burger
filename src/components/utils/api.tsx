import { ICheckSuccess } from "./types";

// создаем функцию проверки ответа на `ok`
const checkResponse = (res: Response) => {
  if (res.ok || res.status === 401 || res.status === 403) {
    return res.json();
  }
  // прокидываем ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = <T extends ICheckSuccess>(res: T): Promise<T> => {
  if (res && res.success) {
    return Promise.resolve(res);
  }
  // нпрокидываем ошибку наверх, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// url для запроса храним в urls.jsx, options - параметры запроса (PUT, POST, ... )
export const request = (url:string, options: any) => { 
  return fetch(url, options)
    .then(checkResponse)
    .then(checkSuccess);
};