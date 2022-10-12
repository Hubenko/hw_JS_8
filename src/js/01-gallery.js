import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    /></a>`;
    })
    .join('');
}

const container = document.querySelector('.gallery');
const galleryList = createGallery(galleryItems);
container.insertAdjacentHTML('beforeend', galleryList);
console.log(container);

const lightbox = new SimpleLightbox('.gallery a', {
  captionType: 'alt',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: '250',
});
console.log(lightbox);
