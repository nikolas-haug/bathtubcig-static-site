jQuery(document).ready(function($) {

        // Make space for fixed navbar on smaller screens when admin bar is visible (dev)
        $(document).ready(function($) {
            var height= $(".nojq").height();
            $(".main-navigation").css({top: height});
        });
    
        // toggle upcoming and past events display
        $('.jsSeePastShows').on('click', function() {
            $('.upcoming-shows').hide(500);
            $('.past-shows').show(500);
        });
        $('.jsSeeUpcomingShows').on('click', function() {
            $('.past-shows').hide(500);
            $('.upcoming-shows').show(500);
        });

  });