import {makeAutoObservable} from 'mobx';

class GlobalStore {
  bookData = [];
  bookMarkSave = [];
  sectionArticle = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSaveBookmark() {
    fetch('http://194.67.111.21:1337/api/sections/', {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.bookData = json;
      });
  }

  setBookmarks = tokens => {
    fetch(`http://194.67.111.21:1337/api/bookmarks/?token=${tokens}`, {
      method: 'GET',
    })
      .then(response => {
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
  };

  setSectionArticle = idSection => {
    fetch(`http://194.67.111.21:1337/api/section/${idSection}`, {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.sectionArticle = json;
      });
  };

  pushBookMark(value) {
    this.bookMarkSave.push(value);
  }

  removeBookMark(value) {
    this.bookMarkSave.splice(value, 1);
  }
}

export default new GlobalStore();
