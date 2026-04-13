import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the receive object to the DOM
   * @param {Object | Object[]} data  the data to be rendered(e.g recipe)
   * @returns  {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Wilkenson Devariste
   * @todo Finish the Implementation
   */

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data){
    
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"))
    const currElements = Array.from(this._parentElement.querySelectorAll("*"))

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i]

      //update change text
      if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== ""){
        currEl.textContent = newEl.textContent;
      }

      //update changed attributes
      if(!newEl.isEqualNode(currEl)){
        Array.from(newEl.attributes).forEach(attr => currEl.setAttribute(attr.name, attr.value));
      }
    })
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
     <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._Sucessmessage) {
    const markup = `
     <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
