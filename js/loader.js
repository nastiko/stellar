class Loader {
    static showLoader(element, overlay = true) {
        let block = document.querySelector(element);

        if (block) {
            let loader = document.createElement('div');
            loader.className = 'loader';


            if (overlay) {
                let overlay = document.createElement('div');
                overlay.className = 'overlay';
                loader.appendChild(overlay);
            }

            let spinner = document.createElement('div');
            spinner.className = 'spinner';
            loader.appendChild(spinner)

            block.appendChild(loader);
        }
    }

    static hideLoader(element) {
        let block = document.querySelector(element + ' .loader');
        if (block) {
            block.remove();
        }
    }
}