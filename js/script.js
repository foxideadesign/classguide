/* =========================================================
   클래스가이드 랜딩페이지 스크립트
   ========================================================= */

// TODO: 실제 구글폼(또는 신청 폼) URL로 교체하세요.
const CTA_LINK = "https://forms.gle/REPLACE_WITH_ACTUAL_FORM_URL";

document.addEventListener("DOMContentLoaded", () => {
  // 인증신청 CTA 버튼(GNB, SURVEY) 링크 일괄 적용 — 새 탭으로 열기
  document.querySelectorAll("[data-cta]").forEach((el) => {
    el.setAttribute("href", CTA_LINK);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // 모바일 GNB(햄버거 메뉴) 토글
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const gnb = document.getElementById("gnb");

  const closeMenu = () => {
    gnb.classList.remove("is-open");
    hamburgerBtn.classList.remove("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "메뉴 열기");
  };

  const openMenu = () => {
    gnb.classList.add("is-open");
    hamburgerBtn.classList.add("is-active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "메뉴 닫기");
  };

  hamburgerBtn.addEventListener("click", () => {
    if (gnb.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 메뉴 내 링크 클릭 시 자동으로 닫기 (앵커 이동 후 메뉴가 열려있지 않도록)
  gnb.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // 데스크톱 너비로 리사이즈되면 모바일 메뉴 상태 초기화
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
