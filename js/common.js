$(document).ready(function () {
  alert('Тест 2')
  if ($(window).width() < 768 && $(window).width() > 400) {
    $('.map-scrool').scrollLeft(100);
  }
  if ($(window).width() < 400 ) {
    $('.map-scrool').scrollLeft(120);
  }

  $('#map-select').selectize();
  $('#map-select-form').selectize();

  $(".phone").mask("+7 (999) 999-9999");

  

  $('.map-btn-price').on('click', function() {
  	$('.map-dark').addClass('active-modal');
  	$('.map-form--price').addClass('active-modal');
  	return false;
  })

  $('.map-content__arrow').on('click', function() {
    $('.map-content').toggleClass('map-content-active');
  })

  $(document).mouseup( function(e){ // событие клика по веб-документу
    var div = $( "#map-content" ); // тут указываем ID элемента
    if ( !div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
        $('.map-content').removeClass('map-content-active');
    }
  });

  $('.map-info__btn').on('click', function() {
  	$('.map-dark').addClass('active-modal');
  	$('.map-form--excursion').addClass('active-modal');
  	return false;
  })

  $('.map-dark, .map-form__close').on('click', function() {
  	$('.map-dark').removeClass('active-modal');
  	$('.map-form').removeClass('active-modal');
  	return false;
  })

  $('.form').on('wpcf7mailsent', function() {
    $('.map-dark').removeClass('active-modal');
    $('.map-form').removeClass('active-modal');
  })

  function showCoords(evt){
  	let info_block = $('.map-info-block')[0];
  	info_block.style.left = evt.clientX + 30 + 'px'; 
  	info_block.style.top = evt.clientY + 30 + 'px';
    $('.map-info-block').addClass('map-info-block-active');
  }

  $('.map-scrool-svg path').on('mouseover', function() {
  	if ($(this).hasClass('path-none')) {

  	}
  	else{
  		showCoords(event)
  		let parent = $(this).parent('.map-relevality');
  		let parent_link = $(this).parent('.map-relevality');
  		let size_ele = $(parent).attr('data-size');
  		let status = $(parent).attr('data-status');
  		let price = $(parent).attr('data-price');
  		parent_link = $(parent_link).attr('data-id');

  		if (status == 'sale') {
  			$('.map-info-block').addClass('status-sale');
  		}
  		if (status == 'bron') {
  			$('.map-info-block').addClass('status-bron');
  		}
  		if (status == 'close') {
  			$('.map-info-block').addClass('status-close');
  		}
  		if (status == 'free') {
  			$('.map-info-block').addClass('status-free');
  			$('.map-info__status__price').text(price)
  		}

  		$('.map-info__name__content').text(parent_link)
  		$('.map-info__size__content').text(size_ele)
  		

  		$(this).on('mouseout', function(argument) {
  			$('.map-info-block').removeClass('status-sale');
  			$('.map-info-block').removeClass('status-bron');
  			$('.map-info-block').removeClass('status-close');
  			$('.map-info-block').removeClass('status-free');
  			$('.map-info-block').removeClass('map-info-block-active');
  		})
  	}
  	
  })

  let counter = 0;
  $('.bottom').on('mouseover', function(argument) {
  	var timer_bottom = setInterval(function () {
  		counter = counter + 1;
  		$('.map-inner').scrollTop(counter);
  		
  	}, 1)
  	$('.bottom').on('mouseout', function(argument) {
  		clearInterval(timer_bottom);
  	})
  })


  $('.top').on('mouseover', function(argument) {
  	var timer_top = setInterval(function () {
  		counter = counter - 1;
  		$('.map-inner').scrollTop(counter);
  	}, 1)
  	$('.top').on('mouseout', function(argument) {
  		clearInterval(timer_top);
  	})
  })

  let counter_redial = 0;

  $('.right').on('mouseover', function(argument) {
  	
  	var timer_top = setInterval(function () {
  		counter_redial = counter_redial + 1;
  		$('.map-inner').scrollLeft(counter_redial);
  	}, 1)

  	
  	$('.right').on('mouseout', function(argument) {
  		clearInterval(timer_top);
  	})
  })

  $('.left').on('mouseover', function(argument) {
  	
  	var timer_top = setInterval(function () {
  		counter_redial = counter_redial - 1;
  		$('.map-inner').scrollLeft(counter_redial);
  	}, 1)
  	$('.left').on('mouseout', function(argument) {
  		clearInterval(timer_top);
  	})
  })

  $('#map-select').on('change', function() {
  	let map_select = $('#map-select').val()
  	let paths_map = $('.map-scrool-svg path');
  	$(paths_map).removeClass('path-none');
  	for (let i = paths_map.length - 1; i >= 0; i--) {
  		let fill_value = $(paths_map[i]).attr('fill');
  		if (map_select == 'free') {
  			if (fill_value != '#4FA724' && fill_value != 'white') {
  				$(paths_map[i]).addClass('path-none');
  			}
  		}
  		if (map_select == 'sold') {
  			if (fill_value != '#DE2929' && fill_value != 'white') {
  				$(paths_map[i]).addClass('path-none');
  			}
  		}
  		if (map_select == 'booked') {
  			if (fill_value != '#E7E01E' && fill_value != 'white') {
  				$(paths_map[i]).addClass('path-none');
  			}
  		}
  		if (map_select == 'all') {
  			$(paths_map).removeClass('path-none');
  		}
  	}
  })
})
//;