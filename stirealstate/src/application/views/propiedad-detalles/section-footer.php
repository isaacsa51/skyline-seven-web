
<script src="../../../assets/js/home/smartScroll.min.js"></script>
<script src="../../../assets/js/home/carousel.js"></script>


<!-- Swiper Modelo -->
<script>
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 6,
    loop: false,
    freeMode: true,
    loopedSlides: 6, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    loop: false,
    loopedSlides: 6, //looped slides should be the same
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });
</script>

<!-- Swiper Amenidades -->
<script>
    var swiper = new Swiper('.swiper-container-multiple-4', {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-amenidades',
            prevEl: '.swiper-button-prev-amenidades'
        }
    });
</script>

<!-- Swiper Otros Modelos -->
<script>
    var swiper = new Swiper('.swiper-container-multiple-2', {
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next-otros',
            prevEl: '.swiper-button-prev-otros'
        }
    });
</script>


<!-- Start smartScroll -->
<script>
    (function ($) {
        "use strict";
        smartScroll.init({
            addActive: true,
            activeClass: "activo",
            speed: 1000
        })
    })(jQuery)
</script>

</body>
</html>