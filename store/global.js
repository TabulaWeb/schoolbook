import {makeAutoObservable} from 'mobx';

class GlobalStore {
  bookData = [];

  bookMarkSave = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSaveBookmark() {
    fetch('http://194.67.116.116:1337/api/sections/', {
      method: 'GET',
    })
      .then(response => {
        alert(`Все главы книги: ${response.status}`);
        return response.json();
      })
      .then(json => {
        this.bookData = json;
      });
  }

  setBookmarks() {
    fetch('http://194.67.116.116:1337/api/bookmarks/?token=TFETQRTTZAD0EPHP', {
      method: 'GET',
    })
      .then(response => {
        alert(`сохраненные главы ${response.status}`);
        return response.json();
      })
      .then(json => {
        json.map(i => {
          this.bookMarkSave.push({
            info: {
              section_id: i.info.section_id,
              article_id: i.info.article_id,
            },
          });
        });
      });
  }

  pushBookMark(value) {
    this.bookMarkSave.push(value);
  }

  removeBookMark(value) {
    this.bookMarkSave.splice(value, 1);
  }
}

export default new GlobalStore();
