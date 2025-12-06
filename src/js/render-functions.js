import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a');

export const createGallery = images => {
    const ul = document.querySelector('.gallery');

    const markup = images.map(image => `
        <li>
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" />
            </a>
            <ul class="description">
                <li><span>Likes:</span> ${image.likes}</li>
                <li><span>Views:</span> ${image.views}</li>
                <li><span>Comments:</span> ${image.comments}</li>
                <li><span>Downloads:</span> ${image.downloads}</li>
            </ul>
        </li>
    `).join("");

    ul.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();
};

export const clearGallery = () => {
    const ul = document.querySelector('.gallery');
    ul.innerHTML = "";
}

export const showLoader = () => {
    const loader = document.querySelector('.loader');
    loader.classList.remove('hidden');
};

export const hideLoader = () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
};