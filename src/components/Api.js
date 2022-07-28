export default class Api{
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;    
  }
  
  _checkServerResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(){
    return fetch(this._baseUrl+'/users/me', {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkServerResponse);
  }
  
  setUserInfo(objUserInfo, popup){
    popup.setSubmitStatus('Сохранение...');
    return fetch(this._baseUrl + '/users/me', {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(objUserInfo)
    })
      .then(this._checkServerResponse);  
  }

  loadLocations(){
    return fetch(this._baseUrl + '/cards',{
      method: "GET",
      headers: this._headers
    }).then(this._checkServerResponse);
  }

  addNewLocation(objNewCardData, popup){
    popup.setSubmitStatus('Добавление...');
    return fetch(this._baseUrl + '/cards',{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(objNewCardData)
    }).then(this._checkServerResponse);
  }
  deleteLocation(card, popup){
    popup.setSubmitStatus('Удаление...');
    return fetch(this._baseUrl +'/cards/' + card.getCardId(),{
      method: "DELETE",
      headers: this._headers     
    }).then(res => {
      if(res.ok){
        console.log(res);
        return Promise.resolve(card);        
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}