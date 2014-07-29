// JavaScript Document

$(document).ready(function() {
      $('#navigation-menu a[href^="#"]').click(function() {
          var target = $(this.hash);
          if (target.length == 0) target = $('#navigation-menu a[name="' + this.hash.substr(1) + '"]');
          if (target.length == 0) target = $('html');
          $('html, body').animate({ scrollTop: target.offset().top }, 500);
          return false;
      });
  });

