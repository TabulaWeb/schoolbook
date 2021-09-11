import {makeAutoObservable} from 'mobx';

class GlobalStore {
  save = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSaveBookmark(value) {
    this.save.push(value);
  }

  removeSaveBookmark(value) {
    this.save.splice(value, 1);
  }
}

export default new GlobalStore();
