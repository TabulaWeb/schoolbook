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

  pushBookMark(value) {
    this.bookMarkSave.push(value);
  }

  removeBookMark(value) {
    this.bookMarkSave.splice(value, 1);
  }
}

export default new GlobalStore();
