(function () {
  'use strict';

  /* ---------------- 링크 설정 (config) ----------------
     실제 링크가 정해지면 아래 두 값만 교체하면 됩니다.
     - TOPBAR_SURVEY_URL : 탑바(메뉴 영역) "설문참여하기" 버튼
     - SECTION_SURVEY_URL: SURVEY 섹션 "설문 참여하기" 버튼
     두 버튼 모두 새 창(새 탭)으로 열립니다. */
  var CONFIG = {
    TOPBAR_SURVEY_URL: '#',
    SECTION_SURVEY_URL: '#'
  };

  function applyLink(selector, url) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.setAttribute('href', url);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  }
  applyLink('[data-link="topbar-survey"]', CONFIG.TOPBAR_SURVEY_URL);
  applyLink('[data-link="section-survey"]', CONFIG.SECTION_SURVEY_URL);

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- 햄버거 메뉴 토글 ---------------- */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileNav = document.getElementById('mobileNav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // 모바일 메뉴의 링크를 클릭하면 메뉴를 닫는다
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- stagger 딜레이 계산 ---------------- */
  // 같은 그룹(부모) 안에서 순서대로 0.12s씩 늘어나는 transition-delay 부여
  var staggerGroups = document.querySelectorAll(
    '.compare-cards, .how-made, .mini-cards, .social-cards, .entrance__pair'
  );
  staggerGroups.forEach(function (group) {
    var staggerItems = group.querySelectorAll('.reveal-stagger');
    staggerItems.forEach(function (el, index) {
      el.style.setProperty('--stagger-index', index);
    });
  });

  /* ---------------- 히어로: 로드 시 즉시 재생 ---------------- */
  var heroEls = document.querySelectorAll('.reveal-instant');
  window.requestAnimationFrame(function () {
    heroEls.forEach(function (el) {
      el.classList.add('in-view');
      console.log('[reveal] hero section played on load');
    });
  });

  /* ---------------- 스크롤 트리거 애니메이션 ---------------- */
  if (prefersReducedMotion) {
    // 모션 최소화 사용자: 모든 요소를 즉시 노출 (재생 없이)
    document.querySelectorAll('.reveal, .reveal-badge, .reveal-stagger').forEach(function (el) {
      el.classList.add('in-view');
    });
    console.log('[reveal] prefers-reduced-motion: reduce → animations skipped, elements shown immediately');
  } else if ('IntersectionObserver' in window) {
    // 히어로(.reveal-instant)는 대상에서 제외 — 로드 시 1회만 재생되고 스크롤 반복 대상이 아님
    var targets = document.querySelectorAll('.reveal, .reveal-badge, .reveal-stagger');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            console.log('[reveal] in-view (played):', describeElement(entry.target));
          } else {
            entry.target.classList.remove('in-view');
            console.log('[reveal] out-of-view (reset):', describeElement(entry.target));
          }
          // observer.unobserve()를 호출하지 않음 — 뷰포트를 드나들 때마다 계속 재생/리셋되도록 관찰을 유지
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );

    targets.forEach(function (el) { observer.observe(el); });
  } else {
    // IntersectionObserver 미지원 브라우저 대비 폴백
    document.querySelectorAll('.reveal, .reveal-badge, .reveal-stagger').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  function describeElement(el) {
    if (el.id) return '#' + el.id;
    if (el.className) return '.' + el.className.split(' ').join('.');
    return el.tagName.toLowerCase();
  }
})();
