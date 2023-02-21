jQuery(document).ready(function($) { 
    const popupLinks = $(".popup-link"),
    body = $("html"),
    lockPadding = $(".lock-padding");
    let unlock = true;
    const timeout = 500;

    if (popupLinks.length > 0) {
        popupLinks.on("click", function (event) {
            event.preventDefault();
            const id = $(this).attr("href").replace("#", "");
            const popup = $("#" + id);
            popupOpen(popup);
        });
    }

    const popupCloseIcon = $(".close-popup");
    if (popupCloseIcon.length > 0) {
        popupCloseIcon.on("click", function (event) {
            event.preventDefault();
            popupClose($(this).closest(".popup"));
        });
    }

    function popupOpen(popup) {
        if (popup && unlock) {
            const currentPopup = $(".popup.open");
            if (currentPopup) {
                popupClose(currentPopup, false);
            } else {
                bodyLock();
            }
            popup.addClass("open");
            popup.on("click", function (event) {
                if (!$(event.target).closest(".popup__content").length) {
                    popupClose($(this));
                }
            });
        }
    }

    function popupClose(popup, unlock = true) {
        if (unlock) {
            popup.removeClass("open");
            bodyUnLock();
        }
    }

    function bodyLock() {
        const paddingRight = window.innerWidth - $("body").outerWidth();
        if (lockPadding.length > 0) {
            lockPadding.each(function () {
                $(this).css("padding-right", paddingRight + "px");
            });
        }
        body.css("padding-right", paddingRight + "px");
        body.addClass("lock");
        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                lockPadding.each(function () {
                    $(this).css("padding-right", "0px");
                });
            }
            body.css("padding-right", "0px");
            body.removeClass("lock");
        }, timeout);
    }

    $(document).on("keydown", function (event) {
        if (event.which === 27) {
            const currentPopup = $(".popup.open");
            if (currentPopup) {
                popupClose(currentPopup);
            }
        }
    });

    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                const matches = (this.document || this.ownerDocument).querySelectorAll(s);
                let i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            let el = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

});