/**
Core script to handle the entire layout and base functions
**/

define(['jquery'], function($) {
  if (!window.PAGE_NAV_DATA) {
    return
  }
  
  var headerFrage = '<a href="#" class="nav-item logo">零售通运营</a>'
  PAGE_NAV_DATA.map(function(level1Node) {
    var activeClass = level1Node.active ? 'selected' : ''
    headerFrage += '<a href="' + level1Node.url + '" class="nav-item ' + activeClass + '">' + level1Node.name + '</a>'
  });

  $('.home-header').html(headerFrage)
});
