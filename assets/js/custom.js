(function ($) {
    "use strict";
	
	/*=======================================
    =            WINDOW LOAD                 =
    =======================================*/
    $(window).on('load', function () {
        $("body").addClass("page-loaded");
    });
	

    $(function () {

        /*=======================================
        =            MOBILE NAV                 =
        =======================================*/
        $(document).on('click', '.mobile-nav .menu-item-has-children', function (event) {
            $(this).toggleClass('active');
            event.stopPropagation();
        });

        $(document).on('click', '#mobile-menu', function () {
            $(this).toggleClass('open');
            $('#mobile-nav').toggleClass('open');
        });

        $(document).on('click', '#desktop-menu', function () {
            $(this).toggleClass('open');
            $('.desktop-menu').toggleClass('open');
        });

        $(document).on('click', '#res-cross', function () {
            $('#mobile-nav, #mobile-menu').removeClass('open');
        });

        /*=======================================
        =            SEARCH BOX                 =
        =======================================*/
        if ($('.search-box-outer').length) {
            $(document).on('click', '.search-box-outer', function () {
                $('body').addClass('search-active');
            });

            $(document).on('click', '.close-search', function () {
                $('body').removeClass('search-active');
            });
        }

        /*=======================================
        =            COUNTER                    =
        =======================================*/
        function inVisible(element) {
            const WindowTop = $(window).scrollTop();
            const WindowBottom = WindowTop + $(window).height();
            const ElementTop = element.offset().top;
            const ElementBottom = ElementTop + element.height();

            if (ElementBottom <= WindowBottom && ElementTop >= WindowTop) {
                animate(element);
            }
        }

        function animate(element) {
            if (!element.hasClass('ms-animated')) {
                const maxval = element.data('max');
                const html = element.html();

                element.addClass("ms-animated");

                $({ countNum: element.html() }).animate({
                    countNum: maxval
                }, {
                    duration: 5000,
                    easing: 'linear',
                    step: function () {
                        element.html(Math.floor(this.countNum) + html);
                    },
                    complete: function () {
                        element.html(this.countNum + html);
                    }
                });
            }
        }

        $(window).on('scroll', function () {
            $("h2[data-max]").each(function () {
                inVisible($(this));
            });
        });

        /*=======================================
        =            SWIPERS                    =
        =======================================*/
        if (typeof Swiper !== "undefined") {

            const swiperConfigs = [
                {
                    selector: ".hero-one-slider",
                    options: {
                        slidesPerView: 1,
                        loop: true,
                        speed: 1000,
                        freeMode: true,
                        effect: "fade",
                        autoplay: { delay: 3000 },
                        pagination: { el: ".swiper-pagination", clickable: true },
                        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
                    }
                },
                {
                    selector: ".products-slider",
                    options: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                        loop: true,
                        freeMode: true,
                        pagination: { el: ".swiper-pagination", clickable: true },
                        breakpoints: {
                            1: { slidesPerView: 1 },
                            500: { slidesPerView: 2 },
                            992: { slidesPerView: 4, spaceBetween: 10 },
                            1200: { spaceBetween: 20 }
                        }
                    }
                },
                {
                    selector: ".categories-slider",
                    options: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                        loop: true,
                        centeredSlides: true,
                        freeMode: true,
                        pagination: { el: ".swiper-pagination", clickable: true },
                        breakpoints: {
                            1: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            992: { slidesPerView: 3 },
                            1200: { spaceBetween: 20 }
                        }
                    }
                },
                {
                    selector: ".client-slider",
                    options: {
                        slidesPerView: 1,
                        loop: true,
                        speed: 1000,
                        freeMode: true,
                        effect: "fade",
                        autoplay: { delay: 3000 },
                        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
                    }
                },
                {
                    selector: ".clients-slider",
                    options: {
                        loop: true,
                        speed: 1000,
                        freeMode: true,
                        autoplay: { delay: 2000 },
                        breakpoints: {
                            10: { slidesPerView: 1 },
                            480: { slidesPerView: 2 },
                            768: { slidesPerView: 4 },
                            1200: { slidesPerView: 6 }
                        }
                    }
                },
                {
                    selector: ".hero-two-slider",
                    options: {
                        slidesPerView: 1,
                        loop: true,
                        speed: 1000,
                        freeMode: true,
                        effect: "fade",
                        autoplay: { delay: 3000 },
                        pagination: { el: ".swiper-pagination", clickable: true },
                        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
                    }
                }
            ];

            swiperConfigs.forEach(config => {
                if ($(config.selector).length) {
                    new Swiper(config.selector, config.options);
                }
            });
        }

        /*=======================================
        =            ACCORDION                  =
        =======================================*/
        $(document).on('click', '.accordion-item .heading', function (e) {
            e.preventDefault();

            const $parent = $(this).closest('.accordion-item');
            const $content = $(this).next();

            if ($parent.hasClass('active')) {
                $parent.removeClass('active');
            } else {
                $('.accordion-item').removeClass('active');
                $parent.addClass('active');
            }

            $content.slideToggle(100);
            $('.accordion-item .content').not($content).slideUp('fast');
        });

        /*=======================================
        =            GALLERY                    =
        =======================================*/
        $(document).on('click', '.li-pd-imgs', function () {

            $('.li-pd-imgs.nav-active').removeClass('nav-active');
            $(this).addClass('nav-active');

            const img_src = $(this).find('img').attr('src');

            if (img_src) {
                $('.pd-main-img img').attr('src', img_src);
            }
        });

        /*=======================================
        =        PRODUCT QUANTITY               =
        =======================================*/
        $(document).on('click', '.add', function () {
            const $input = $(this).closest('.wrap').find('.count');
            $input.val(parseInt($input.val(), 10) + 1);
        });

        $(document).on('click', '.sub', function () {
            const $input = $(this).closest('.wrap').find('.count');
            if (parseInt($input.val(), 10) > 1) {
                $input.val(parseInt($input.val(), 10) - 1);
            }
        });

        /*=======================================
        =            MIXITUP FILTER             =
        =======================================*/
        if ($('#products').length && typeof $.fn.mixItUp === 'function') {
            $('#products').mixItUp({
                selectors: {
                    target: '.products-item',
                    filter: '.filter'
                },
                load: {
                    filter: '.used-guns, .outdoor-clothing, .accessories'
                }
            });
        }
		
		/*=======================================
		=               GUN PIN                =
		=======================================*/

		if ($('.gun-pin').length) {

			$(document).on('mouseover', '.gun-pin', function () {
				$('.gun-pin').toggleClass('active');
			});

		}
		
		/*=======================================
		=            SCROLL PERCENTAGE         =
		=======================================*/

		if ($('#scroll-percentage').length) {

			const updateScrollPercentage = function () {

				const scrollTopPos = document.documentElement.scrollTop;
				const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
				const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
				const scrollElementWrap = $('#scroll-percentage');

				scrollElementWrap.css(
					"background",
					`conic-gradient(#fff ${scrollValue}%, #000 ${scrollValue}%)`
				);

				if (scrollTopPos > 100) {
					scrollElementWrap.addClass('active');
				} else {
					scrollElementWrap.removeClass('active');
				}

				if (scrollValue < 99) {
					$('#scroll-percentage-value').text(`${scrollValue}%`);
				} else {
					$('#scroll-percentage-value').html('<i class="fa-solid fa-arrow-up-long"></i>');
				}
			};

			$(window).on('scroll load', updateScrollPercentage);

			$(document).on('click', '#scroll-percentage', function () {
				document.documentElement.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});

		}

		
		/*=======================================
		=              LIGHTBOX                =
		=======================================*/

		if ($("#lightbox").length) {

			const boxWidth = $("#lightbox").width();

			$(".white_content").css({
				opacity: 0,
				width: 0,
				right: -10000
			});

			$(document).on('click', '#close', function () {
				$(".white_content").animate({
					opacity: 0,
					width: 0,
					right: -1000
				});
			});

			$(document).on('click', '#show', function () {
				$(".white_content").animate({
					opacity: 1,
					right: 0
				});
			});

		}


        /*=======================================
        =            OWL ZOOM SLIDER            =
        =======================================*/
        if (typeof $.fn.owlCarousel === 'function') {
            $('.zoom-slider').owlCarousel({
                center: true,
                loop: true,
                margin: 0,
                autoplay: true,
                autoplayTimeout: 3000,
                smartSpeed: 600,
                dots: true,
                responsive: {
                    0: { items: 1 },
                    600: { items: 1 },
                    1200: { items: 3 }
                }
            });
        }

        /*=======================================
        =            STICKY HEADER              =
        =======================================*/
        const header = document.getElementById("stickyHeader");

        if (header) {
            let new_scroll_position = 0;

            window.addEventListener('scroll', function () {

                const last_scroll_position = window.scrollY;

                if (new_scroll_position < last_scroll_position && last_scroll_position > 100) {
                    header.classList.remove("slideDown");
                    header.classList.add("slideUp");
                }
                else if (last_scroll_position < 100) {
                    header.classList.remove("slideDown");
                }
                else if (new_scroll_position > last_scroll_position) {
                    header.classList.remove("slideUp");
                    header.classList.add("slideDown");
                }

                new_scroll_position = last_scroll_position;
            });
        }

    });

})(jQuery);