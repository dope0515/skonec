$(document).ready(function(){
    // 애니메이션 활성화 스크립트
    (function() {
        var elements = [];
        var elementTopPositions = [];
        var elementCount = $('.ani-effect').length;
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
            var scrollTop = $(this).scrollTop();
            var viewGuide = scrollTop + windowHeight / 1.3;

            // 요소 처리
            for (var i = 0; i < elementCount; i++) {
                if (!elements[i].hasClass('on') && viewGuide >= elementTopPositions[i]) {
                    elements[i].addClass('on');
                }
            }
        });
    })();

});