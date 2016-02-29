(function () {
    var itemsToInject = [
        { tag: 'link', href: 'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css' },
        { tag: 'link', href: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-csp.css' },
        { tag: 'script', src: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.min.js' },
        { tag: 'script', src: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular-resource.min.js' },
        { tag: 'script', src: '/Scripts/widget.js' }
    ];
    var head = document.head;
    itemsToInject.forEach(function (item) {
        var el = document.createElement(item.tag);
        if (item.href) {
            el.setAttribute('href', item.href);
        }
        else if (item.src) {
            el.setAttribute('src', item.src);
        }
        head.appendChild(el);
    });
})();