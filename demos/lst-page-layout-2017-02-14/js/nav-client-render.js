/**
Core script to handle the entire layout and base functions
**/

define(['jquery'], function($) {
  /*
  <ul class="header-list">
    <li>
      <a href="#" class="menu">
        <h1 class="brand-title">零售通</h1>
        <ul class="menu-dropdown">
          <li href="">天猫供应商</li>
          <li href="">1688供应链管理</li>
        </ul>
      </a>
    </li>
    <li>
      <a href="#" class="menu">
        <h2 class="menu-title selected">names</h2>
      </a>
    </li>
  </ul>

    var PAGE_MALLS = [{
      "active": false,
      "code": "lst1",
      "name":"零售通1", 
      "sceneCode": "lst", 
      "sceneName": "零售通，勿删"
    },
    {
    }]
  */
  function joinBrandMenuTemplate() {
    if (!window.PAGE_MALLS) {
      return '';
    }

    var template = '';
    var mainBrand = '';
    var subBrand = '';

    if (Array.isArray(PAGE_MALLS)) {
      if (PAGE_MALLS[0]) {
        mainBrand = '<h1 class="brand-title">'+PAGE_MALLS[0].name+'</h1>';
      }

      PAGE_MALLS.map(function(brand, idx) {
        if (idx > 0) {
          subBrand += '<li data-href="'+brand.href+'" data-code="'+brand.code+'">'+brand.name+'</li>';
        }
      })
      template = mainBrand + '<ul class="menu-dropdown">' + subBrand + '</ul>';

      return '<li><a href="#" class="menu brand-menu">' + template + '</a></li>';
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
      
      level1Template += '<a href="' + getFirstHrefInChild(level1Node) + '" class="menu"><h2 class="menu-title ' + activeClass + '">' + level1Node.name + '</h2></a>';
    });

    return level1Template;
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

    // {
    //   "active": true,
    //   "children": [{
    //     "active": false,
    //     "children": [{
    //       "active": false,
    //       "name": "售后",
    //       "url": "//supplier-test.caigou.1688.com/refund/refund_list.htm?_mall_code_=lst"
    //     }, {
    //       "active": false,
    //       "name": "展示类目管理",
    //       "url": "//portal.go.1688.com/page/mallDisplayCatManager.htm?_mall_code_=lst"
    //     }, {
    //       "active": false,
    //       "name": "我销售的商品",
    //       "url": "//go-test.1688.com/product/product_list_4_provider_new.htm?_mall_code_=lst"
    //     }],
    //     "name": "二级菜单1"
    //   }],
    //   "name": "一级菜单2"
    // }
  }
  
  function renderHeadNavBar() {
    $('.home-header').html('<ul class="header-list">'+joinBrandMenuTemplate() + joinLevel1Tempate() +'</ul>');
  }

  function bindEvent() {
    $(function() {
      $('.brand-menu').on('click', function(e) {
        e.preventDefault();
      });
      $('.home-header').on('click', '.menu-dropdown li', function(e) {
        var nodeData = $(this).data();

        debugger
        sendDotData(nodeData, function() {
          window.location.href = removeParameter(nodeData.href);
        })
      });
    })
    function sendDotData(data, successCallback) {
      var host = window.location.host.match(/test/) ? 'supplier-test.caigou.1688.com' : 'supplier.caigou.1688.com';

      $.ajax({
        url: '//'+ host + '/mallCode/setUserMallCode.jsonp?mallCode=' + data.code,
        dataType : 'jsonp'
      })
      .done(function( msg ) {
        successCallback && successCallback(msg);
      })
      .fail(function (errMsg) {
        alert(errMsg);
      })
    }
  }

  function removeParameter(str) {
    return str.replace(/(^\?|&)_mall_code_=[^&]*(&)?/g, function(p0, p1, p2) {
        return p1 === '?' || p2 ? p1 : '';
    });
  }

  renderHeadNavBar();
  bindEvent();
});
