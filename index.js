const projects = [
  {
      title: 'Rostov-on-Don, Admiral',
      img: './images/slider1.jpg',
      city: `Rostov-on-Don<br>LCD admiral`,
      area: 81,
      time: '3.5 months',
      cost: 'Upon request'
  }, {
      title: 'Sochi Thieves',
      img: './images/slider2.jpg',
      city: `Sochi<br>Thieves`,
      area: 105,
      time: '4 months',
      cost: 'Upon request'
  }, {
      title: 'Rostov-on-Don Patriotic',
      img: './images/slider3.jpg',
      city: `Rostov-on-Don<br>Patriotic`,
      area: 93,
      time: '3 months',
      cost: 'Upon request'
  }
];

function initSlider(options) {
  if (!projects || !projects.length) return;

  options = options || {
    titles: false,
    dots: true,
    autoplay: false,
    clockwise: true
  };

  const cities = document.querySelector('.project__cities');
  const sliderImages = document.querySelector(".slider__images");
  const info = document.querySelector('.project__textgroup');
  const sliderArrows = document.querySelector(".slider__arrows");
  const sliderDots = document.querySelector(".slider__dots");

  initInfo();
  initImages();
  initArrows();

  if (options.dots) {
    initDots();
  }

  if (options.titles) {
    initTitles();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initTitles() {
    projects.forEach((project, index) => {
        let titleLi = `<li class="project__cities__item n${index} ${index === 0 ? 'active' : ''}" data-index="${index}">${project.title}</li>`;
        cities.innerHTML += titleLi;
    })
    cities.querySelectorAll('.project__cities__item').forEach(title => {
      title.addEventListener('click', function () {
          moveSlider(this.dataset.index);
      })
  })
  }  

   function initImages() {
    projects.forEach((project, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${project.img});" data-index="${index}"></div>`;
    sliderImages.innerHTML += imageDiv;
    });
  }

  function initInfo() {
    projects.forEach((project, index) => {
        let dataDiv = `
        <div class="project__textgroup n${index} ${index === 0 ? 'active': ''} "data-index="${index}">
            <div class="project__textgroup__item">
                <h3 class="project__textgroup__titleh3">City:</h3>
                <p>${project.city}</p>
            </div>
            <div  class="project__textgroup__item">
                <h3 class="project__textgroup__titleh3">apartment area:</h3>
                <p>${project.area} m2</p>
            </div>
            <div  class="project__textgroup__item">
                <h3 class="project__textgroup__titleh3">Repair time:</h3>
                <p>${project.time}</p>
            </div>
            <div  class="project__textgroup__item">
                <h3 class="project__textgroup__titleh3">Repair Cost:</h3>
                <p>${project.cost}</p>
            </div>
        </div>
        `;
        info.innerHTML += dataDiv;
    });
  }

  function initArrows() {
    sliderArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            let curNumber = +sliderImages.querySelector('.active').dataset.index;
            let nextNumber;
            if(arrow.classList.contains('left')) {
                nextNumber = curNumber === 0 ? projects.length - 1 : curNumber - 1;
            } else {
                nextNumber = curNumber === projects.length - 1 ? 0 : curNumber + 1;
            }
            moveSlider(nextNumber);
        })
    })
  }

  function initDots() {
    projects.forEach((project, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
  });
  
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
      moveSlider(this.dataset.index);
      })
    })
  }

  function initAutoplay() {
    setInterval(() => {
        let curNumber = +sliderImages.querySelector('.active').dataset.index;
        let nextNumber;
        if (!options.clockwise) {
            nextNumber = curNumber === projects.length - 1 ? 0 : curNumber + 1;
        } else {
            nextNumber = curNumber === 0 ? projects.length - 1 : curNumber - 1;
        }
        moveSlider(nextNumber);
    }, options.autoplayInterval);
  }

  function moveSlider(num) {
    sliderImages.querySelector('.active').classList.remove('active');
    sliderImages.querySelector('.n' + num).classList.add('active');
    cities.querySelector('.active').classList.remove('active');
    cities.querySelector('.n' + num).classList.add('active');
    sliderDots.querySelector('.active').classList.remove('active');
    sliderDots.querySelector('.n' + num).classList.add('active');
    info.querySelector('.active').classList.remove('active');
    info.querySelector('.n' + num).classList.add('active');
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000,
  clockwise: false
};

document.addEventListener("DOMContentLoaded", function() {
initSlider(sliderOptions);
});