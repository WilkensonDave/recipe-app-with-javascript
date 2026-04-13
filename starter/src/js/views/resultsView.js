import View from './View';
import previewView from './previewView';

class ResultsView extends previewView {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipe found for your search query. Try again or check for possible mistake.';
  _Sucessmessage = '';

}

export default new ResultsView();
