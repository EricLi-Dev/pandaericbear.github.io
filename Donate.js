
//-------------------------------------------------------------------
//                    **TYPEWRITER EFFECT**
//-------------------------------------------------------------------
const TypeWriter = function(txtElement, words, wait) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 7)
  this.type();
  this.isDeleting = false;
}

  //Type Method
  TypeWriter.prototype.type = function() {
    //currentWordIndex
    const current = this.wordIndex % this.words.length

    //get current word
    const fullTxt = this.words[current]

    //Check if deleting
    if(this.isDeleting) {
      //Remove Character
      this.txt = fullTxt.substring(0,this.txt.length - 1)
    }else {
      //Add Character
      this.txt = fullTxt.substring(0,this.txt.length + 1)
    }

    //Insert text into txtElement
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    //Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    //If Word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
      //Make a pause at end
      typeSpeed = this.wait;
      //Set delete to true
      this.isDeleting = true;
    }else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      //Move to next word
      this.wordIndex++;
      //Pause before start typing
      typeSpeed = 500
    }


    setTimeout(() => this.type(), typeSpeed)
  }

  //Initialize on load
  document.addEventListener('DOMContentLoaded', init);

  //Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

//----------------------------------------------
//                SLIDESHOW
//----------------------------------------------
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
