import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import {getSearchResultPage}  from './model.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// import View from './views/View.js';
const recipeContainer = document.querySelector('.recipe');
const resultContainer = document.querySelector('.results');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

//this is coming from parcel
// if (model.hot) {
//   module.hot.accept();
// }

const ControleRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //load spinner
    recipeView.renderSpinner();

    // updating bookmarks view
    bookmarksView.update(model.state.bookmarks)

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    // 1) Loading recipe
    await model.loadRecipe(id);

    //2) rendering the recipe
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    //get search query
    resultsView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;

    //load search results
    await model.loadSearchResult(`${query}`);
    resultsView.render(getSearchResultPage());

    ////render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage){
  // 1) render new results
  resultsView.render(getSearchResultPage(goToPage))

  // 2) render NEW PAGINATION button
  paginationView.render(model.state.search)
}


const controlServings = function(newServing){
  //UPDATE the recipe servings (in state the data)
  model.updateServings(newServing)

  //UPDATE THE RECIPE VIEW
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  //to add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id)

  //UPDATE recipe view
  recipeView.update(model.state.recipe);

  //Render Bookmark
  bookmarksView.render(model.state.bookmarks);

}

const controlBookmarks = function(){

  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
  try{
    //render spinner to show spinner
    addRecipeView.renderSpinner()
    await model.UploadRecipe(newRecipe)

    //render Recipe
    recipeView.render(model.state.recipe);

    //SUCCESS MESSAGE
    addRecipeView.renderMessage()

    //render bookmarkView
    bookmarksView.render(model.state.bookmarks);

    //change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    
    //close form window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
    
  }catch(err){
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(ControleRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookMark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

const clearBookmarks = function(){
  localStorage.clear("bookmarks")
}

// clearBookmarks();


// window.addEventListener('hashchange', ControleRecipe);
// window.addEventListener('load', ControleRecipe);

