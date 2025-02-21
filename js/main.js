//sliders
class Sliders {

    #slideWidth;
    #slideCount;
    #slideContainer;
    #nextBtn;
    #prevBtn;
    #dots;

    #slideShown = 1;

    constructor(slideWidth, slideCount, slideContainer, nextBtn, prevBtn, dots) {
        this.#slideWidth = slideWidth;
        this.#slideCount = slideCount;
        this.#slideContainer = slideContainer;
        this.#nextBtn = nextBtn;
        this.#prevBtn = prevBtn;
        this.#dots = dots;
    }

    move(direction, slideSelected = 0) {
        let currPos = this.#slideContainer.getBoundingClientRect().left;
        let shiftSlides = 1;

        if (direction === 'selected') {
            // if dot selected is for the current slide - do nothing
            if (this.#slideShown === slideSelected) {
                return;
            } else {
                // define shift direction
                direction = this.#slideShown > slideSelected ? 'right' : 'left';
            }
            // calculate number of slides to shift
            shiftSlides = Math.abs(this.#slideShown - slideSelected);
        }

        let shiftPixel = this.#slideWidth * (direction === 'left' ? -shiftSlides : shiftSlides);


        if (direction === 'right' && this.#slideShown <= 1) {
            this.move('selected', this.#slideCount);
            return;
        } else if (direction === 'left' && this.#slideCount - this.#slideShown <= 0) {
            this.move('selected', 1);
            return;
        } else {
            this.#slideShown += direction === 'left' ? shiftSlides : -shiftSlides;
        }
        this.#slideContainer.style.left = (currPos + shiftPixel).toString() + 'px';

        for (let i = 0; i < this.#dots.length; i++) {
            this.#dots[i].classList.remove('current-slide');
        }
        this.#dots[this.#slideShown - 1].classList.add('current-slide');
    }

    init(slideWidthClass, slideCountClasses, slideContainerClass, nextBtnId, PrevBtnId, dotsClass) {
        this.#slideWidth = document.querySelector(slideWidthClass).getBoundingClientRect().width;
        this.#slideCount = document.querySelectorAll(slideCountClasses).length;
        this.#slideContainer = document.querySelector(slideContainerClass);
        this.#nextBtn = document.getElementById(nextBtnId);
        this.#prevBtn = document.getElementById(PrevBtnId);
        this.#dots = document.getElementsByClassName(dotsClass);

        this.#nextBtn.addEventListener('click', () => this.move('left'));
        this.#prevBtn.addEventListener('click', () => this.move('right'));
        for (let i = 0; i < this.#dots.length; i++) {
            this.#dots[i].addEventListener('click', () => this.move('selected', i + 1));
        }
    }
}

class BlockSlider {

    #slides;
    #sliderBlock;
    #sliderContainer;

    #clickBtns;

    #currPosition = 0;

    constructor(slides, sliderBlock, sliderContainer, clickBtns) {
        this.#slides = slides;
        this.#sliderBlock = sliderBlock;
        this.#sliderContainer = sliderContainer;
        this.#clickBtns = clickBtns;
    }

    isInViewport(element) {
        let positionViewportRight = this.#sliderBlock.clientWidth;

        if (element.getBoundingClientRect().left < 0) {
            return false;
        } else if (element.getBoundingClientRect().left >= positionViewportRight) {
            return false;
        } else {
            return true;
        }
    }

    getElementWidth(element, withMargin = true, withPadding = true, withBorder = true) {
        let style = element.currentStyle || window.getComputedStyle(element),
            width = element.offsetWidth, // or use style.width
            margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
            padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
            border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

        return width - (withPadding ? padding : 0) + (withBorder ? border : 0) + (withMargin ? margin : 0);
    }

    // Get width only one slide
    getSlideWidth(withMargin = true, withPadding = true, withBorder = true) {
        let element = document.querySelector('.block-img');
        return this.getElementWidth(element, withMargin, withPadding, withBorder);
    }

    // Get width only one slide
    getSlideGap() {
        return this.getSlideWidth() - this.getSlideWidth(false);
    }

    move(direction) {
        let shiftPixel = this.getSlideWidth() * (direction === 'left' ? 1 : -1);

        if (direction === 'right' && this.isInViewport(this.#slides[this.#slides.length - 1])) {
            return;
        } else if (direction === 'left' && this.isInViewport(this.#slides[0])) {
            return;
        }

        let currPos = this.#currPosition * this.getSlideWidth();
        this.#sliderContainer.style.transform = `translateX(${currPos + shiftPixel}px)`;
        this.#currPosition += direction === 'left' ? 1 : -1;
    }

    init(wrapperClass, allSlides = '.block-img', hiddenContentClass = '.carousel-imgs', clickBtnsClass = '.click-btn') {
        this.#sliderBlock = document.querySelector(wrapperClass);
        this.#slides = this.#sliderBlock.querySelectorAll(allSlides);
        this.#sliderContainer = this.#sliderBlock.querySelector(hiddenContentClass);
        this.#clickBtns = this.#sliderBlock.parentElement.querySelectorAll(clickBtnsClass);

        this.calculateWidth();

        for (let i = 0; i < this.#clickBtns.length; i++) {
            this.#clickBtns[i].addEventListener('click', () => this.move(this.#clickBtns[i].dataset.direction));
        }
    }

    calculateWidth() {
        let innerWidth = this.#sliderBlock.closest('.width-container').clientWidth - this.getSlideGap();
        let slidesCount = Math.floor((innerWidth - this.getSlideGap()) / this.getSlideWidth());
        let sliderWidth = (slidesCount <= 0 ? 1 : slidesCount) * this.getSlideWidth() - this.getSlideGap();
        this.#sliderBlock.setAttribute('style', `width: ${sliderWidth}px`);

        let sliderHiddenContentWidth = (this.#slides.length * this.getSlideWidth());
        this.#sliderContainer.setAttribute('style', `width: ${sliderHiddenContentWidth}px`);
    }
}

class Utilities {
    //change header discount
    changeDiscount() {
        function change() {
            document.getElementById('fadeEl').setAttribute('class', 'text-fade');

            setTimeout(() => {
                document.getElementById('fadeEl').innerHTML = `${arrDiscount[i++]}`;
                document.getElementById('fadeEl').setAttribute('class', 'text-show');
            }, 900);

            if (i >= arrDiscount.length) {
                i = 0;
            }
        }

        let arrDiscount = [50, 70, 30];
        let i = 0;

        setInterval(change, 2000);
    }

    //scrollUp button
    scrollUp() {
        let btn = document.getElementById('up-click');

        window.onscroll = () => window.scrollY > 250 ? btn.style.opacity = '1' : btn.style.opacity = '0';

        btn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    //Initialize tooltips
    tooltips() {
        let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    init() {
        this.tooltips();
        this.scrollUp();
        this.changeDiscount();
    }
}

class Products {

    #type;
    #itemTemplate;
    #discountTemplate;
    #discountTimerTemplate;
    #mainBlock;
    #category;
    #skipItems;
    #limitItems;
    #pagination = '.pagination-position .pagination';
    #imageContainer = '.img-container';


    constructor(mainBlock, limitItems, skipItems, category, type = 'default') {
        this.#limitItems = limitItems;
        this.#skipItems = skipItems;
        this.#mainBlock = mainBlock;
        this.#category = category;
        this.#type = type;
    }

    /**
     * Render products block
     */
    async renderProducts() {
        // show loader spinner
        Loader.showLoader(this.#mainBlock, false);

        // init variables
        let content = '';
        let mainBlockEl = document.querySelector(this.#mainBlock);
        let dataContainer = document.createElement('div');

        // get products
        let result = await API.getProducts(this.#limitItems, this.#skipItems, this.#category);


        // render each product template
        for (let item of result) {
            let template = await this.getProductTemplate(this.#type, item.name, item.price, item.images[0], item.id, item.discount, item.discount_date_end);
            content += template;
        }

        // paste all items HTML into container on the page
        let dataContainerClass = '';
        dataContainer.innerHTML = content;
        switch (this.#type) {
            case "favourites":
                dataContainerClass = 'grid-container';
                break;
            case "hot":
            case "default":
                dataContainerClass = 'grid-basic_container';
                break;
        }
        dataContainer.className = dataContainerClass;
        mainBlockEl.querySelector(`.${dataContainerClass}`) ? mainBlockEl.querySelector(`.${dataContainerClass}`).remove() : '';
        mainBlockEl.appendChild(dataContainer);

        // apply sales block to our main product block
        this.applyDiscount(mainBlockEl);

        // apply sale timer block to our main product block
        this.applyDiscountTimer(mainBlockEl);

        // add to cart button events
        Cart.init(mainBlockEl);

        // hide loader
        Loader.hideLoader(this.#mainBlock);
    }

    /**
     * Load individual product HTML template
     *
     * @param {string} type     Block type
     * @param {string} title    Product title
     * @param {int} price       Product price
     * @param {string} img      Product image
     * @param {int} id          Product id
     * @param {int} discount    Product discount percent
     * @param {string} timer    Product discount date end
     */
    async getProductTemplate(type, title, price, img, id, discount, timer) {
        let template;
        let sale;

        if (!this.#itemTemplate) {
            switch (type) {
                case 'hot':
                    template = 'template/hot_list.html';
                    break;
                case 'favourites':
                    template = 'template/jewellery_favourites.html';
                    break;
                default:
                case 'default':
                    template = 'template/product_item.html';
                    break;
            }
            let response = await fetch(template);
            this.#itemTemplate = await response.text();
        }

        if (discount > 0) {
            sale = 1;
            price = Math.round(price * 0.01 * (100 - discount));
        } else {
            sale = 0;
            discount = 0;
        }
        if (!timer) timer = '0';

        template = this.#itemTemplate;
        template = template.replaceAll('VAR_TITLE', title);
        template = template.replaceAll('VAR_ID', id);
        template = template.replaceAll('VAR_PRICE', price.toString());
        template = template.replaceAll('VAR_IMG', img);
        template = template.replaceAll('VAR_SALE', sale);
        template = template.replaceAll('VAR_DISCOUNT', discount.toString());
        template = template.replaceAll('VAR_TIMER', timer);

        return template;
    }

    /**
     * Adding pagination for the current product block
     */
    async addPaginationNumbers() {
        let pagesCount = Math.ceil(await API.getAllProductsCount(this.#category) / this.#limitItems);
        let content = document.createElement('div');

        // add prev button
        content.appendChild(this.getNavButton());

        // pass through the pagination and show active page
        for (let i = 1; i <= pagesCount; i++) {
            // create element for pagination
            let pageNumber = document.createElement('div');
            pageNumber.className = 'pagination-number' + (i === 1 ? ' active' : '');
            pageNumber.innerHTML = i.toString();
            pageNumber.dataset.index = i.toString();

            // adding click event on each pagination element
            this.addEventHandleActivePageNumber(pageNumber);

            // save generated page element
            content.appendChild(pageNumber);
        }

        // add next button
        content.appendChild(this.getNavButton(false));

        // paste pagination inside main element on the page
        content.className = 'pagination-numbers';
        let paginationEl = document.querySelector(this.#pagination);
        paginationEl.appendChild(content);
    }

    addEventHandleActivePageNumber(pageNumber) {
        pageNumber.addEventListener('click', (event) => {
            // get current page number and clear previous selection
            pageNumber = event.target;
            pageNumber.parentElement.querySelector('.active').classList.remove('active');
            pageNumber.classList.add('active');

            // re-render products on the page
            this.#skipItems = (pageNumber.dataset.index - 1) * this.#limitItems;
            this.renderProducts();
        });
    }

    getNavButton(prev = true) {
        // add prev button
        let elSpan = document.createElement('span');
        let elBtn = document.createElement('div');
        let elA = document.createElement('a');

        elA.className = 'page-link p-0';
        elBtn.className = 'page-item';
        elSpan.className = prev ? 'prev-icon' : 'next-icon';
        elBtn.dataset.btn = prev ? 'prev-btn' : 'next-btn';

        elA.appendChild(elSpan);
        elBtn.appendChild(elA);

        elBtn.addEventListener('click', () => {
            let element = document.querySelector(this.#pagination).querySelector('div .active');
            element = prev ? element.previousElementSibling : element.nextElementSibling;

            if (!element || (element && element.className !== 'pagination-number')) {
                return;
            }

            // trigger click on the element
            element.click();
        });

        return elBtn;
    }

    async applyDiscount(imageBlockEl) {
        let template;

        if (!this.#discountTemplate) {
            let response = await fetch('template/discount.html');
            this.#discountTemplate = await response.text();
        }

        let items = imageBlockEl.querySelectorAll("div[data-sale='1']");

        for (let item of items) {
            template = this.#discountTemplate;
            template = template.replaceAll('VAR_DISCOUNT', item.dataset.discount);
            let imageBlockEl = item.querySelector(this.#imageContainer);
            imageBlockEl.innerHTML += template;
        }
    }

    async applyDiscountTimer(imageBlockEl) {

    }
}

class Product {
    #color;
    #price;
    #title;
    #image;
    #preview;
    #category;
    #description;
    #sdescription;

    constructor(
        color = 'product-color',
        price = 'product-price',
        title = 'product-title',
        image = 'product-image',
        preview = 'product-preview',
        category = 'product-category',
        description = 'product-description',
        sdescription = 'product-short-description'
    ) {
        this.#color = document.getElementById(color);
        this.#price = document.getElementById(price);
        this.#title = document.getElementById(title);
        this.#image = document.getElementById(image);
        this.#preview = document.getElementById(preview);
        this.#category = document.getElementById(category);
        this.#description = document.getElementById(description);
        this.#sdescription = document.getElementById(sdescription);
    }

    /**
     *
     * @param previewInstance
     * @returns {Promise<void>}
     */
    async updateProductPageData(previewInstance) {
        let urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get('id');
        let productData = await this.getProductById(productId);

        if (this.#color) {
            this.#color.innerHTML = productData.color;
        }

        if (this.#price) {
            this.#price.innerHTML = productData.price;
        }

        if (this.#image) {
            this.#image.src = productData.images[0];
        }

        if (this.#title) {
            this.#title.innerHTML = productData.name;
        }

        if (this.#preview) {
            let img;
            this.#preview.innerHTML = '';

            // walk through all preview array images, generate HTML elements
            // add generated img elements on the page
            for (let i = 0; i < productData.preview.length; i++) {
                img = document.createElement('img');
                img.src = productData.preview[i];
                img.dataset.image = productData.images[i];
                img.className = 'sample-img' + (i === 1 ? ' active' : '');
                img.alt = `Load image into Gallery viewer, ${productData.name}`;
                this.#preview.appendChild(img);
            }

            // initialise preview click events
            previewInstance.init();
        }

        if (this.#category) {
            this.#category.innerHTML = productData.categories.join(', ');
        }

        if (this.#description) {
            this.#description.innerHTML = productData.description;
        }

        if (this.#sdescription) {
            this.#sdescription.innerHTML = productData.short_description;
        }
    }

    async getProductById(id) {
        return await API.getProduct(id);
    }
}


class API {
    static API_SEARCH = 'https://anastasia-web.dev/api/products/search';
    static API_GET = 'https://anastasia-web.dev/api/products/get';

    static async getProducts(limitItems, skipItems, category) {
        // initialise cache if not yet ready
        let cache = await caches.open('products_api');

        // prepare query params
        let params = {};
        if (skipItems) params.skip = skipItems;
        if (category) params.category = category;
        if (limitItems) params.limit = limitItems;
        let urlParams = new URLSearchParams(params).toString();
        let url = `${this.API_SEARCH}?${urlParams}`;

        let response = await cache.match(url);
        if (!response) {
            // add caching for API requests
            await cache.add(url);
            // get fetch result
            response = await cache.match(url);
        }

        return response.json();
    }

    static async getAllProductsCount(category = false) {
        let totalItems = await API.getProducts(false, false, category);
        return totalItems.length;
    }

    static async getProduct(id) {
        // check given ID
        id = Number(id);
        if (!id || id <= 0) id = 1;

        // initialise cache if not yet ready
        let cache = await caches.open('products_api');

        // prepare query params
        let url = `${this.API_GET}/${id}`;

        let response = await cache.match(url);
        if (!response) {
            // add caching for API requests
            await cache.add(url);
            // get fetch result
            response = await cache.match(url);
        }

        return response.json();
    }
}