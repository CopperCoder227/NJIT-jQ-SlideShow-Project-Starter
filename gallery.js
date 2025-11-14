let mCurrentIndex = 0;
let mImages = [];
const mWaitTime = 5000;
let timer = null;
let currentAudio = null; // Store the currently playing song

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

  // More indicator toggle + audio playback
  $('.moreIndicator').on('click', function () {
    $(this).toggleClass('rot90 rot270');
    $('.details').slideToggle(300, function () {
      const isVisible = $('.details').is(':visible');
      if (isVisible) {
        playSlideSong(); // Play music for current slide
      } else {
        stopSong();
      }
    });
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

  // NEW: if dropdown is open, update the song for the new slide
  if ($('.details').is(':visible')) {
    playSlideSong();
  } else {
    stopSong();
  }
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

// --- Audio Handling ---
function playSlideSong() {
  const currentImage = mImages[mCurrentIndex];
  if (!currentImage || !currentImage.songPath) return;

  stopSong(); // stop any current playback

  currentAudio = new Audio(currentImage.songPath);
  currentAudio.play().catch(err => console.error("Audio playback failed:", err));
}

function stopSong() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

$(document).ready(function () {
  $(".moreIndicator").on("click", function () {
    $(this).toggleClass("open");
  });
});
