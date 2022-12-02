//выпадающий список в header__bottom
const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled",
};

function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
        evt.target.classList.remove(
            params.disabledClassName,
            params.activeClassName
        );
        evt.target.removeEventListener("animationend", onDisable);
    }
}

function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
        const activeElements = document.querySelectorAll(
            `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
        );

        if (
            activeElements.length &&
            !evt.target.closest(`.${params.activeClassName}`)
        ) {
            activeElements.forEach((current) => {
                if (current.classList.contains(params.btnClassName)) {
                    current.classList.remove(params.activeClassName);
                } else {
                    current.classList.add(params.disabledClassName);
                }
            });
        }

        if (evt.target.closest(`.${params.btnClassName}`)) {
            const btn = evt.target.closest(`.${params.btnClassName}`);
            const path = btn.dataset.path;
            const drop = document.querySelector(
                `.${params.dropClassName}[data-target="${path}"]`
            );

            btn.classList.toggle(params.activeClassName);

            if (!drop.classList.contains(params.activeClassName)) {
                drop.classList.add(params.activeClassName);
                drop.addEventListener("animationend", onDisable);
            } else {
                drop.classList.add(params.disabledClassName);
            }
        }
    });
}

setMenuListener();

//форма поиска

var lastResFind = ""; // последний удачный результат
var copy_page = ""; // копия страницы в ихсодном виде
function TrimStr(s) {
    s = s.replace(/^\s+/g, "");
    return s.replace(/\s+$/g, "");
}

function FindOnPage(inputId) {
    //ищет текст на странице, в параметр передается ID поля для ввода
    var obj = window.document.getElementById(inputId);
    var textToFind;

    if (obj) {
        textToFind = TrimStr(obj.value); //обрезаем пробелы
    } else {
        alert("Введенная фраза не найдена");
        return;
    }
    if (textToFind == "") {
        alert("Вы ничего не ввели");
        return;
    }

    if (document.body.innerHTML.indexOf(textToFind) == "-1")
        alert("Ничего не найдено, проверьте правильность ввода!");

    if (copy_page.length > 0) document.body.innerHTML = copy_page;
    else copy_page = document.body.innerHTML;

    document.body.innerHTML = document.body.innerHTML.replace(
        eval("/name=" + lastResFind + "/gi"),
        " "
    ); //стираем предыдущие якори для скрола
    document.body.innerHTML = document.body.innerHTML.replace(
        eval("/" + textToFind + "/gi"),
        "<a name=" + textToFind + " style='background:red'>" + textToFind + "</a>"
    ); //Заменяем найденный текст ссылками с якорем;
    lastResFind = textToFind; // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки
    window.location = "#" + textToFind; //перемещаем скрол к последнему найденному совпадению
    location.reload() //перезагрузить страницу после поиска
}
//swiper1
var swiper1 = new Swiper(".swiper1", {
    loop: true,
    allowTouchMove: false,

    effect: "fade",
    speed: 4000,
    autoplay: {
        delay: 1,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

//селект
document.addEventListener("DOMContentLoaded", function() {
    const selector = document.querySelector(".choices");

    const choices = new Choices(selector, {
        searchEnabled: false,
        classNames: {
            containerOuter: "choices gallery-choices",
        },
    });
});

//swiper 2
document.addEventListener("DOMContentLoaded", () => {
    let gallerySlider = new Swiper(".gallery__swiper", {
        slidesPerGroup: 3,
        slidesPerView: "auto",
        grid: {
            rows: 1,
            fill: "row",
        },
        // spaceBetween: 20,

        pagination: {
            el: ".gallery__rignt .gallery-pagination",
            type: "fraction",
        },

        navigation: {
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
        },

        breakpoints: {
            577: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 38,
            },
            992: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 34,
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
        speed: 800, //скорость переключения

        a11y: false,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
    });
});
//pagination - 2
document.addEventListener("DOMContentLoaded", () => {
    let gallerySlider = new Swiper(".swiper2", {
        slidesPerGroup: 3,
        slidesPerView: "auto",
        grid: {
            rows: 1,
            fill: "row",
        },
        pagination: {
            el: ".gallery__rignt .gallery-pagination2",
            type: "fraction",
        },
        navigation: {
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            },
            577: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 38,
            },
            992: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 34,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
    });
});

//каталог:табы в аккордионе

(() => {
    new Accordion(".js-accordion-container", {
        openOnInit: [0],
    });
})();

// Табы
const params2 = {
    tabsClass: "js-tab-btn",
    wrap: "js-tabs-wrap",
    content: "js-tab-content",
    active: "active",
};

function setTabs(params2) {
    const tabBtns = document.querySelectorAll(`.${params2.tabsClass}`);

    function onTabClick(e) {
        e.preventDefault();
        const path = this.dataset.path;
        const wrap = this.closest(`.${params2.wrap}`);
        const currentContent = wrap.querySelector(
            `.${params2.content}[data-target="${path}"]`
        );
        const contents = wrap.querySelectorAll(`.${params2.content}`);

        contents.forEach((el) => {
            el.classList.remove(params2.active);
        });

        currentContent.classList.add(params2.active);

        tabBtns.forEach((el) => {
            el.classList.remove(params2.active);
        });

        this.classList.add(params2.active);
    }

    tabBtns.forEach(function(el) {
        el.addEventListener("click", onTabClick);
    });
}

setTabs(params2);

//swiper 3

document.addEventListener("DOMContentLoaded", () => {
    let gallerySlider = new Swiper(".swiper3", {
        slidesPerGroup: 3,
        slidesPerView: "auto",
        grid: {
            rows: 1,
            fill: "row",
        },
        spaceBetween: 48,

        navigation: {
            nextEl: ".btn-next3",
            prevEl: ".btn-prev3",
        },
        pagination: {
            el: ".developments__pagination",
            type: "bullets",
            clickable: true,
        },

        a11y: false,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        speed: 800, //скорость переключения

        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            },

            577: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 34,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 27,
            },
            1850: {
                slidesPerView: 3,
                spaceBetween: 48,
            },
        },
    });
});
//tooltip
tippy("#myButton", {
    content: "Пример современных тенденций - современная методология разработки",
    theme: "projects__tooltip",
    maxWidth: 300,
});
tippy("#myButton2", {
    content: "Приятно,граждане,наблюдать,как сделанные на базе аналитики выводы вызывают у вас эмоции",
    theme: "projects__tooltip",
    maxWidth: 300,
});
tippy("#myButton3", {
    content: "В стремлении повысить качество",
    theme: "projects__tooltip",
    maxWidth: 300,
});
//swiper4

document.addEventListener("DOMContentLoaded", () => {
    let gallerySlider = new Swiper(".swiper4", {
        slidesPerGroup: 3,
        slidesPerView: "auto",

        grid: {
            rows: 1,
            fill: "row",
        },
        spaceBetween: 45,
        navigation: {
            nextEl: ".btn-next4",
            prevEl: ".btn-prev4",
        },

        speed: 1000, //скорость переключения

        a11y: false,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        breakpoints: {
            320: {
                slidesPerGroup: 1,
                slidesPerView: 1,
            },

            577: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 33,
            },

            992: {
                slidesPerGroup: 2,
                slidesPerView: 2,
                spaceBetween: 50,
            },

            1700: {
                slidesPerView: 3,
                spaceBetween: 25,
            },

            1890: {
                slidesPerView: 3,
                spaceBetween: 45,
            },
        },
    });
});
//form
let phone = document.querySelector("input[type='tel']");

var im = new Inputmask("+7 (999) 999-99-99");
im.mask(phone);
new window.JustValidate(".js-form", {
    colorWrong: "#D11616",
    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 10,
        },
        phone: {
            required: true,
            function: (name, value) => {
                const ph = phone.inputmask.unmaskedvalue();
                return Number(ph) && ph.length === 10;
            },
        },
    },
    messages: {
        name: "Вы не ввели имя",
        phone: {
            required: "Вы не ввели телефон",
            function: "Не достаточно количество символов",
        },
    },
});
//чтоб не вводили не допустимый формат
let jin = document.getElementById("in");
let jout = document.getElementById("out");
let btn = document.getElementById("btn");
let btn2 = document.getElementById("btn2");

jin.addEventListener("keydown", function(e) {
    if (e.key.match(/[0-9]/)) return e.preventDefault();
    jin.value = jin.value.replace(
        /[%,+,-,@,#,$,&,*,^,(),!,_,=,:,",?,/,[,{},<,>]/g,
        ""
    );
}); // Будет перехватывать все числа при ручном вводе.
// Тажке нужна, чтобы replace не сбрасывал каретку, срабатывая каждый раз.

jin.addEventListener("input", function(e) {
    // На случай, если умудрились ввести через копипаст или авто-дополнение.
    jin.value = jin.value.replace(/[0-9]/g, "");
    jin.value = jin.value.replace(
        /[%,+,-,@,#,$,&,*,^,(),!,_,=:,",?,/,[,{,<,>]/g,
        ""
    );
});

//карта
ymaps.ready(init);

function init() {
    const mapElem = document.querySelector("#myMap1");
    const myMap = new ymaps.Map(
        "myMap1", {
            center: [55.758468, 37.601088],
            zoom: 17,
            controls: ["geolocationControl", "zoomControl"],
        }, {
            suppressMapOpenBlock: true,
            geolocationControlSize: "large",
            geolocationControlPosition: { top: "200px", right: "20px" },
            geolocationControlFloat: "none",
            zoomControlSize: "small",
            zoomControlFloat: "none",
            zoomControlPosition: { top: "120px", right: "20px" },
        }
    );
    myMap.behaviors.disable("scrollZoom");

    const myPlacemark = new ymaps.Placemark(
        [55.758468, 37.601088], {}, {
            iconLayout: "default#image",
            iconImageHref: "img/label.svg",
            iconImageSize: [20, 20],
            iconImageOffset: [-20, -40],
        }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
}
//burger menu
let menu = document.querySelector(".header__top-nav");
let burger = document.querySelector(".burger");
let menuLinks = menu.querySelectorAll(".burger-menu");
let menuLink = menu.querySelectorAll(".nav__link");

burger.addEventListener("click", function() {
    menu.classList.toggle("header__nav--active");

    document.body.classList.toggle("stop-scroll");
});

menuLinks.forEach(function(el) {
    el.addEventListener("click", function() {
        menu.classList.remove("header__nav--active");

        document.body.classList.remove("stop-scroll");
    });
});

menuLink.forEach(function(el) {
    el.addEventListener("click", function() {
        menu.classList.remove("header__nav--active");

        document.body.classList.remove("stop-scroll");
    });
});

//форма поиска

document
    .querySelector(".form__btn-open")
    .addEventListener("click", function() {
        document.querySelector(".form2").classList.add("form__active");
        this.classList.add("active");
    });
document.addEventListener("click", function(e) {
    let target = e.target;
    let form = document.querySelector(".form2");
    if (!target.closest(".search2")) {
        form.classList.remove("form__active");
        form.querySelector("input").value = "";
        document.querySelector(".form__btn-open").classList.remove("active");
    }
});
document
    .querySelector(".search-closing")
    .addEventListener("click", function() {
        document.querySelector(".form2").classList.remove("form__active");
        this.classList.remove("active");
    });

//modal
class Modal {
    constructor(options) {
        let defaultOptions = {
            isOpen: () => {},
            isClose: () => {},
        };
        this.options = Object.assign(defaultOptions, options);
        this.modal = document.querySelector(".modal");
        this.speed = false;
        this.animation = false;
        this.isOpen = false;
        this.modalContainer = false;
        this.previousActiveElement = false;
        this.fixBlocks = document.querySelectorAll(".fix-block");
        this.focusElements = [
            // 'a[href]',
            // 'input',
            "button",
            // 'select',
            // 'textarea',
            // '[tabindex]'
        ];
        this.events();
    }
    events() {
        if (this.modal) {
            document.addEventListener(
                "click",
                function(e) {
                    const clickedElement = e.target.closest(".modal-btn");
                    if (clickedElement) {
                        let target = clickedElement.dataset.path;
                        let animation = clickedElement.dataset.animation;
                        let speed = clickedElement.dataset.speed;
                        this.animation = animation ? animation : "fade";
                        this.speed = speed ? parseInt(speed) : 500;
                        this.modalContainer = document.querySelector(`.modal__container`);
                        this.open();
                        return;
                    }

                    if (e.target.closest(".modal-close")) {
                        this.close();
                        return;
                    }
                }.bind(this)
            );
            window.addEventListener(
                "keydown",
                function(e) {
                    if (e.keyCode == 27) {
                        if (this.isOpen) {
                            this.close();
                        }
                    }

                    if (e.keyCode == 9 && this.isOpen) {
                        this.focusCatch(e);
                        return;
                    }
                }.bind(this)
            );
            this.modal.addEventListener(
                "click",
                function(e) {
                    if (!e.target.classList.contains("modal__container") &&
                        !e.target.closest(".modal__container") &&
                        this.isOpen
                    ) {
                        this.close();
                    }
                }.bind(this)
            );
        }
    }
    open() {
        this.previousActiveElement = document.activeElement;

        this.modal.style.setProperty("--transition-time", `${this.speed / 1000}s`);
        this.modal.classList.add("is-open");
        this.disableScroll();

        this.modalContainer.classList.add("modal-open");
        this.modalContainer.classList.add(this.animation);

        setTimeout(() => {
            this.options.isOpen(this);
            this.modalContainer.classList.add("animate-open");
            this.isOpen = true;
            this.focusTrap();
        }, this.speed);
    }
    close() {
        if (this.modalContainer) {
            this.modalContainer.classList.remove("animate-open");
            this.modalContainer.classList.remove(this.animation);
            this.modal.classList.remove("is-open");
            this.modalContainer.classList.remove("modal-open");

            this.enableScroll();
            this.options.isClose(this);
            this.isOpen = false;
            this.focusTrap();
        }
    }

    focusCatch(e) {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements);
        const focusArray = Array.prototype.slice.call(focusable);
        const focusedIndex = focusArray.indexOf(document.activeElement);

        if (e.shiftKey && focusedIndex === 0) {
            focusArray[focusArray.length - 1].focus();
            e.preventDefault();
        }

        if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
            focusArray[0].focus();
            e.preventDefault();
        }
    }
    focusTrap() {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements);
        if (this.isOpen) {
            focusable[0].focus();
        } else {
            this.previousActiveElement.focus();
        }
    }

    disableScroll() {
        let pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add("disable-scroll");
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + "px";
    }
    enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        this.unlockPadding();
        document.body.style.top = "auto";
        document.body.classList.remove("disable-scroll");
        window.scroll({ top: pagePosition, left: 0 });
        document.body.removeAttribute("data-position");
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        document.body.style.paddingRight = paddingOffset;
    }
    unlockPadding() {
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = "0";
        });
        document.body.style.paddingRight = "0";
    }
}
const modal = new Modal({
    isOpen: (modal) => {
        console.log(modal);
        console.log("opened");
    },
    isClose: () => {
        console.log("closed");
    },
});

//скролл

(() => {
    const MOBILE_WIDTH = 992;

    function getWindowWidth() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.body.clientWidth,
            document.documentElement.clientWidth
        );
    }

    function scrollToContent(link, isMobile) {
        if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
            return;
        }

        const href = link.getAttribute("href").substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: "smooth",
        });
    }
    document.querySelectorAll(".js-scroll-link").forEach((link) => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            scrollToContent(this, true);
        });
    });
})();
