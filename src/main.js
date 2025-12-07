import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery } from "./js/render-functions.js";
import { clearGallery } from "./js/render-functions.js";
import { showLoader } from "./js/render-functions.js";
import { hideLoader } from "./js/render-functions.js";
import { showLoadMoreButton } from "./js/render-functions.js";
import { hideLoadMoreButton } from "./js/render-functions.js";

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBTN = document.querySelector('button[type="button"]');

hideLoader();
hideLoadMoreButton();

let page = 1;
let lastQuery = "";

loadMoreBTN.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(lastQuery, page);
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery > li');
    const displayedItems = document.querySelectorAll('.gallery > li').length;

    if (displayedItems >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results."
      });
    }

    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        left: 0,
        behavior: 'smooth'
      });
    }

  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong, please try again later!',
    });

  } finally {
    hideLoader();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideLoadMoreButton();
    
  const query = input.value.trim();
  
  if (lastQuery !== query) {
    page = 1;
  }

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    lastQuery = query;
    
    const data = await getImagesByQuery(query, page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, no images found. Try another search!',
      });
      hideLoader();
      return;
    }

    createGallery(data.hits);

    const displayedItems = document.querySelectorAll('.gallery > li').length;
    if (displayedItems < data.totalHits) {
      showLoadMoreButton();
    }

  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong, please try again later!',
    });

  } finally {
    hideLoader();
  }
});