let mCurrentIndex = 0;
let mImages = [];
const mWaitTime = 5000;
let timer = null;

$(document).ready(() => {
  $('.details').hide();

  // Load images from images.json
  $.getJSON('images.json', function (data) {
    mImages = data.images;
    if (mImages && mImages.length > 0) {
      swapPhoto(); // Show first image
      startTimer();
    }
  }).fail(function () {
    console.error('Failed to load images.json');
  });

  // More indicator toggle
  $('.moreIndicator').on('click', function () {
    $(this).toggleClass('rot90 rot270');
    $('.details').slideToggle(300);
  });

  // Navigation
  $('#nextPhoto').on('click', showNextPhoto);
  $('#prevPhoto').on('click', showPrevPhoto);
});

function swapPhoto() {
  if (mImages.length === 0) return;

  const img = mImages[mCurrentIndex];
  $('#photo').attr('src', img.imgPath);
  $('.location').text(`Location: ${img.imgLocation}`);
  $('.description').text(`Chapter: ${img.description}`);
  $('.date').text(`Description: ${img.date}`);
}

function showNextPhoto() {
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length;
  swapPhoto();
  restartTimer();
}

function showPrevPhoto() {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
  swapPhoto();
  restartTimer();
}

function startTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(showNextPhoto, mWaitTime);
}

function restartTimer() {
  clearInterval(timer);
  timer = setInterval(showNextPhoto, mWaitTime);
}
