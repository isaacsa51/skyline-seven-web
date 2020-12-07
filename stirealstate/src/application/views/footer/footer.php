<!-- <footer>
    <div class="container">
        <div class="row">
            <div class="col my-auto">
                <img src="../../../assets/img/navbar/icono-stirealstate.png" alt="Logo" class="img-fluid">
            </div>

            <div class="col-8">
                <div class="row my-auto">
                    <div class="col">

                        <div class="w-100 d-lg-flex d-none d-lg-block d-xl-block my-auto">
                            <div class="text-white d-lg-flex">
                                <div class="d-flex w-100 justify-content-between">
                                    <a href="#!" class="nav-link p-0 text-white pl-5" data-scroll="modelos"><h3>Modelos</h3></a>

                                    <a href="#!" class="nav-link p-0 text-white pl-5" data-scroll="amenidades"><h3>Amenidades</h3></a>

                                    <a href="#!" class="nav-link p-0 text-white pl-5" data-scroll="galeria"><h3>Galería</h3></a>

                                    <a href="#!" class="nav-link p-0 text-white pl-5" data-scroll="contacto"><h3>Contacto</h3></a>
                                </div>
                            </div>
                        </div>


                        <div class="accordion w-100 d-lg-flex d-block d-lg-none d-xl-none my-auto" id="accordion">
                            <div class="col-lg-4 col-md-12">

                            <a href="#one" data-toggle="collapse" class="h5 text-uppercase text-white nav-link p-0 d-block d-lg-none d-xl-none text-center">Navegación</a>

                            <div class="collapse text-white d-lg-flex" id="one" data-parent="#accordion">
                                <ul class="list-unstyled">
                                    <li><a href="#!" class="nav-link p-0 text-white pl-5 text-center" data-scroll="modelos"><h6>Modelos</h6></a></li>
                                    <li><a href="#!" class="nav-link p-0 text-white pl-5 text-center" data-scroll="amenidades"><h6>Amenidades</h6></a></li>
                                    <li><a href="#!" class="nav-link p-0 text-white pl-5 text-center" data-scroll="galeria"><h6>Galería</h6></a></li>
                                    <li><a href="#!" class="nav-link p-0 text-white pl-5 text-center" data-scroll="contacto"><h6>Contacto</h6></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col my-auto">
                <p class="text-right">Términos y<br>cóndiciones</p>
                <p class="text-right">Desarrollado por Solemti</p>
            </div>
        </div>
    </div>
</footer> -->

<footer>
    <div class="container">
        <div class="row text-center my-auto">

            <div class="col-md-2 mb-3 my-auto">
                <img src="../../../assets/img/navbar/icono-stirealstate.png" alt="Logo" class="img-fluid">
            </div>

            <div class="col-md-2 mb-3 text-white my-auto">
                <h3 class="text-white">
                    <a href="#!" data-scroll="modelos" style="color: #fff; text-decoration: none;">Modelos</a>
                </h3>
            </div>

            <div class="col-md-2 mb-3 my-auto">
                <h3 class="text-white">
                    <a href="#!" data-scroll="amenidades" style="color: #fff; text-decoration: none;">Amenidades</a>
                </h3>
            </div>

            <div class="col-md-2 mb-3 my-auto">
                <h3 class="text-white">
                    <a href="#!" data-scroll="galeria" style="color: #fff; text-decoration: none;">Galería</a>
                </h3>
            </div>

            <div class="col-md-2 mb-3 my-auto">
                <h3 class="text-white">
                    <a href="#!" data-scroll="contacto" style="color: #fff; text-decoration: none;">Contacto</a>
                </h3>
            </div>

            <div class="col-md-2 mb-3 my-auto">
                <p class="text-right">Términos y condiciones</p>
                <p class="text-right">Desarrollado por Solemti</p>
            </div>
    </div>
  </div>

</footer>

<script src="../../../assets/js/bootstrap.min.js"></script>
<script src="../../../assets/js/lib/jquery.min.js"></script>
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script src="../../../assets/js/home/carousel.js"></script>
<script src="../../../assets/js/home/navbar.js"></script>
<script src="../../../assets/js/home/smartScroll.min.js"></script>

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

<!-- Initialize Swiper -->
<script>
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
</script>

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

<script>
    var swiper = new Swiper('.swiper-container-multiple-2', {
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
</script>