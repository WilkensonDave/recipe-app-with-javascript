import View from './View';
import previewView from './previewView';

class BookmarksView extends previewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmarks yet. Find a nice recipe and bookmark it;)';
  _Sucessmessage = '';

  addHandlerRender(handler){
    window.addEventListener("load", handler)
  }
}

export default new BookmarksView();
