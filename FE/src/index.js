let slideIndex = 1;

// Next/previous controls
function plusSlidesBanner(n) {
    showSlidesBanner(slideIndex += n);
}

// Thumbnail image controls
function currentSlideBanner(n) {
    showSlidesBanner(slideIndex = n);
}

let slideTimeout;
function showSlidesBanner(n) {
    let i;
    let slides = document.getElementsByClassName("slide");

    if (n) {
        slideIndex = n;
    } else {
        slideIndex++;
    }

    if (slideIndex > slides.length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
    clearTimeout(slideTimeout); // Clear the previous timeout
    slideTimeout = setTimeout(showSlides, 3000); // Set up a new timeout
}