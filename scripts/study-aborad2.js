// script.js
function toggleMenu() {
  const menu = document.querySelector('.menu-items');
  const menuIcon = document.querySelector('.menu-icon');
  const menuStyle = getComputedStyle(menu);
  
  if (menuStyle.right === '0px') {
    menu.style.right = '-100%';
    menuIcon.classList.remove('cross');
  } else {
    menu.style.right = '0px';
    menuIcon.classList.add('cross');
  }
}

document.addEventListener("DOMContentLoaded", () => {
const hiddenElements = document.querySelectorAll('.hidden');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

hiddenElements.forEach(element => observer.observe(element));
});