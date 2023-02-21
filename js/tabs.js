jQuery(document).ready(function($) { 
   // TABS
   const $tabsArray = $('[data-tab]');
   const $contentArray = $('.tab-text');

   if ($tabsArray.length > 0) {
   $tabsArray.on('click', function() {
      const $this = $(this);
      const $tabText = $(`#tab-${$this.data('tab')}`);
      
      clearActiveTab($tabsArray);
      setTabAction($this, $tabText);
   });

   $contentArray.each(function() {
      const $this = $(this);
      const height = $this.height();
      $this.attr('data-height', height);
      
      if (!$this.hasClass('_active')) {
         $this.height(0);
      }
   });

   function setTabAction($tab, $text) { 
      $tab.toggleClass('_active');
      $text.addClass('_active');
      $text.height(parseInt($text.data('height')));
   }

   function clearActiveTab($tabs) {
      $tabs.removeClass('_active');
      $contentArray.removeClass('_active');
      $contentArray.height(0);
   }
   }
});