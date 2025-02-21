// Showing more information when click on 'Description', 'Shipping' and 'Review' block and change rotation icons.
class ProductInfo {

    #mainBlock;
    #descriptionBtn;
    #accordionContent;
    #iconsTransform;

    constructor(mainBlock, descBtnClass = '.btn-description_info', accordionContent = '.accordion-content', iconsTransform = '.icon') {
        this.#mainBlock = document.querySelector(mainBlock);
        this.#descriptionBtn = descBtnClass;
        this.#iconsTransform = iconsTransform;
        this.#accordionContent = accordionContent;
    }

    toggleVisible(element) {
        let content = element.parentNode.querySelector(this.#accordionContent);
        let icon = element.parentNode.querySelector(this.#iconsTransform);

        content.classList.toggle('visible');
        icon.classList.toggle('rotate');
    }

    init() {
        let buttons = this.#mainBlock.querySelectorAll(this.#descriptionBtn);
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', () => this.toggleVisible(buttons[i]));
        }
    }
}


// PopUp of the size guide
class PopUp {
    #popUp;
    #linkPopUp;
    #closePopUp;

    constructor(popUpClass, closePopUpBtn, linkPopUpClass) {
        this.#popUp = document.querySelector(popUpClass);
        this.#linkPopUp = document.querySelector(linkPopUpClass);
        this.#closePopUp = this.#popUp.querySelector(closePopUpBtn);
    }

    showPopUp() {
        this.#popUp.classList.add('active');
    }

    closePopUp() {
        this.#popUp.classList.remove('active');
    }

    init() {
        this.#linkPopUp.addEventListener('click', () => this.showPopUp());
        this.#closePopUp.addEventListener('click', () => this.closePopUp());
    }
}


// Toggle images and all previews images
class ShowDiffStyle {

    #imgsSample;
    #imgActive;
    #imgTemplate;

    constructor(imgsSample, imgActive, imgTemplate) {
        this.#imgsSample = document.getElementsByClassName(imgsSample);
        this.#imgActive = document.getElementsByClassName(imgActive);
        this.#imgTemplate = document.querySelector(imgTemplate);
    }

    show(event) {
        if (this.#imgActive.length > 0) {
            this.#imgActive[0].classList.remove('active');
        }

        this.#imgTemplate.classList.add('active');
        this.#imgTemplate.src = event.target.dataset.image;
    }

    init() {
        for (let i = 0; i < this.#imgsSample.length; i++) {
            this.#imgsSample[i].addEventListener('click', (event) => this.show(event));
        }
    }
}