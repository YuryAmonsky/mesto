export default class Api{
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  /*
  _checkServerResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }*/

  getUserInfo(){
    return fetch(this._baseUrl+'/users/me', {
      method: "GET",
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  
  setUserInfo(objUserInfo, popup){
    popup.setSubmitStatus('Сохранение...');
    return fetch(this._baseUrl+'/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(objUserInfo)
    })
      .then(res => {
        if (res.ok) {
          popup.setSubmitStatus('Сохранить');
          return res.json();
        }
        popup.setSubmitStatus('Сохранить');
        return Promise.reject(`Ошибка: ${res.status}`);
      });  
  }

  loadLocations(){
    return fetch(this._baseUrl+'/cards',{
      method: "GET",
      headers: this._headers
    }).then(res=>{
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}