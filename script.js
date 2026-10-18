const slides = document.querySelectorAll(".main-visual .slide");
let currentIndex = 0;

function changeSlide() {
  slides[currentIndex].classList.remove("active");

  currentIndex++;

  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }

  slides[currentIndex].classList.add("active");
}

if (slides.length > 1) {
  setInterval(changeSlide, 4000);
}


const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

fadeElements.forEach((element) => {
  observer.observe(element);
});

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    nav.classList.remove("open");
  });
});


// const header = document.querySelector("header");

// function toggleHeader() {
//   if (window.scrollY > 1) {
//     header.classList.add("is-visible");
//   } else {
//     header.classList.remove("is-visible");
//   }
// }

// window.addEventListener("scroll", toggleHeader, {
//   passive: true
// });

// toggleHeader();


const loading = document.getElementById("loading");

// このタブで初めて開いたときだけ表示
if (sessionStorage.getItem("ratomLoadingShown")) {

  // 2回目以降は表示しない
  loading.remove();

} else {

  // 表示済みの記録を保存
  sessionStorage.setItem("ratomLoadingShown", "true");

  // ローディング画面を消す
  window.addEventListener("load", () => {
    setTimeout(() => {
      loading.classList.add("is-hidden");

      // フェードアウト後に要素を削除
      setTimeout(() => {
        loading.remove();
      }, 800);

    }, 1800);
  });
}