class ValidationForm {
    #form;
    #email;
    #country;
    #firstName;
    #address;
    #flat;
    #postcode;

    #setDiscount = 'sale-25';
    #discount;
    #applyDiscountBtn;

    #validationResult = false;

    #formReview;
    #btnPayment;
    #blockPayment;
    #blockReview;
    #changeInfo;
    #infoLink;

    #sectionHighlighterBlock;
    #defaultPage;
    #nextInactiveSpan;

    #btnReturnToInfoPage;

    constructor(form,
                sectionHighlighterBlock,
                email = '#email',
                country = '#country',
                firstName = '#first-name',
                address = '#address',
                flat = '#flat',
                postcode = '#postcode',
                discount = 'discount',
                applyDiscountBtn = 'apply-discount',
                formReview = '#form-review',
                btnPayment = '#payment',
                blockPayment = '#payment-info',
                blockReview = '#block-review',
                changeInfo = '.link-point',
                infoLink = '#infoLink',
                defaultPage = '.default-page',
                nextInactiveSpan = '.page-highlighter_inactive',
                btnReturnToInfoPage = '#prev-highlighter_page') {
        this.#form = document.getElementById(form);
        this.#email = this.#form.querySelector(email);
        this.#country = this.#form.querySelector(country);
        this.#firstName = this.#form.querySelector(firstName);
        this.#address = this.#form.querySelector(address);
        this.#flat = this.#form.querySelector(flat);
        this.#postcode = this.#form.querySelector(postcode);
        this.#discount = document.getElementById(discount);
        this.#applyDiscountBtn = document.getElementById(applyDiscountBtn);

        this.#formReview = this.#form.querySelector(formReview);
        this.#btnPayment = this.#form.querySelector(btnPayment);
        this.#blockPayment = this.#form.querySelector(blockPayment);
        this.#blockReview = this.#form.querySelector(blockReview);
        this.#btnReturnToInfoPage = this.#form.querySelector(btnReturnToInfoPage)

        this.#sectionHighlighterBlock = document.getElementById(sectionHighlighterBlock);
        this.#defaultPage = this.#sectionHighlighterBlock.querySelector(defaultPage);
        this.#nextInactiveSpan = this.#sectionHighlighterBlock.querySelector(nextInactiveSpan);

        this.#changeInfo = this.#blockReview.querySelectorAll(changeInfo);
        this.#infoLink = this.#sectionHighlighterBlock.querySelector(infoLink);
    }

    getEmailValue() {
        return this.#email.value.trim();
    }

    getCountryValue() {
        return this.#country.value.trim();
    }

    getFirstNameValue() {
        return this.#firstName.value.trim();
    }

    getAddressValue() {
        return this.#address.value.trim();
    }

    getFlatValue() {
        return this.#flat.value.trim();
    }

    getPostcodeValue() {
        return this.#postcode.value.trim();
    }

    setError(elem, message) {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');

        this.#validationResult = false;
    }

    setSuccess(elem, message) {
        let inputControl = elem.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerHTML = message;
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    removeStyles() {
        let userValue = this.#discount.value;

        // Discount input
        if (userValue === '') {
            let inputControl = this.#discount.parentElement;
            let errorDisplay = inputControl.querySelector('.error');

            errorDisplay.innerHTML = '';
            inputControl.classList.remove('success');
            inputControl.classList.remove('error');
        }
    }


    // Email input
    isValidEmail() {
        return this.#email.value.toLowerCase().match(
            /^[^]+\@[a-zA-z]+\.[a-zA-Z]{2,4}$/);
    }

    validationInput() {
        this.#validationResult = true;

        // Email
        if (this.getEmailValue() === '') {
            this.setError(this.#email, 'Email is required');
        } else if (!this.isValidEmail(this.#email)) {
            this.setError(this.#email, 'Provide a valid email address');
        } else {
            this.setSuccess(this.#email, '');
        }

        //Country
        if (this.getCountryValue() === '') {
            this.setError(this.#country, 'Country is required');
        } else if (this.getCountryValue().length < 2) {
            this.setError(this.#country, 'Country must be at least 2 character.');
        } else {
            this.setSuccess(this.#country, '');
        }

        // First Name
        if (this.getFirstNameValue() === '') {
            this.setError(this.#firstName, 'Name is required');
        } else {
            this.setSuccess(this.#firstName, '');
        }

        // Address
        if (this.getAddressValue() === '') {
            this.setError(this.#address, 'Address is required');
        } else if (this.getAddressValue().length < 5) {
            this.setError(this.#address, 'Address must be at least 5 character.');
        } else {
            this.setSuccess(this.#address, '');
        }

        // Flat
        if (this.getFlatValue() === '') {
            this.setError(this.#flat, 'Flat is required');
        } else {
            this.setSuccess(this.#flat, '');
        }

        // Postcode
        if (this.getPostcodeValue() === '') {
            this.setError(this.#postcode, 'Postcode is required');
        } else {
            this.setSuccess(this.#postcode, '');
        }

        return this.#validationResult;
    }

    applyDiscount(event) {
        let userValue = this.#discount.value;
        if (userValue === this.#setDiscount) {
            this.setSuccess(this.#discount, 'Discount is successful!');
        } else {
            this.setError(this.#discount, 'Discount is not successful!');
        }

        event.preventDefault();
    }

    // add hidden payment block
    togglePaymentBlock() {
        this.#blockPayment.classList.toggle('active-block');
        this.#blockReview.classList.toggle('active-block');

        this.#formReview.style.display = 'none';

        this.getHighlighterPage();
    }

    // get color:black of the current page when payment block appears
    getHighlighterPage() {
        this.#defaultPage.classList.remove('default-page');
        this.#defaultPage.classList.add('prev-link');

        this.#nextInactiveSpan.classList.remove('page-highlighter_inactive');
        this.#nextInactiveSpan.classList.add('default-page');
    }

    // make the prev link of the previous page color:grey
    getPrevHighlighterPage(event) {
        event.preventDefault();
        this.#nextInactiveSpan.classList.add('page-highlighter_inactive');
        this.#nextInactiveSpan.classList.remove('default-page');

        this.#defaultPage.classList.add('default-page');
        this.#defaultPage.classList.remove('prev-link');

        this.#blockPayment.classList.toggle('active-block');
        this.#blockReview.classList.toggle('active-block');
        this.#formReview.style.display = 'block';
    }

    handleSubmit(event) {
        event.preventDefault();

        //validate? true / false
        if (!this.validationInput()) {
            return;
        }

        this.togglePaymentBlock();
    }

    init() {
        this.#applyDiscountBtn.addEventListener('click', (event) => this.applyDiscount(event));
        this.#discount.addEventListener('keyup', () => this.removeStyles());
        this.#email.addEventListener('keyup', () => this.removeStyles());

        this.#btnPayment.addEventListener('click', (event) => this.handleSubmit(event));

        this.#btnReturnToInfoPage.addEventListener('click', (event) => this.getPrevHighlighterPage(event));

        this.#infoLink.addEventListener('click', (event) => this.getPrevHighlighterPage(event));

        for (let i = 0; i < this.#changeInfo.length; i++) {
            this.#changeInfo[i].addEventListener('click', (event) => this.getPrevHighlighterPage(event));
        }
    }
}