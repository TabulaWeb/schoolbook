import {makeAutoObservable} from 'mobx';

class UserStore {
  userToken = null;
  userPay = false;

  constructor() {
    makeAutoObservable(this);
  }

  checkUserPay(value) {
    this.userPay = value;
  }

  setUserToken(value) {
    this.userToken = value;
  }
}

export default new UserStore();
