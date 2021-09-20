import {makeAutoObservable} from 'mobx';

class UserStore {
  userToken = null;
  userPay = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUserToken(value) {
    this.userToken = value;
  }

  setUserPay(value) {
    this.userPay = value;
  }
}

export default new UserStore();
