function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		if ( !t.is('.scale-min') ) {
			t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
		} else {
			t.css({
				'min-height': t.outerWidth()*$(this).attr('data-ratio')
			});
		}
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:1199px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	
	function showCityDrop(tab) {
		var t = $('.city-drop');
		if ( !t.hasClass('is-opened') ) {
			t.addClass('is-opened');
		}
		t.find('.city-drop__row[data="'+tab+'"]').addClass('is-visible').siblings().removeClass('is-visible');
	}
	function hideCityDrop() {
		$('.city-drop').removeClass('is-opened');
	}
	$('[data-city-drop-close]').on('click', function() {
		hideCityDrop();
	});
	$('.panel--city_link, .city-drop--select').on('click', function() {
		showCityDrop(2);
	});

	$('select').selectric({
		nativeOnMobile: true
	});

	function setTabsTip(e,t) {
		t.find('[data-tabs-tip]').removeClass('is-visible').filter('[data-tabs-tip="'+e+'"]').addClass('is-visible');
	}
	$('[data-tabs-container]').each(function() {
		var elem = $(this);
		elem.find('[data-tabs]').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: false,
			draggable: false,
			initialSlide: parseInt(elem.find('[data-tabs-link].is-active').attr('href'))-1,
			cssEase: 'ease',
			speed: 1000,
			adaptiveHeight: true
		});
		setTabsTip(elem.find('[data-tabs-link].is-active').attr('href'),elem);
	});
	$('[data-tabs-link]').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-active') ) {
			var t = parseInt($(this).attr('href')-1);
			var tabs = $(this).parents('[data-tabs-container]').find('[data-tabs]');
			tabs.slick('slickGoTo',t);
			centerModal($(this).parents('.modal'));
		}
	});
	$('[data-tabs]').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		var t = nextSlide+1;
		var activeLink = $(this).parents('[data-tabs-container]').find('[data-tabs-link][href="'+t+'"]');
		activeLink.addClass('is-active').siblings().removeClass('is-active');
		setTabsTip(t,$(this).parents('[data-tabs-container]'));
	});
	
	$('.product-gallery__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		fade: true,
		cssEase: 'ease',
		speed: 500,
		asNavFor: '.product-preview__slider'
	});
	
	$('.product-preview__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		asNavFor: '.product-gallery__slider',
		focusOnSelect: true,
		centerMode: true,
		centerPadding: 0,
		responsive: [
			{
				breakpoint: 1539,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 1199,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	
	$('[data-fadetabs-slider]').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		cssEase: 'ease-in',
		fade: true,
		speed: 300,
		adaptiveHeight: true,
		draggable: false,
		initialSlide: $('[data-fadetabs-item].is-active').attr('href')-1
	});
	$('[data-fadetabs-item]').on('click', function(e) {
		e.preventDefault();
		var s = $('[data-fadetabs-slider]');
		var n = $(this).attr('href')-1;
		s.slick('slickGoTo', n);
	});
	$('[data-fadetabs-slider]').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		var n = nextSlide+1;
		$('[data-fadetabs-item][href="'+n+'"]').addClass('is-active').siblings().removeClass('is-active');
	});
	
	$('.same__slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 300,
		draggable: false
	});
	var animationRunning = 0;
	$('.same__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		animationRunning = 1;
	});
	$('.same__slider').on('afterChange', function(event, slick, currentSlide) {
		animationRunning = 0;
	});
	$('.same__item').on('mouseenter', function() {
		var slider = $(this).parents('.same__slider');
		if ( !animationRunning && slider.hasClass('slick-initialized') ) {
			slider.addClass('remove-hidden');
		}
	});
	$('.same__item').on('mouseleave', function() {
		var slider = $(this).parents('.same__slider');
		slider.removeClass('remove-hidden');
	});
	
	$('.audience').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 800
	});
	
	function setIntroSlider() {
		$('.intro__item_big').each(function() {
			$(this).find('.intro-elem').outerHeight($(this).outerHeight());
		});
	}
	$('.intro__item_slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500
	});
	setIntroSlider();
	
	$('.article-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500
	});
	$('.article-preview--pic').on('click', function() {
		$('.article-slider').slick('slickGoTo', $(this).parent('.article-preview__item').index());
	});
	$('.article-slider').on('afterChange', function(event, slick, currentSlide) {
		$('.article-preview__item').eq(currentSlide).addClass('is-active').siblings().removeClass('is-active');
	});

	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {

			} else {
			}
		}
		setRatio();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	$('input[type="checkbox"], input[type="radio"]').uniform();
	
	function centerModal(t) {
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( !isMobile ) {
			var diff = 30;
		} else {
			var diff = 15;
		}
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		});
	}
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		if ( $(this).is('[data-tab-set]') ) {
			var tabs = t.find('[data-tabs]');
			tabs.slick('setOption', 'speed', 0);
			tabs.slick('slickGoTo', ($(this).attr('data-tab-set')-1));
		}
		centerModal(t);
		t.addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	function menuOpen() {
		$('.menu-drop').addClass('is-opened');
		$('.fade-bg').addClass('is-opened');
	}
	function menuClose() {
		$('.menu-drop').removeClass('is-opened');
		$('.fade-bg').removeClass('is-opened');
	}
	$(document).on('click', '.menu-open', function(e) {
		menuOpen();
	});
	$('.menu-drop--close, .fade-bg').on('click', function(e) {
		menuClose();
	});

	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('[data-tip]').on('mouseenter', function() {
		console.log('asd');
		$('.tip-popup').remove();
		$('body').append('<div class="tip-popup">\
			<h3>'+$(this).text()+'</h3>\
			<p>'+$(this).attr('data-text')+'</p>\
		</div>');
		$('.tip-popup').css({
			left: $(this).offset().left,
			top: $(this).offset().top,
			width: $(this).outerWidth()+35
		}).addClass('is-visible');
	});
	$('[data-tip]').on('mouseleave', function() {
		$('.tip-popup').remove();
	});
	
	var showDropDelay,
		hideDropDelay;
	function hideNavDrop() {
		hideDropDelay = setTimeout(function() {
			$('.nav-drop').removeClass('is-opened');
			$('.nav__link').removeClass('is-active');
		}, 200);
	}
	function navDropHeight() {
		var diff = parseInt($('.nav-drop').css('padding-top'));
		if ( !$('.top-group').hasClass('is-minified') ) {
			var st = $(window).scrollTop();
		} else {
			var st = 0;
		}
		$('.nav-drop__row').css({
			'max-height': $(window).height()-$('.top-group').outerHeight()+diff+st
		});
	}
	$('.nav__link').on('mouseenter', function() {
		var id = $(this).attr('data-drop');
		if ( id !== undefined ) {
			if ( !$('.nav-drop').hasClass('is-opened') ) {
				var delay = 200;
			} else {
				var delay = 0;
			}
			var t = $(this);
			showDropDelay = setTimeout(function() {
				var drop = $('.nav-drop');
				clearTimeout(hideDropDelay);
				if ( !drop.hasClass('is-opened') ) {
					drop.addClass('is-opened');
				}
				$('.nav-drop__content[data-sub="'+id+'"]').addClass('is-visible').siblings().removeClass('is-visible');
				navDropHeight();
				$('.nav-drop--arrow').css({
					left: t.offset().left
				});
				t.addClass('is-active').siblings().removeClass('is-active');
			}, delay);
		} else {
			hideNavDrop();
		}
	});
	$(document).on('mouseover', function(e) {
		if ( !$(e.target).closest('.nav-drop').length && !$(e.target).closest('.nav__link').length ) {
			hideNavDrop();
			clearTimeout(showDropDelay);
		} else {
			clearTimeout(hideDropDelay);
		}
	});

	$(window).on('scroll', function() {
		$('[data-animated]').each(function() {
			var t = $(this);
			if ( $(document).scrollTop() > t.offset().top-$(window).height()/5*4 && !t.hasClass('is-animated') ) {
				console.log('asd');
				setTimeout(function() {
					t.addClass('is-animated');
				}, 200+Math.random()*400);
			}
		});
		if ( $(document).scrollTop() > 198 ) {
			$('.top-group').addClass('is-minified');
		} else {
			$('.top-group').removeClass('is-minified');
		}
		if ( $('.nav-drop').hasClass('is-opened') ) {
			navDropHeight();
		}
	});
	$(window).trigger('scroll');
	
	function clearPrice(e) {
		return e.toString().replace(/\s/g, '');
	}
	function formatPrice(e) {
		return e.toString().replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}
	$('.filter-price').each(function() {

		var t = $(this);
		var range = t.find('.filter-price--slider');
		
		var min = parseInt(range.attr('data-min')),
			start = parseInt(range.attr('data-start')),
			end = parseInt(range.attr('data-end')),
			max = parseInt(range.attr('data-max'));

		var minInput = t.find('.filter-price--min'),
			maxInput = t.find('.filter-price--max');

		function setPriceInput(e,v) {
			var t = v;
			e.attr('data',clearPrice(t));
			e.val(formatPrice(t));
			var h = e.siblings('.hidden-area');
			h.text(formatPrice(t));
			var w = Math.ceil(h.outerWidth());
			e.outerWidth(w);
		}
		setPriceInput(minInput,start);
		setPriceInput(maxInput,end);
		
		range.slider({
			range: true,
			min: min,
			max: max,
			values: [start, end],
			slide: function(event, ui) {
				start = ui.values[0];
				setPriceInput(minInput, start);
				end = ui.values[1];
				setPriceInput(maxInput, end);
			}
		});

		minInput.on('keyup', _.debounce(function() {
			setPriceInput($(this),$(this).val());
			start = clearPrice($(this).val());
			range.slider('option', 'values', [start, end]);
		}, 100));

		maxInput.on('keyup', _.debounce(function() {
			setPriceInput($(this),$(this).val());
			end = clearPrice($(this).val());
			range.slider('option', 'values', [start, end]);
		}, 100));

		minInput.on('change', _.debounce(function() {
			if ( $(this).attr('data') < min || $(this).attr('data') > end ) {
				if ( $(this).attr('data') < min ) {
					start = min
				} else if ( $(this).attr('data') > end ) {
					start = end
				}
				$(this).attr('data',start);
				setPriceInput($(this),start);
				range.slider('option', 'values', [start, end]);
			}
		}, 100));

		maxInput.on('change', _.debounce(function() {
			if ( $(this).attr('data') > max || $(this).attr('data') < start ) {
				if ( $(this).attr('data') > max ) {
					end = max
				} else if ( $(this).attr('data') < start ) {
					end = start
				}
				$(this).attr('data',end);
				setPriceInput($(this),end);
				range.slider('option', 'values', [start, end]);
			}
		}, 100));
	});
	
	$('.filter--title').on('click', function() {
		$(this).toggleClass('is-opened');
	});
	
	function setCatalogView(e) {
		$('.catalog-grid').removeClass('catalog-tile catalog-list catalog-table').addClass(e.attr('data'));
	}
	
	$('.catalog-menu__view--item').on('click', function() {
		if ( !$(this).hasClass('is-active') ) {
			$(this).addClass('is-active').siblings().removeClass('is-active');
			setCatalogView($(this));
		}
	});

	$('.elem-quantity--minus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('.elem-quantity--input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
	});
	$('.elem-quantity--plus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('.elem-quantity--input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	
	function setSwitch(t,e) {
		if ( e == 1 ) {
			if ( !t.hasClass('is-active') ) {
				t.addClass('is-active');
			} else {
				t.removeClass('is-active');
			}
		}
		if ( t.hasClass('is-active') ) {
			var statement = 'active';
		} else {
			var statement = 'default';
		}
		t.text(t.attr('data-'+statement));
	}
	
	$('[data-switch]').each(function() {
		setSwitch($(this),0);
	});
	 
	$('[data-switch]').on('click', function() {
		setSwitch($(this),1)
	});
	
	$('.product-info--title_droppable').on('click', function() {
		$(this).toggleClass('is-active');
	});
	
	$('.product-delivery--logo').on('click', function() {
		var t = $(this).parents('.product-delivery__item');
		t.addClass('is-active').siblings().removeClass('is-active');
	});
	
	$('.branches-list').jScrollPane({
		verticalGutter: -16,
		verticalDragMinHeight: 80,
		verticalDragMaxHeight: 80
	});
	
	function editProfileItem(t) {
		t.addClass('profile__item_processing');
		t.find('.profile--data').focus();
	}
	function saveProfileItem(t) {
		var value = t.find('.profile--value');
		var data = t.find('.profile--data').val();
		value.text(data);
		t.removeClass('profile__item_processing');
	}
	$('.profile__item_editable .profile--edit').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('.profile__item');
		editProfileItem(t);
	});
	$('.profile__item_editable .profile--data').on('focusout', function(e) {
		e.preventDefault();
		if ( $(this).val() !== '' ) {
			var t = $(this).parents('.profile__item');
			saveProfileItem(t);
		}
	});
	$('.profile__item_editable .profile--confirm').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('.profile__item');
		var data = t.find('input--data');
		if ( $(this).val() !== '' ) {
			saveProfileItem(t);
		}
	});
	
	function selectLabel(e) {
		var content = e.parents('[data-radio-group]');
		var items = content.find('[data-radio-option]');
		items.removeClass('is-selected');
		items.find('input[type="radio"]:checked').parents('[data-radio-option]').addClass('is-selected');
	}
	selectLabel($('[data-radio-group] input[type="radio"]:checked'));
	$('[data-radio-group] input[type="radio"]').on('change', function() {
		selectLabel($(this));
	});
});