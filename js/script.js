jQuery(function ($) {
    "use strict";

    /* ========================================================================= */
    /*	Page Preloader
    /* ========================================================================= */

    window.onload = function () {
        document.getElementById('preloader').style.display = 'none';
    }


    /* ========================================================================= */
    /*	Post image slider
    /* ========================================================================= */

    $("#post-thumb, #gallery-post").slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000

    });

    $("#features").slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });


    /* ========================================================================= */
    /*	Menu item highlighting
    /* ========================================================================= */


    $("#navigation").sticky({
        topSpacing: 0
    });


    /* ========================================================================= */
    /*	Magnific popup
    /* =========================================================================  */
    $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 160, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true,
        fixedContentPos: false,
        fixedBgPos: true
    });
    /* ========================================================================= */
    /*	Portfolio Filtering Hook
    /* =========================================================================  */

    var mixer = mixitup('.portfolio-items-wrapper');

    /* ========================================================================= */
    /*	Testimonial Carousel
    /* =========================================================================  */

    //Init the carousel
    $("#testimonials").slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000
    });





    /* ========================================================================= */
    /*   Contact Form Validating
    /* ========================================================================= */


    $('#contact-submit').click(function (e) {

        e.preventDefault();

        var error = false;
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();

        if (name.length == 0) {
            var error = true;
            $('#name').css("border-color", "#D8000C");
        } else {
            $('#name').css("border-color", "#666");
        }
        if (email.length == 0 || email.indexOf('@') == '-1') {
            var error = true;
            $('#email').css("border-color", "#D8000C");
        } else {
            $('#email').css("border-color", "#666");
        }
        if (subject.length == 0) {
            var error = true;
            $('#subject').css("border-color", "#D8000C");
        } else {
            $('#subject').css("border-color", "#666");
        }
        if (message.length == 0) {
            var error = true;
            $('#message').css("border-color", "#D8000C");
        } else {
            $('#message').css("border-color", "#666");
        }

        //now when the validation is done we check if the error variable is false (no errors)
        if (error == false) {
            //disable the submit button to avoid spamming
            //and change the button text to Sending...
            $('#contact-submit').attr({
                'disabled': 'false',
                'value': 'Sending...'
            });

            /* using the jquery's post(ajax) function and a lifesaver
            function serialize() which gets all the data from the form
            we submit it to send_email.php */
            $.post("sendmail.php", $("#contact-form").serialize(), function (result) {
                //and after the ajax request ends we check the text returned
                if (result == 'sent') {
                    //if the mail is sent remove the submit paragraph
                    $('#cf-submit').remove();
                    //and show the mail success div with fadeIn
                    $('#mail-success').fadeIn(500);
                } else {
                    //show the mail failed div
                    $('#mail-fail').fadeIn(500);
                    //re enable the submit button by removing attribute disabled and change the text back to Send The Message
                    $('#contact-submit').removeAttr('disabled').attr('value', 'Send The Message');
                }
            });
        }
    });

});
// End Jquery Function


/* ========================================================================= */
/*	Animated section
/* ========================================================================= */

var wow = new WOW({
    offset: 100, // distance to the element when triggering the animation (default is 0)
    mobile: false // trigger animations on mobile devices (default is true)
});
wow.init();


/* ========================================================================= */
/*	Smooth Scroll
/* ========================================================================= */
var scroll = new SmoothScroll('a[href*="#"]');



/* ========================================================================= */
/*	Google Map Customization
/* =========================================================================  */


function initialize() {

    var myLatLng = {
        lat: 40.173212,
        lng: 44.493989
    };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });


    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: '',
    });


    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    var styledMapOptions = {
        name: 'US Road Atlas'
    };

    var usRoadMapType = new google.maps.StyledMapType(
        roadAtlasStyles, styledMapOptions);

    map.mapTypes.set('roadatlas', usRoadMapType);
    map.setMapTypeId('roadatlas');
}

google.maps.event.addDomListener(window, "load", initialize);