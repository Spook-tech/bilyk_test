jQuery(document).ready(function($) {
	// SPOLLERS
	var spollersArray = $('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		var spollersRegular = spollersArray.filter(function (index, item) {
			return !$(item).data('spollers').split(",")[0];
		});

		// Инициализация обычных слойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}

		// Получение слойлеров с медиа запросами
		var spollersMedia = spollersArray.filter(function (index, item) {
			return $(item).data('spollers').split(",")[0];
		});

		if (spollersMedia.length > 0) {
			var breakpointsArray = [];
			spollersMedia.each(function (index, item) {
				var params = $(item).data('spollers');
				var breakpoint = {};
				var paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});

			// Получаем уникальные брейкпоинты
			var mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});

			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach(function (breakpoint) {
				var paramsArray = breakpoint.split(",");
				var mediaBreakpoint = paramsArray[1];
				var mediaType = paramsArray[2];
				var matchMedia = window.matchMedia(paramsArray[0]);

				// Объекты с нужными условиями
				var spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addListener(function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}

		// Инициализация
		
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		

		function setSpollerAction(e, element) {
			let el;
			if (element) el = element;
			else el = $(e.target);
			if (el.attr('data-spoller') || el.closest('[data-spoller]').length) {
				const spollerTitle = el.attr('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.attr('data-one-spoller') ? true : false;
				if (!spollersBlock.find('._slide').length) {
					if (oneSpoller && !spollerTitle.hasClass('_active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.toggleClass('_active');
					if (element) spollerTitle.next().slideToggle(0);
					else spollerTitle.next().slideToggle(500);
				}
				e.preventDefault();
			}
		}

		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.find('[data-spoller]._active');
			if (spollerActiveTitle.length) {
				spollerActiveTitle.removeClass('_active');
				spollerActiveTitle.next().slideUp(500);
			}
		}
		//========================================================================================================================================================
		//SlideToggle
		let _slideUp = (target, duration = 500) => {
			if (!target.hasClass('_slide')) {
				target.addClass('_slide');
				target.css('transition-property', 'height, margin, padding');
				target.css('transition-duration', duration + 'ms');
				target.css('height', target.outerHeight() + 'px');
				target.outerHeight();
				target.css('overflow', 'hidden');
				target.css('height', 0);
				target.css('padding-top', 0);
				target.css('padding-bottom', 0);
				target.css('margin-top', 0);
				target.css('margin-bottom', 0);
				window.setTimeout(() => {
					target.hide();
					target.css('height', '');
					target.css('padding-top', '');
					target.css('padding-bottom', '');
					target.css('margin-top', '');
					target.css('margin-bottom', '');
					target.css('overflow', '');
					target.css('transition-duration', '');
					target.css('transition-property', '');
					target.removeClass('_slide');
				}, duration);
			}
		}
		let _slideDown = (target, duration = 500) => {
			if (!target.hasClass('_slide')) {
				target.addClass('_slide');
				if (target.is(':hidden')) {
					target.show();
				}
				let height = target.outerHeight();
				target.css('overflow', 'hidden');
				target.css('height', 0);
				target.css('padding-top', 0);
				target.css('padding-bottom', 0);
				target.css('margin-top', 0);
				target.css('margin-bottom', 0);
				target.outerHeight();
				target.css('transition-property', "height, margin, padding");
				target.css('transition-duration', duration + 'ms');
				target.css('height', height + 'px');
				target.css('padding-top', '');
				target.css('padding-bottom', '');
				target.css('margin-top', '');
				target.css('margin-bottom', '');
				window.setTimeout(() => {
					target.css('height', '');
					target.css('overflow', '');
					target.css('transition-duration', '');
					target.css('transition-property', '');
					target.removeClass('_slide');
				}, duration);
			}
		}
		let _slideToggle = (target, duration = 500) => {
			if (target.is(':hidden')) {
				return _slideDown(target, duration);
			} else {
				return _slideUp(target, duration);
			}
		}
		if ($('.order-page__item').length){
			const item = $('.order-page__item').eq(0).find('.order-page__title');
			setSpollerAction(0, item)
		}

	}

	//========================================================================================================================================================
	/*
	Для родителя слойлеров пишем атрибут data-spollers
	Для заголовков слойлеров пишем атрибут data-spoller
	Если нужно включать\выключать работу спойлеров на разных размерах экранов
	пишем параметры ширины и типа брейкпоинта.
	Например:
	data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
	data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px
		
	Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
	*/
});