$(document).ready(function(){

    $('#profile_ripple').ripples({
        resolution: 512,
        dropRadius: 10
    });


    const bars = document.querySelectorAll('.progress_bar');

    bars.forEach(function(bar){
        let percentage = bar.dataset.percent;
        let tooltip = bar.children[0];
        tooltip.innerText = percentage + '%';
        bar.style.width = percentage + '%';
    })

    // Counter

    const counters = document.querySelectorAll('.counter');
    function runCounter(){
        counters.forEach(counter => {
            counter.innerText = 0;
            let target = +counter.dataset.count;
            let step = target / 1;

            let countIt = function(){
                let displayedCount = +counter.innerText;
                if(displayedCount < target) {

                    counter.innerText = Math.ceil(displayedCount + step);
                    // countIt(); //browser doesnt refres  so we use a small fix
                    setTimeout(countIt, 1);
                } else{
                    counter.innerText = target;
                }
            }

            countIt();

        })
    }


    let counterSection = document.querySelector('.counter_section');

    let options = {
        rootMargin : '0px 0px -1000px 0px'
    }
    let done = 0;
    const sectionObserver = new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting && done != 1) {
            done =1;
            runCounter();
        }
    }, options)

    sectionObserver.observe(counterSection);



    // work image filter

    var $wrapper = $('.portfolio_wrapper');


    // Initializing isotope plugin

    $wrapper.isotope({
        filer: '*',
        layoutMode : 'masonry',
        animationOptions : {
            duration: 750,
            easing: 'liner'
        }
    });


    let links = document.querySelectorAll('.tabs a');

    links.forEach(link => {

        let selector = link.dataset.filter;

        link.addEventListener('click', function(e) {
            e.preventDefault();

            $wrapper.isotope({
                filter : selector,
                layoutMode : 'masonry',
                animationOptions : {
                    duration: 750,
                    easing: 'liner'
                }
            });

            e.target.classList.add('active');

            links.forEach(link => {
                link.classList.remove('active');
            })

            e.target.classList.add('active');

        });
    })



    // Magnify popup

    $('.magnify').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enable: true
        }
    })


});

