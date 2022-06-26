$(document).ready(function () {
  window.jsPDF = window.jspdf.jsPDF;

  let img = domtoimage.toJpeg(document.getElementById('map-scrool'), { quality: 0.95 })
  console.log(img.src)
  const doc = new jsPDF('p', 'pt', [ 1560, 900])
  //doc.text("Hello world!", 1, 1);
  doc.addImage('../img/map.jpg', 'JPEG', 0, 0, 1560, 900);

  $('.map-pdf').on('click', function() {
    doc.save("two-by-four.pdf");
    return false;
  })

  console.log(doc)

  let counter = 0;
  let counter_redial = 0;
  let nov_number = 0;
  let true_to_click = true;
  var outerContent = $('.map-scrool');
  var innerContent = $('.map-scrool-wrapp');
  outerContent.scrollLeft((innerContent.width() - outerContent.width()) / 2);    

  $('#map-select').selectize();
  $('#map-select-form').selectize();
  $(".phone").mask("+7 (999) 999-9999");

  
  $('.form-info-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    swipe: false,
    prevArrow: $('.form-info__right--arrow__prev'),
    nextArrow: $('.form-info__right--arrow__next')
  });

  $('.form-info__btn').on('click', function() {
    $('.map-form__input--plot').val(nov_number);
    $('.map-form--info').removeClass('active-modal');
    $('.map-form--excursion').addClass('active-modal');
    return false;
  })

  $('.info-slide--nav').click(function () {
    let currentSlide = $(this).attr('data-slide');
    $('.form-info-slider').slick('slickGoTo', currentSlide);
  }); 

  const slider = document.querySelector('.map-inner');
  let mouseDown = false;
  let startX, scrollLeft, startY, scrollTop;

  let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    startY = e.pageY - slider.offsetTop;
    true_to_click = false;
    scrollTop = slider.scrollTop;
    scrollLeft = slider.scrollLeft;
  };
  let stopDragging = function (event) {
    true_to_click = true;
    mouseDown = false;
  };

  slider.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if(!mouseDown) { return; }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;

    const x_y = e.pageY - slider.offsetTop;
    const scroll_y = x_y - startY;

    slider.scrollTop = scrollTop - scroll_y;
    slider.scrollLeft = scrollLeft - scroll;
  });

  // Add the event listeners
  slider.addEventListener('mousedown', startDragging, false);
  slider.addEventListener('mouseup', stopDragging, false);
  slider.addEventListener('mouseleave', stopDragging, false);
  
  $('.map-scrool-svg path').on('click', function() {
    let fill_this = $(this).attr('fill');
    if (true) {
      if ($(this).hasClass('path-none')) {

      }
      else{
        if (true_to_click) {
          $('.map-dark').addClass('active-modal');
          $('.map-form--info').addClass('active-modal');

          let parent = $(this).parent('.map-relevality');
          let parent_link = $(this).parent('.map-relevality');
          let size_ele = $(parent).attr('data-size');
          let status = $(parent).attr('data-status');
          let price = $(parent).attr('data-price');
          let slides_gallert = $('.form-info-slide');
          let slides_gallert_nav = $('.info-slide--nav');
          let gallery_id = $(parent).attr('data-gallery-id');
          gallery_id = $('.map-gallery__item')[gallery_id];
          gallery_id = $(gallery_id).children('span');
          for (let i = gallery_id.length - 1; i >= 0; i--) {
            let this_element = gallery_id[i];
            let this_slide = slides_gallert[i];
            let this_slide_nav = slides_gallert_nav[i];
            let data_src = $(this_element).attr('data-src');

            $(this_slide).css('backgroundImage', `url(${data_src})`)
            $(this_slide_nav).css('backgroundImage', `url(${data_src})`)
          }
         
          //console.log(gallery_id);

          parent_link = $(parent_link).attr('data-id');
          nov_number = parent_link;
          if (status == 'sale') {
            $('.map-form--info').addClass('form-status--sold');
          }
          if (status == 'bron') {
            $('.map-form--info').addClass('form-status--bron');
          }
          if (status == 'close') {
            $('.map-form--info').addClass('form-status--close');
          }
          if (status == 'free') {
            $('.map-form--info').addClass('form-status--free');
          }

          $('.form-info__name--number').text("№" + parent_link);
          $('.form-info__item__content--size').text(size_ele + ' соток');
          $('.form-info__item__content--price').text(price + ' ₽');
        }
      }
    }
    return false;
  })

  $('.zoom-button--more').on('click', function() {
    if ($(this).hasClass('map-zoom-active')) {
      $('.map-inner').addClass('zoom-2x');
      let outerContent = $('.map-scrool');
      let innerContent = $('.map-scrool-wrapp');
      let scrol_now_radial = (innerContent.width() - outerContent.width()) / 2
      let scrol_now_top = (innerContent.height() - outerContent.height()) / 2
      counter_redial = scrol_now_radial;
      counter = scrol_now_top;
      $('.map-inner').scrollTop(scrol_now_top);
      $('.map-inner').scrollLeft(scrol_now_radial);   
      
    }
    return false;
  })

  $('.zoom-button--none').on('click', function() {
    if ($(this).hasClass('map-zoom-active')) {
      $('.map-inner').removeClass('zoom-2x');
      $('.map-inner').scrollTop(0);
      $('.map-inner').scrollLeft(0);
      counter_redial = 0;
      counter = 0;
      
    }
    return false;
  })

  $('.map-zoom__item').on('click', function() {
    $('.map-zoom__item').addClass('map-zoom-active');
    $(this).removeClass('map-zoom-active');
  })

  

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

    $('.map-form--info').removeClass('form-status--sold');
    $('.map-form--info').removeClass('form-status--bron');
    $('.map-form--info').removeClass('form-status--close');
    $('.map-form--info').removeClass('form-status--free');

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