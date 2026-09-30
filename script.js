const NAME = "Wrida Chebbi";
const el = document.getElementById("typed-name");

function typeName(i = 0) {
  if (!el) return;
  el.textContent = NAME.slice(0, i);
  if (i < NAME.length) setTimeout(() => typeName(i + 1), 55);
}
typeName();

const printBtn = document.getElementById("printBtn");
if (printBtn) {
  printBtn.addEventListener("click", () => window.print());
}
