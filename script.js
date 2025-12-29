const dvd = document.getElementById("dvd");
const logoA = document.querySelector(".logo-a");
const logoB = document.querySelector(".logo-b");

let showA = true;

// locks por borde
let touching = {
  top: false,
  bottom: false,
  left: false,
  right: false
};

let x = Math.random() * (window.innerWidth - dvd.offsetWidth);
let y = Math.random() * (window.innerHeight - dvd.offsetHeight);

// velocidad adaptativa
let speed = window.innerWidth <= 768 ? 0.9 : 1.4;
let vx = speed;
let vy = speed;

// tamaños (se inicializan correctamente)
let dvdWidth = 0;
let dvdHeight = 0;

function updateSizes() {
  dvdWidth = dvd.offsetWidth;
  dvdHeight = dvd.offsetHeight;
}

function toggleLogo() {
  showA = !showA;
  logoA.style.display = showA ? "block" : "none";
  logoB.style.display = showA ? "none" : "block";
}

function animate() {
  // seguridad: si aún no hay tamaño, no animamos
  if (!dvdWidth || !dvdHeight) {
    updateSizes();
    requestAnimationFrame(animate);
    return;
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  x += vx;
  y += vy;

  /* ---------- LEFT ---------- */
  if (x <= 0) {
    x = 0;
    if (!touching.left) {
      vx *= -1;
      toggleLogo();
      touching.left = true;
    }
  } else {
    touching.left = false;
  }

  /* ---------- RIGHT ---------- */
  if (x + dvdWidth >= screenWidth) {
    x = screenWidth - dvdWidth;
    if (!touching.right) {
      vx *= -1;
      toggleLogo();
      touching.right = true;
    }
  } else {
    touching.right = false;
  }

  /* ---------- TOP ---------- */
  if (y <= 0) {
    y = 0;
    if (!touching.top) {
      vy *= -1;
      toggleLogo();
      touching.top = true;
    }
  } else {
    touching.top = false;
  }

  /* ---------- BOTTOM ---------- */
  if (y + dvdHeight >= screenHeight) {
    y = screenHeight - dvdHeight;
    if (!touching.bottom) {
      vy *= -1;
      toggleLogo();
      touching.bottom = true;
    }
  } else {
    touching.bottom = false;
  }

  dvd.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(animate);
}

/* ---------- INIT ---------- */

// esperar a que todo exista
window.addEventListener("load", () => {
  updateSizes();
  animate();
});

// recalcular en resize (rotación móvil incluida)
window.addEventListener("resize", () => {
  updateSizes();

  speed = window.innerWidth <= 768 ? 1.2 : 2;
  vx = Math.sign(vx) || 1;
  vy = Math.sign(vy) || 1;
  vx *= speed;
  vy *= speed;
});