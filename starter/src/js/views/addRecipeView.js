import View from "./View";

class addRecipeView extends View{
    
    _parentElement = document.querySelector(".upload");
    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _buttonOpen = document.querySelector(".nav__btn--add-recipe");
    _buttonClose = document.querySelector(".btn--close-modal");
    _Sucessmessage = 'The recipe has been successfully uploaded.'

    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }

    _addHandlerHideWindow(){
        this._buttonClose.addEventListener("click", this.toggleWindow.bind(this))
        this._overlay.addEventListener("click", this.toggleWindow.bind(this))
    }

    _addHandlerShowWindow(){
        this._buttonOpen.addEventListener("click", this.toggleWindow.bind(this))

    }
    
    addHandlerUpload(handler){
        this._parentElement.addEventListener("submit", function(e){
            e.preventDefault();
            const dataArray = [...new FormData(this)]
            const data = Object.fromEntries(dataArray)
            console.log(data);
            handler(data);
        })
    }
}

export default new addRecipeView();