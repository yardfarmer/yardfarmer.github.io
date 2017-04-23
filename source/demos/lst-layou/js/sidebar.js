/**
Core script to handle the entire layout and base functions
**/

define(['jquery', 'util/template/2.0'], function($, Template) {
  var handleSidebarAndContentHeight = function() {
    var content = $('.page-content');
    var sidebar = $('.page-sidebar');
    var body = $('body');
    var height;

    if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
      var available_height = $(window).height() - $('.footer').height();
      if (content.height() < available_height) {
        content.attr('style', 'min-height:' + available_height + 'px !important');
      }
    } else {
      if (body.hasClass('page-sidebar-fixed')) {
        height = _calculateFixedSidebarViewportHeight();
      } else {
        height = sidebar.height() + 20;
      }
      if (height >= content.height()) {
        content.attr('style', 'min-height:' + height + 'px !important');
      }
    }
  }

  var handleSidebarMenu = function() {
    $('.page-sidebar').on('click', 'li > a', function(e) {
      if ($(this).next().hasClass('sub-menu') == false) {
        if ($('.btn-navbar').hasClass('collapsed') == false) {
          $('.btn-navbar').click();
        }
        return;
      }

      var parent = $(this).parent().parent();

      parent.children('li.open').children('a').children('.arrow').removeClass('open');
      parent.children('li.open').children('.sub-menu').slideUp(200);
      parent.children('li.open').removeClass('open');

      var sub = $(this).next();
      if (sub.is(":visible")) {
        $('.arrow', $(this)).removeClass("open");
        $(this).parent().removeClass("open");
        sub.slideUp(200, function() {
          handleSidebarAndContentHeight();
        });
      } else {
        $('.arrow', $(this)).addClass("open");
        $(this).parent().addClass("open");
        sub.slideDown(200, function() {
          handleSidebarAndContentHeight();
        });
      }

      e.preventDefault();
    });
  }

  var _calculateFixedSidebarViewportHeight = function() {
    var sidebarHeight = $(window).height() - $('.header').height() + 1;
    if ($('body').hasClass("page-footer-fixed")) {
      sidebarHeight = sidebarHeight - $('.footer').height();
    }

    return sidebarHeight;
  }

  var handleSidebarToggler = function() {
    // handle sidebar show/hide
    $('.page-sidebar').on('click', '.sidebar-toggler', function(e) {
      var body = $('body');
      var sidebar = $('.page-sidebar');

      if ((body.hasClass("page-sidebar-hover-on") && body.hasClass('page-sidebar-fixed')) || sidebar.hasClass('page-sidebar-hovering')) {
        body.removeClass('page-sidebar-hover-on');
        sidebar.css('width', '').hide().show();
        e.stopPropagation();
        return;
      }

      $(".sidebar-search", sidebar).removeClass("open");

      if (body.hasClass("page-sidebar-closed")) {
        body.removeClass("page-sidebar-closed");
        if (body.hasClass('page-sidebar-fixed')) {
          sidebar.css('width', '');
        }
      } else {
        body.addClass("page-sidebar-closed");
      }
    });

    // handle the search bar close
    $('.page-sidebar').on('click', '.sidebar-search .remove', function(e) {
      e.preventDefault();
      $('.sidebar-search').removeClass("open");
    });

    // handle the search query submit on enter press
    $('.page-sidebar').on('keypress', '.sidebar-search input', function(e) {
      if (e.which == 13) {
        window.location.href = "extra_search.html";
        return false; //<---- Add this line
      }
    });

    // handle the search submit
    $('.sidebar-search .submit').on('click', function(e) {
      e.preventDefault();

      if ($('body').hasClass("page-sidebar-closed")) {
        if ($('.sidebar-search').hasClass('open') == false) {
          if ($('.page-sidebar-fixed').size() === 1) {
            $('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
          }
          $('.sidebar-search').addClass("open");
        } else {
          window.location.href = "extra_search.html";
        }
      } else {
        window.location.href = "extra_search.html";
      }
    });
  }

  handleSidebarMenu(); // handles main menu
  handleSidebarToggler(); // handles sidebar hide/show 
});
