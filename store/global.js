import {makeAutoObservable} from 'mobx';

class GlobalStore {
  save = [];
  showIntro = true;

  constructor() {
    makeAutoObservable(this);
  }

  setSaveBookmark(value) {
    this.save.push(value);
    console.log(this.save);
  }

  removeSaveBookmark(value) {
    this.save.splice(value, 1);
  }

  setSgowIntro(value) {
    this.showIntro = value;
    console.log(this.showIntro);
  }
}

export default new GlobalStore();

export let save = [];

export let introScreen = {
  showIntro: true,
};
