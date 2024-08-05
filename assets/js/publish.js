$(document).ready(function(){
    /*애니메이션 활성화 스크립트*/		
    (function() {
        var elements = [];
        var elementTopPositions = [];
        var elementCount = $('.ani-effect').length;

        var scrollTop;
        var windowHeight = $(window).height();

        // 페이지 로드 시와 스크롤 시 처리
        $(window).on('load scroll resize', function() {
            // 초기화 및 요소 위치 계산
            if (elements.length === 0) {
            for (var i = 0; i < elementCount; i++) {
                elements[i] = $('.ani-effect').eq(i);
                elementTopPositions[i] = elements[i].offset().top;
            }
            }

            // 현재 스크롤 위치
            scrollTop = $(this).scrollTop();
            var viewGuide = scrollTop + windowHeight / 1.3;

            // 요소 처리
            for (var i = 0; i < elementCount; i++) {
            if (!elements[i].hasClass('on') && viewGuide >= elementTopPositions[i]) {
                elements[i].addClass('on');
            }
            }
        });
    })();
    
    var link = $('.anchor-list a');
    var linkM = $('.anchor-list-mobile a');

    // Smooth scroll function
    link.on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var targetPosition = $(target).offset().top; // Adjust the offset if needed

        $('html, body').animate({
            scrollTop: targetPosition
        }, 500); // 500ms for smooth scroll
    });

    function findPosition() {
        var lastActiveSection = null;

        $('.section').each(function () {
            if ($(this).offset().top - $(window).scrollTop() - 100 < 20) {
                lastActiveSection = $(this).attr('id');
            }
        });

        if (lastActiveSection) {
            link.removeClass('on');
            linkM.removeClass('on');
            var targetId = lastActiveSection;

            // If the last active section is below 'support', keep 'support' active
            if (['notice', 'faq'].includes(targetId)) {
                targetId = 'support';
            }

            $('.anchor-list')
                .find('[data-scroll="' + targetId + '"]')
                .addClass('on');
        }
    }

    $(window).on('scroll', findPosition);
    findPosition();
    //모바일 nav 링크 클릭시 aside 초기화
    $('.nav-mobile .depth-1 > .link').on('click', function () {
        $('.nav-mobile').removeClass('active');
        $('.nav-mobile__bg').fadeOut();
    });
    //헤더로고 클릭시 페이지 제일 상단으로 이동하기 (메인페이지에서만 기능)
    let acting = false;
    $('.header .logo').on('click', function () {
        if (window.pageYOffset < 50 || acting) return;
        acting = true;
        $('html, body').animate({ scrollTop: 0 }, 600);
        setTimeout(function(){
            acting = false;
        },600);
    });
    $('.scroll-down').click(function() {
        $('html, body').animate({
        scrollTop: $('#episode').offset().top
        }, 'slow');
    });
});