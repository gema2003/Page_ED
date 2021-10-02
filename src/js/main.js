// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** Select Movil Divice ************
const nua = navigator.userAgent;
const el = document.documentElement;

(userDeviceInfo = () => {
  const mobile = {
    android:()=> nua.match(/android/i),
    ios:()=> nua.match(/iphone|ipad|ipod/i),
    any:function() {
      return this.android() || this.ios();
    }
  };

  if (mobile.ios()) {
    el.className += 'apple';

  }else if (mobile.android()) {
    el.className += 'android';
  }

})(); 

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    // console.log("helo");

    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});

// ********** Button Toggle ************
document.addEventListener('click', (e)=>{
  if(e.target.matches('.nav-toggle')){
      navToggle.classList.toggle('open');
  }else if (e.target.matches('.scroll-link')){
      navToggle.classList.toggle('open');
  }else if (e.target.matches('.toggle-bar')) {
      navToggle.classList.toggle('open');
  }else {
    // console.log('here not dub');
  }
});

// ********** Gallery Movil Button ************
document.querySelector('.more-button').addEventListener('click', function() {
  document.querySelector('.index-btn').classList.toggle('act');
});

// ********** Filter Gallery ************
$(document).ready(function() {
  $('.link').click(function() {// ********** Form Validation ************
const doc = document;

function contactFormValidation() {
  const $form = doc.querySelector('.contact-form');
  const $inputs = doc.querySelectorAll('.contact-form [required]');
  // console.log($inputs);

  $inputs.forEach((input) =>{
    const $span = doc.createElement('span');
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement('afterend', $span);
  });

  doc.addEventListener('keyup', (e)=>{
    if(e.target.matches('.contact-form [required]')) {
      let $input = e.target;
      let pattern = $input.pattern || $input.dataset.pattern;

      // console.log($input, pattern)

      if(pattern && $input.value !== '') {
        // console.log('tiene patron');
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? doc.getElementById($input.name).classList.add('is-active')
          : doc.getElementById($input.name).classList.remove('is-active');
      };

      if(!pattern) {
        // console.log('no tiene patron');
        return $input.value === ''
          ? doc.getElementById($input.name).classList.add('is-active')
          : doc.getElementById($input.name).classList.remove('is-active');
      }
    }
  });

  doc.addEventListener('submit', (e)=>{
    // e.preventDefault();
    confirm('Do you want to send this information?');
    const $loader = doc.querySelector('.cantact-form-loader');
    const $response = doc.querySelector('.contact-form-response');

    $loader.classList.remove('none');

    setTimeout(() =>{
      $loader.classList.add('none');
      $response.classList.remove('none');
      $form.reset();
      setTimeout(()=> $response.classList.add('none'), 2000);
    },3000);
  });
}

contactFormValidation();
    var valor = $(this).attr('data-name');
    if(valor == 'all-designs') {
      $('.filter').show('6000');
    }else {
      $('.filter').not('.' + valor).hide('6000');
      $('.filter').filter('.' + valor).show('6000');
    } 

    $('ul.index-desk').on('click', 'li', function() {
          $('li.active').removeClass('active');
          $(this).addClass('active');
    });
    $('ul.index-movil').on('click', 'li', function() {
          $('li.active').removeClass('active');
          $(this).addClass('active');
    });
  });
});

// ********** Modal images gallery ************
const gallery = document.querySelectorAll('.gallery .image');
const imagesPrev = document.querySelector('.img-show');
const container = document.querySelector('.modal-container');
const close = container.querySelector('.icon');
const currentImg = container.querySelector('.current_img');
const totalImg = container.querySelector('.total_img');
const copyText = container.querySelector('.titles');
const wdw = window;

wdw.onload = () => { 

    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length 
        let newIndex = i; 
        let clickImgIndex = null;
        
        gallery[i].onclick = () => {
            clickImgIndex = newIndex; 
            
            function preview() {
                currentImg.textContent = newIndex + 1; 
                let selectedImgUrl = gallery[newIndex].querySelector('img').src; 
                imagesPrev.src = selectedImgUrl 
                let textAlt = gallery[newIndex].querySelector('img').alt; 
                copyText.innerHTML = textAlt; 
            }
            const prevBtn = container.querySelector('.prev');
            const nextBtn = container.querySelector('.next');
            if (newIndex == 0) {
                prevBtn.style.display = 'none';
            }
            if (newIndex >= gallery.length - 1) {
                nextBtn.style.display = 'none';
            }
            prevBtn.onclick = () => {
                newIndex--;
                if (newIndex == 0) {
                    preview();
                    prevBtn.style.display = 'none';
                } else {
                    preview();
                    nextBtn.style.display = 'block';
                }
            }
            nextBtn.onclick = () => {
                newIndex++;
                if (newIndex >= gallery.length - 1) {
                    preview();
                    nextBtn.style.display = 'none';
                } else {
                    preview();
                    prevBtn.style.display = 'block';
                }
            }
            preview(); 
            container.classList.toggle('move');
            imagesPrev.classList.toggle('show');
            close.onclick = () => {
                newIndex = clickImgIndex; 
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                container.classList.remove('move');
                imagesPrev.classList.remove('show');
            }
        }
    }
}

// ********** Form Validation ************
const doc = document;

(contactFormValidation=() => {
  const $form = doc.querySelector('.contact-form');
  const $inputs = doc.querySelectorAll('.contact-form [required]');
  // console.log($inputs);

  $inputs.forEach((input) =>{
    const $span = doc.createElement('span');
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement('afterend', $span);
  });

  doc.addEventListener('keyup', (e)=>{
    if(e.target.matches('.contact-form [required]')) {
      let $input = e.target;
      let pattern = $input.pattern || $input.dataset.pattern;

      // console.log($input, pattern)

      if(pattern && $input.value !== '') {
        // console.log('tiene patron');
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? doc.getElementById($input.name).classList.add('is-active')
          : doc.getElementById($input.name).classList.remove('is-active');
      };

      if(!pattern) {
        // console.log('no tiene patron');
        return $input.value === ''
          ? doc.getElementById($input.name).classList.add('is-active')
          : doc.getElementById($input.name).classList.remove('is-active');
      }
    }
  });

  doc.addEventListener('submit', (e)=>{
    // e.preventDefault();
    confirm('Do you want to send this information?');
    const $loader = doc.querySelector('.cantact-form-loader');
    const $response = doc.querySelector('.contact-form-response');

    $loader.classList.remove('none');

    setTimeout(() =>{
      $loader.classList.add('none');
      $response.classList.remove('none');
      $form.reset();
      setTimeout(()=> $response.classList.add('none'), 2000);
    },3000);
  });

})();

// ********** Text Gradient ************
$('.txt').html(function(i, html) {
  var chars = $.trim(html).split('');
  return '<span>' + chars.join('</span><span>') + '</span>';
});











