(() => {
  body = document.body;

  // header

  body.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      body.classList.remove('stop-scroll');
      burger.classList.remove('burger--active');
      menu.classList.remove('nav--active');
      searchOpen.classList.remove('search--active');
      search.classList.remove('search--active');
      modal.classList.remove('modal--active');
      modal.innerHTML = '';
      Array.from(body.children).forEach((el) => {
        el.inert = false;
      });
      inertElements.forEach((el) => {
        el.inert = false;
      });
    }
  });

  //modal

  const modalBtn = document.querySelectorAll('.gallery__swiper-link');
  const modal = document.querySelector('.modal');

  modalBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      const targetPic = e.currentTarget.querySelector('.gallery__swiper-img');
      const srcPic = targetPic.getAttribute('src');

      const modalContainer = document.createElement('div');
      const modalImg = document.createElement('img');
      const modalRight = document.createElement('div');
      const modalClose = document.createElement('button');
      const modalSubtitle = document.createElement('h3');
      const modalDescr = document.createElement('h4');
      const modalDate = document.createElement('span');
      const modalText = document.createElement('p');

      modalContainer.classList.add('modal__container');
      modalImg.classList.add('modal__img');
      modalRight.classList.add('modal__right');
      modalClose.classList.add('btn-reset', 'close', 'modal__close');
      modalSubtitle.classList.add('subtitle', 'modal__subtitle');
      modalDescr.classList.add('text', 'modal__descr');
      modalDate.classList.add('descr', 'modal__date');
      modalText.classList.add('text', 'modal__text');

      modalImg.setAttribute('alt', 'Картина');
      modalImg.setAttribute('src', `${srcPic}`);
      modalClose.setAttribute('aria-label', 'Закрыть модальное окно');

      modalSubtitle.textContent = 'Казимир Малевич';
      modalDescr.textContent = '«Женщина с граблями»';
      modalDate.textContent = '1931–1932';
      modalText.textContent =
        'Картина из второй серии крестьянского цикла работ Казимира Малевича. Художник принялся за её создание в 1930–1931 годах, после того, как первый цикл был утерян после Берлинской и Варшавской выставок в 1927 году.';

      modal.append(modalContainer);
      modalContainer.append(modalImg);
      modalContainer.append(modalRight);
      modalRight.append(modalClose);
      modalRight.append(modalSubtitle);
      modalRight.append(modalDescr);
      modalRight.append(modalDate);
      modalRight.append(modalText);

      modal.classList.add('modal--active');
      body.classList.add('stop-scroll');

      Array.from(body.children).forEach((el) => {
        if (el !== modal) {
          el.inert = true;
        }
      });

      modalClose.addEventListener('click', () => {
        modal.classList.remove('modal--active');
        body.classList.remove('stop-scroll');
        modal.innerHTML = '';

        Array.from(body.children).forEach((el) => {
          el.inert = false;
        });
      });
    });
  });

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      modal.classList.remove('modal--active');
      body.classList.remove('stop-scroll');
      Array.from(body.children).forEach((el) => {
        el.inert = false;
      });
      modal.innerHTML = '';
    }
  });

  // burger-menu

  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.nav');
  const menuLinks = menu.querySelectorAll('.nav__link');
  const navClose = menu.querySelector('.nav__close');

  const getInertElements = (element, grandelement) => {
    const siblingsElements = [];

    while (element !== grandelement) {
      siblingsElements.push(...getSiblingsElement(element));
      element = element.parentElement;
    }

    return siblingsElements;
  };

  const getSiblingsElement = (el) => {
    const siblings = [];
    let sibling = el;

    while (sibling.previousElementSibling) {
      sibling = sibling.previousElementSibling;
      siblings.push(sibling);
    }

    sibling = el;

    while (sibling.nextElementSibling) {
      sibling = sibling.nextElementSibling;
      siblings.push(sibling);
    }

    return siblings;
  };

  const inertElements = getInertElements(menu, body);

  const addMenu = () => {
    burger.classList.add('burger--active');
    menu.classList.add('nav--active');
    body.classList.add('stop-scroll');

    inertElements.forEach((el) => {
      el.inert = true;
    });
  };

  const closeMenu = () => {
    burger.classList.remove('burger--active');
    menu.classList.remove('nav--active');
    body.classList.remove('stop-scroll');

    inertElements.forEach((el) => {
      el.inert = false;
    });
  };

  burger.addEventListener('click', addMenu);

  navClose.addEventListener('click', closeMenu);

  menuLinks.forEach((el) => {
    el.addEventListener('click', closeMenu);
  });

  // search

  const search = document.querySelector('.search__btn');
  const searchOpen = document.querySelector('.search-not-desctop');
  const searchClose = document.querySelector('.search-close');

  search.addEventListener('click', (e) => {
    e.preventDefault();
    searchOpen.classList.add('search--active');
    search.classList.add('search--active');
  });

  searchClose.addEventListener('click', () => {
    searchOpen.classList.toggle('search--active');
    search.classList.toggle('search--active');
  });

  // dropdown-menu

  const genreBtn = document.querySelectorAll('.genre__btn');
  const genreItem = document.querySelectorAll('.genre__item');

  genreBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      genreItem.forEach((item) => {
        if (item.querySelector('.genre__btn') !== btn) {
          item.classList.remove('genre__item--open');
        }
      });
      event.isClicked = true;
      btn.parentElement.classList.toggle('genre__item--open');
    });
  });

  body.addEventListener('click', (event) => {
    if (event.isClicked || event.target.classList.contains('simplebar-content'))
      return;

    genreItem.forEach((item) => {
      item.classList.remove('genre__item--open');
    });
  });

  // slider hero

  const heroSwiper = new Swiper('.hero__swiper-container', {
    spaceBetween: 50,
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  // select

  const element = document.querySelector('.gallery__select');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    position: 'bottom',
  });

  // slider gallery

  const gallerySwiper = new Swiper('.gallery__swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    navigation: {
      nextEl: '.gallery__swiper-button-next',
      prevEl: '.gallery__swiper-button-prev',
    },
    pagination: {
      el: '.gallery__swiper-pagination',
      type: 'fraction',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 38,
        slidesPerGroup: 2,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    },
  });

  // accordion

  new Accordion('.accordion', {
    elementClass: 'catalog__item',
    triggerClass: 'catalog__date-wrapper',
    panelClass: 'catalog__item-content',
    activeClass: 'catalog__item--active',
  });

  // tabs

  const tabsBtn = document.querySelectorAll('.artists-btn');
  const tabsItem = document.querySelectorAll('.artist');

  tabsBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      const path = e.currentTarget.dataset.path;
      const activeSection = document.querySelector(`[data-target="${path}"]`);

      tabsBtn.forEach((btn) => {
        btn.classList.remove('artists-btn--active');
      });
      e.currentTarget.classList.add('artists-btn--active');

      tabsItem.forEach((el) => {
        el.classList.remove('artist--active');
      });

      activeSection.classList.add('artist--active');
      if (window.innerWidth < 576) {
        activeSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // slider events

  const eventsSwiper = new Swiper('.events__swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    navigation: {
      nextEl: '.events__swiper-button-next',
      prevEl: '.events__swiper-button-prev',
    },
    pagination: {
      el: '.events__swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
        allowTouchMove: false,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 27,
        slidesPerGroup: 3,
        allowTouchMove: false,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
        allowTouchMove: false,
      },
    },
  });

  // slider projects

  const projectsSwiper = new Swiper('.projects__swiper-container', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    navigation: {
      nextEl: '.projects__swiper-button-next',
      prevEl: '.projects__swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    },
  });

  // validation

  const validation = new JustValidate('.form', {
    errorLabelStyle: {
      color: '#D11616',
    },
  });

  const name = document.querySelector('.input-name');
  const tel = document.querySelector('input[type="tel"]');
  const mask = new Inputmask('+7 (999)-999-99-99');
  mask.mask(tel);

  validation
    .addField('.input-name', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели имя',
      },
    ])

    .addField('.input-tel', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели телефон',
      },
      {
        rule: 'function',
        validator: () => {
          const phone = tel.inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Введите телефон полностью',
      },
    ])
    .onSuccess(async () => {
      const data = {
        name: name.value,
        tel: tel.inputmask.unmaskedvalue(),
      };

      const response = await fetch('mail.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      const result = await response.text();

      name.value = '';
      tel.value = '';

      alert(result);
    });

  // map

  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map('map', {
      center: [55.758468, 37.601088],
      zoom: 14,
      controls: [],
    });
    var myPlacemark = new ymaps.Placemark(
      [55.758468, 37.601088],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../img/placemark.svg',
        iconImageSize: [20, 20],
      }
    );
    myMap.controls
      .add('zoomControl', {
        position: {
          right: 12,
          top: 260,
        },
      })
      .add('geolocationControl', {
        position: {
          right: 12,
          top: 352,
        },
      });

    myMap.geoObjects.add(myPlacemark);

    myMap.behaviors.disable(['scrollZoom']);
  }
})();
