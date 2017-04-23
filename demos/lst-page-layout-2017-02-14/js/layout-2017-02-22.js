/**
零售通供应链 portal layout
**/

define(['jquery', 'util/template/2.0', 'fui/tip/1.0'], function($, Template, Tip) {
  var handleSidebarAndContentHeight = function() {
    var content = $('.page-content');
    var sidebar = $('.page-sidebar');
    var iframeContent = $('#page-content-iframe');
    var body = $('body');
    var height;
    var availableHeight = $(window).height() - 82;
    var viewportWidth = $(window).width();

    content.attr('style', 'min-height:' + availableHeight + 'px !important');

    if (iframeContent) {
      var ifrmeHeight = availableHeight - 4;
      iframeContent.attr('style', 'height:' + ifrmeHeight + 'px !important');
    }
  };

  var handleOnResize = function() {
    var resize;
    $(window).resize(function() {
      if (resize) {
        clearTimeout(resize);
      }
      resize = setTimeout(function() {
        handleSidebarAndContentHeight();
      }, 50);
    });
  };

  var handleSidebarHeight = function() {
    var sidebar = $('.page-sidebar');
    var sideBarHeight = $(document.body).height() - 10;

    sidebar.attr('style', 'height:' + sideBarHeight + 'px !important');
  };

  var throttle = function ( fn, interval ) {
    var self = fn;
    var timer;
    var firstTime = true; // 是否是第一次调用

    return function () {
      var args = arguments;
      var that = this;
      
      if ( firstTime ) { // 如果是第一次调用，不需延迟执行
        self.apply(that, args);
        
        return firstTime = false;
      }

      if ( timer ) { // 如果定时器还在，说明前一次延迟执行还没有完成
        return false;
      }

      timer = setTimeout(function () { // 延迟一段时间执行
        clearTimeout(timer);
        timer = null;
        self.apply(that, args);
      }, interval || 500 );
    };
  };

  var handScroll = function() {
    $(window).scroll(throttle(function () {
      handleSidebarHeight();
    }, 200 ));
  };

  /**
   * Head Nav Bar
   */

  function joinBrandMenuTemplate() {
    if (!window.PAGE_MALLS) {
      return '';
    }

    var template = '';
    var mainBrand = '';
    var subBrand = '';
    var withSubmenuClass = '';

    if (Array.isArray(PAGE_MALLS)) {
      if (PAGE_MALLS.length) {
        var hasSubBrand = PAGE_MALLS.length > 1;
        withSubmenuClass = hasSubBrand ? 'with-submenu' : 'no-submenu';

        PAGE_MALLS.some(function(brand, idx) {
          if (brand.active) {
            mainBrand += '<li data-href="' + brand.href + '" data-code="' + brand.code + '">' + brand.name + '</li>';
          }
        })

        mainBrand = '<h1 class="brand-title ' + withSubmenuClass +'">' +mainBrand + '</h1>';

        PAGE_MALLS.map(function(brand, idx) {
          if (!brand.active) {
            subBrand += '<li data-href="' + brand.href + '" data-code="' + brand.code + '">' + brand.name + '</li>';
          }
        })
      }

      if (subBrand) {
        template = mainBrand + '<ul class="menu-dropdown">' + subBrand + '</ul>';
      } else {
        template = mainBrand;
      }

      return '<div class="site-brand"><a href="#" class="menu brand-menu ' + withSubmenuClass +'">' + template + '</a></div>';
    } else {
      return '';
    }
  }

  function joinLevel1Tempate() {
    if (!window.PAGE_NAV_DATA) {
      return;
    }

    var level1Template = '';

    PAGE_NAV_DATA.map(function(level1Node) {
      var activeClass = level1Node.active ? 'selected' : ''
      var targetAttr = level1Node.target ? 'target=' + level1Node.target : '';
      level1Template += '<a href="' + getFirstHrefInChild(level1Node) + '" class="menu" '+ targetAttr +'><h2 class="menu-title ' + activeClass + '">' + level1Node.name + '</h2></a>';
    });

    return level1Template;
  }

  // 导航头右侧公告栏按钮
  function joinRightActionBar() {
    var noticeConfig = window.NOTICE_CONFIG || {}
    return '<a href="'+noticeConfig.url+'" target="_blank" class="call-board"><i class="iconfont icon-alarm"></i>平台升级操作指南</a>';
  }

  function getFirstHrefInChild(parentNode) {
    if ('url' in parentNode) {
      return parentNode.url
    }

    if (!parentNode.children || !Array.isArray(parentNode.children)) {
      return
    }

    var url = '';

    parentNode.children.some(function(node, idx) {
      url = getFirstHrefInChild(node);

      return url;
    })

    return url;
  }

  function renderHeadNavBar() {
    $('.home-header').addClass('fd-clear').html( joinBrandMenuTemplate() + '<ul class="header-list">' + joinLevel1Tempate() +'</ul>' + joinRightActionBar());
  }

  // 初始化公告面板
  // url:  公告btn, content 需要 点击
  // 初次进入 强制显示
  function initBulletinBoard() {
    var noticeConfig = window.NOTICE_CONFIG || {}
    var isFristTime = !localStorage.getItem('layoutTipFirstTime') // 要考虑当前有没有内容 再弹出
    var noticeContent = '';

    if (noticeConfig.noticeName) {
      noticeContent = '<a href="'+noticeConfig.url+'" target="_blank">'+noticeConfig.noticeName || ''+'</a>';
    } else {
      noticeContent = '暂无公告';
    }
     
    var tip = new Tip({
      target: '.call-board',
      content: noticeContent,
      hasCloseButton: true,
      isOnloadShow: isFristTime && noticeConfig.noticeName, // 第一次登陆，并且公告内容才默认显示
      isAutoHide: !isFristTime,
      hideListener: '',
      dTop: 15,
      beforeShow: function() {
        fixTip();
      },
      onCloseButtonClick: function() {
        localStorage.setItem('layoutTipFirstTime', 'loaded');
      }
    });

    $('.call-board').hover(function() {
      fixTip();
    });

    function fixTip() {
      var $tip = $('.fui-tip');
      if ($tip.length) {
        $tip[0].style.top = '51px';
      }
    }

  }

  function bindHeaderEvent() {
    initBulletinBoard();
    
    $('.brand-menu').on('click', function(e) {
      e.preventDefault();
    });

    $('.home-header').on('click', '.menu-dropdown li', function(e) {
      var nodeData = $(this).data();

      sendDotData(nodeData, function() {
        window.location.href = removeParameter(window.location.href);
      })
    });

    function sendDotData(data, successCallback) {
      var host = window.location.host.match(/test/) ? 'supplier-test.caigou.1688.com' : 'supplier.caigou.1688.com';

      $.ajax({
          url: '//' + host + '/mallCode/setUserMallCode.jsonp?mallCode=' + data.code,
          dataType: 'jsonp'
        })
        .done(function(msg) {
          successCallback && successCallback(msg);
        })
        .fail(function(errMsg) {
          alert(errMsg);
        })
    }
  }

  function removeParameter(str) {
    return str.replace(/(^\?|&)_mall_code_=[^&]*(&)?/g, function(p0, p1, p2) {
      return p1 === '?' || p2 ? p1 : '';
    });
  }

  /**
   * SideBar
   */
  
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
  };

  var handleSidebarToggler = function() {
    // handle sidebar show/hide
    $('.page-sidebar').on('click', '.sidebar-toggler', function(e) {
      var body = $('body');

      if (body.hasClass("page-sidebar-closed")) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });
  };

  var closeSidebar = function() {
    $('body').addClass("page-sidebar-closed");
  };

  var openSidebar = function () {
    $('body').removeClass("page-sidebar-closed");
  };

  var renderSideBar = function() {
    // 如果页面输出 `MENU_COLLAPSE` 则自动关闭左侧导航
    if (window.MENU_COLLAPSE === true) {
      closeSidebar(); // 关闭导航栏
    }
    var curLeve1Node = PAGE_NAV_DATA.filter(function(level1Node) {
      return level1Node.active
    });
    curLeve1Node = curLeve1Node[0];

    // 如果当前一级菜单没有 children, 则不显示
    if (!curLeve1Node || !curLeve1Node.children) {
      $('.page-sidebar').remove();
      $('body').removeClass("page-sidebar-closed").addClass("page-sidebar-none");
      return;
    }

    var sideNavTpl =
      '<li class="toggler">'+
        '<div class="sidebar-toggler"><i class="iconfont"></i></div>'+
      '</li>'+
      '{{each data.children as level2Node i }}'+
        '<li class="{{ if level2Node.active }}active{{ /if }}">'+
            '<a href="{{level2Node.url}}" {{ if level2Node.target }} target="{{level2Node.target}}" {{/if}}><i class="iconfont {{level2Node.icon}}"></i>'+
              '<span class="title">{{level2Node.name}}</span>'+
              '{{ if level2Node.children }}<span class="arrow {{ if level2Node.active }}open{{ /if }}"></span>{{ /if }}'+
            '</a>'+
            '{{if level2Node.children }}'+
            '<ul class="sub-menu">'+
              '{{each level2Node.children as level3Node i }}'+
                '<li class="{{ if level3Node.active }}active{{ /if }}">'+
                  '<a href="{{level3Node.url}}" {{ if level3Node.target }} target="{{level3Node.target}}" {{/if}}>'+
                    '<span class="title">{{level3Node.name}}</span>'+
                  '</a>'+
                '</li>'+
              '{{/each}}'+        
            '</ul>'+
            '{{/if}}'+
          '</li>'+
      '{{/each}}';

    var tpl = Template.compile(sideNavTpl)({ data: curLeve1Node });
    $('.page-sidebar-menu').html(tpl);
  };

  var init = function () {
    renderHeadNavBar();
    bindHeaderEvent();
    renderSideBar();
    handleSidebarMenu(); // handles main menu
    handleSidebarToggler(); // handles sidebar hide/show
    handleSidebarAndContentHeight();
    handleOnResize();
    handScroll();
  };

  // 统一初始化
  $(function() {
    init();
  })
});
