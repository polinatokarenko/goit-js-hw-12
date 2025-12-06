import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery } from "./js/render-functions.js";
import { clearGallery } from "./js/render-functions.js";
import { showLoader } from "./js/render-functions.js";
import { hideLoader } from "./js/render-functions.js";

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

hideLoader();

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            message: 'Please enter a search term!',
        });
        return;
    }

    clearGallery();
    showLoader();

    try {
        const data = await getImagesByQuery(query);

        if (!data.hits || data.hits.length === 0) {
            iziToast.info({
                message: 'Sorry, no images found. Try another search!',
            });
            return;
        }

        createGallery(data.hits);

    } catch (error) {
        console.error(error);
        iziToast.error({
            message: 'Something went wrong, please try again later!',
        });
    } finally {
        hideLoader();
    }
});
