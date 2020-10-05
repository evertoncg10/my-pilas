const alternador = document.getElementById("botao-chaveador");

alternador.onclick = function () {
  let menu = document.getElementById("menu");
  menu.classList.toggle("menu--exibindo");
};

/**
 *
 * Implementação de Scroll Suave para Link Interno
 * https://www.youtube.com/watch?v=tzbpAqb2Wjc
 * https://codepen.io/origamid/pen/eKGvdo
 *
 */

// let menuItens = Object.values(document.querySelectorAll('.menu__item a'));
// menuItens = menuItens.filter((item) => item.className !== "botao botao--login");

// [href^="#"] - para resgatar somente os links internos.
const menuItens = document.querySelectorAll('.navegacao a[href^="#"]');

menuItens.forEach((item) => {
  item.addEventListener("click", scrollToIdOnclick);
});

function scrollToIdOnclick(event) {
  event.preventDefault();
  const to = getScrollToByHref(event.target) - 60;
  scrollToPosition(to);
}

function getScrollToByHref(element) {
  let id = "#chamada";
  if (element.id !== "logo") {
    id = element.getAttribute("href");
  }
  return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  // window.scroll({
  //   top: to,
  //   behavior: "smooth",
  // });

  smoothScrollTo(0, to);
}

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
}
