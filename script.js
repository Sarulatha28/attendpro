// Change navbar background on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// Toggle the navigation menu on mobile
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

// Close menu automatically when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("show");
  });
});
