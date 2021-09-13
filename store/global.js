import {makeAutoObservable} from 'mobx';

class GlobalStore {
  bookData = [];

  bookMarkSave = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSaveBookmark(value) {
    this.bookData = value;
  }

  setBookmarks(value) {
    this.bookMarkSave = value;
  }
}

export default new GlobalStore();
