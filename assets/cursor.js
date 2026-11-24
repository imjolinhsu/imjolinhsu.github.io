// Pink pill cursor that follows the mouse over project cards.
// Each card sets its label with data-cursor="View me" or "Coming soon".
(function () {
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!finePointer) return;

  var tag = document.createElement("div");
  tag.className = "cursor-tag";
  tag.setAttribute("aria-hidden", "true");
  document.body.appendChild(tag);
  document.documentElement.classList.add("has-cursor-tag");

  var x = 0, y = 0, raf = null;
  function place() {
    tag.style.left = x + "px";
    tag.style.top = y + "px";
    raf = null;
  }
  document.addEventListener("mousemove", function (e) {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(place);
  });

  document.querySelectorAll("[data-cursor]").forEach(function (card) {
    card.addEventListener("mouseenter", function (e) {
      x = e.clientX; y = e.clientY; place();
      tag.textContent = card.getAttribute("data-cursor");
      tag.classList.toggle("is-soon", card.getAttribute("data-cursor") === "Coming soon");
      tag.classList.add("is-on");
    });
    card.addEventListener("mouseleave", function () {
      tag.classList.remove("is-on");
    });
  });

})();
