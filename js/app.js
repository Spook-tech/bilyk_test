jQuery(document).ready(function($) {
   const html = $('html');
   const menu = $('.header__menu');
   const cart = $('.header__cart');
   const paymentMethods = $('.order-page__payment__methods');
   const paymentToggle = $('.order-page__payment__active-method');
   const cookieButtons = $('.cookie__button-accept, .cookie__button-reject');
   const orderEmail = $('#order-email');
   const popupEmail = $('#log-in__popup-email');
   const alert = $('.alert-block');

   const scrollWidth = getScrollWidth();

   $(document).on('click', function(e) {
      const target = e.target;

      if ($(target).is('.close-menu, .close-menu *')) {
         toggleMenu();
      }

      if ($(target).is('.header__menu__body') && !$(target).is('.header__menu')) {
         toggleMenu();
      }

      if ($(target).is('.header__cart, .header__cart *')) {
         toggleMenuCart();
      }

      if ($(target).is('.menu-cart__top__back, .menu-cart__top__back *')) {
         toggleMenuCart();
      }

      if ($(target).is('.menu-cart') && !$(target).is('.menu-cart-wrapper')) {
         toggleMenuCart();
      }
      if ($(target).is('.alert-block-close, .alert-block-close *')) {
         hideAlert();
      }

      if ($(target).is('.show-password-btn')) {
         e.preventDefault();
         const input = $(target).parent().find('.input-password');
         const type = input.attr('type');
         input.attr('type', type === 'password' ? 'text' : 'password');
      }

      if(target.id == 'empty-favourites-change-btn'){
         $('.empty-favourites').toggleClass('_active');
         $('.favourites').toggleClass('_active');
      }

      if ($(target).is('.cookie__button-accept, .cookie__button-reject')) {
         showMenuCookie();
      }
   });

   function getScrollWidth(){
      const div = $('<div>');
      div.css({
         overflowY: 'scroll',
         width: '50px',
         height: '50px',
      });
      $('body').append(div);
      const scrollWidth = div.width() - div.prop('clientWidth');
      div.remove();
      return scrollWidth;
   }
   function hideScrollBar() {
      $('body').css({
         paddingRight: parseInt($('body').css('paddingRight')) ? '0px' : scrollWidth + 'px',
      });
   }

   const swiper = new Swiper('.swiper', {
      pagination: {
         el: '.swiper-pagination',
      },
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
   });

   let toValidate = [];

   if (orderEmail.length) {
      toValidate.push(orderEmail);
   }
   if (popupEmail.length) {
      toValidate.push(popupEmail);
   }

   toValidate.forEach(input => input.on('input', function(e){
      const value = input.val();
      if (!validateEmail(value)){
         input.addClass('_error');
      }else{
         input.removeClass('_error');
      }
   }));

   const validateEmail = (email) => {
      return String(email)
      .toLowerCase()
      .match(
         /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
      );
   };

   // Объявляем функции для показа менюшек-попапов
   function toggleMenu(){
      const menuBurger = $(".header__burger");
      const headerMenu = $(".header__menu__body");

      menuBurger.toggleClass("active");
      headerMenu.toggleClass("active");
      $("html").toggleClass('lock');

      // Задаем боди padding в размере ширины скроллбара, чтоб все было красиво
      hideScrollBar();
   }
   function toggleMenuCart(){
      const button = $(".header__cart");
      const menu = $(".menu-cart");

      button.toggleClass("active");
      menu.toggleClass("active");
      $("html").toggleClass('lock');

      // Задаем боди padding в размере ширины скроллбара, чтоб все было красиво
      hideScrollBar();
   }
   function toggleMenuCookie(){
      const menu = $("#cookie-menu");
      
      menu.toggleClass("_active");
      $("html").toggleClass('lock');

      // Задаем боди padding в размере ширины скроллбара, чтоб все было красиво
      hideScrollBar();
   }
   function showAlert() {
      alert.css('transform', 'translate(0%,0)');
      setTimeout(hideAlert, 3000);
    
   }
   function hideAlert() {
     alert.css('transform', 'translate(0%,-200%)');
   }

   showAlert();
});