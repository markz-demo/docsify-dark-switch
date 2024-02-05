
(function () {
    var className = 'docsify-dark-switch';
    var key = 'DOCSIFY_DARK_SWITCH';
    var buttonHtml = `
<button type="button" role="switch" title="" aria-checked="false">
    <span class="check">
        <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="sun">
                <path d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"></path>
                <path d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"></path>
                <path d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"></path>
                <path d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"></path>
                <path d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"></path>
                <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
                <path d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path>
                <path d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"></path>
                <path d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" class="moon">
                <path d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"></path>
            </svg>
        </span>
    </span>
</button>
`;
    var defaultOptions = {
        debug: false,
        fixed: false,
        style: undefined, // default: { top: '25px', right: '60px' },
    };
    var isDark = localStorage.getItem(key) === 'true';

    var config = {
        get hasNav() { return !!window.$docsify.loadNavbar; },
        get hasBadge() { return !!window.$docsify.repo; },
        get debug() { return getConfig('debug') === true; },
        get fixed() { return getConfig('fixed') === true; },
        get style() { return getConfig('style'); },
    };

    function getConfig(name) {
        var c = window.$docsify.darkSwitch;
        if (c && c[name] !== undefined) {
            return c[name];
        }
        return defaultOptions[name];
    }
    function init() {
        if (!window.Docsify.dom.find('.' + className)) {
            var content = window.Docsify.dom.create('div', buttonHtml);
            window.Docsify.dom.toggleClass(content, 'add', className);
            if (!config.hasNav) {
                window.Docsify.dom.toggleClass(content, 'add', 'no-nav');
            }
            if (!config.hasBadge) {
                window.Docsify.dom.toggleClass(content, 'add', 'no-badge');
            }
            if (config.fixed) {
                window.Docsify.dom.toggleClass(content, 'add', 'fixed');
            }
            if (config.style) {
                for (var key in config.style) {
                    content.style[key] = config.style[key];
                }
            }
            window.Docsify.dom.before(document.body, content);

            var button = content.querySelector('button');
            window.Docsify.dom.on(button, 'click', click);
        }
        toggle();
    }
    function click() {
        isDark = !isDark;
        localStorage.setItem(key, isDark);
        toggle();
    }
    function toggle() {
        var content = window.Docsify.dom.find('.' + className);
        var button = window.Docsify.dom.find('.' + className + '>button');
        if (content && button) {
            if (isDark) {
                button.title = "Switch to light theme";
                button.setAttribute('aria-checked', "true");
                window.Docsify.dom.toggleClass(content, 'add', 'dark');
            }
            else {
                button.title = "Switch to dark theme";
                button.setAttribute('aria-checked', "false");
                window.Docsify.dom.toggleClass(content, 'remove', 'dark');
            }
            content.querySelector('svg.sun').style.display = isDark ? 'none' : 'block';
            content.querySelector('svg.moon').style.display = !isDark ? 'none' : 'block';
        }

        window.Docsify.dom.toggleClass(document.documentElement, isDark ? 'add' : 'remove', 'dark');

        var lightSheet = window.Docsify.dom.find('[rel="stylesheet"][title="light"]');
        var darkSheet = window.Docsify.dom.find('[rel="stylesheet"][title="dark"]');
        if (!lightSheet || !darkSheet) {
            !lightSheet && config.debug && console.warn('Can not found stylesheet named "light", please check the documentation.')
            !darkSheet && config.debug && console.warn('Can not found stylesheet named "dark", please check the documentation.')
            return;
        }

        lightSheet.disabled = darkSheet.disabled = true;
        (isDark ? darkSheet : lightSheet).disabled = false;
    }
    // toggle();

    function plugin(hook, vm) {
        hook.mounted(function () {
            init();
        })
        // hook.doneEach(function () {
        //     init();
        // })
    }


    if (!window.$docsify) {
        window.$docsify = {}
    }

    window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins)
})();