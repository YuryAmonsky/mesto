export default class Api{
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo(){
    return fetch(this.baseUrl+'/users/me ', {
      method: "GET",
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}