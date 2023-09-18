import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getFetchRecipes } from './recipes-api.js';
import { createMarcup } from './recipes-render-markup.js';
import { renderModal } from './render-modal.js';
import { fetchData } from '../pop-recipes/pop-recipes-api.js';
import { displayData } from '../pop-recipes/pop-recipes.js';

const container = document.querySelector('.js-recipes-container');

fetchData()
  .then(displayData)
  .then(() => {
    getFetchRecipes()
      .then(data => (container.innerHTML = createMarcup(data)))
      .then(() => renderModal());
  })
  .catch(() => Notify.failure('Oops! Something went wrong, please try again.'));


const list = document.querySelector('.js-list');

list.addEventListener('click', hadlerClick);

const arr =JSON.parse(localStorage.getItem('favorite-recipes')) ?? [];



function hadlerClick(evt){
if(evt.target.classList.contains('recipes-icon-heart') ){
  
  arr.push(evt.target.id);
  evt.target.classList.add('heart-active');
}
if(evt.target.classList.contains('path')){
  evt.target.farthestViewportElement.classList.remove('heart-active');
  arr.splice(arr.indexOf(evt.target.farthestViewportElement.id),1);
}
if(arr.includes(evt.target.id)){
  
  evt.target.classList.add('heart-active');
}

localStorage.setItem('favorite-recipes', JSON.stringify(arr));

}

