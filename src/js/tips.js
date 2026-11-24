(function () {
  var q = document.getElementById("f-q");
  var cat = document.getElementById("f-category");
  var game = document.getElementById("f-game");
  var status = document.getElementById("f-status");
  var cards = Array.prototype.slice.call(document.querySelectorAll("#tip-list .tip"));
  var count = document.getElementById("tip-count");
  function apply() {
    var text = q.value.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (c) {
      var ok =
        (!cat.value || c.dataset.category === cat.value) &&
        (!status.value || c.dataset.status === status.value) &&
        (!game.value || c.dataset.games.split(" ").indexOf(game.value) !== -1) &&
        (!text || c.dataset.text.indexOf(text) !== -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = shown + " of " + cards.length + " tips";
  }
  [q, cat, game, status].forEach(function (el) { el.addEventListener("input", apply); });
  apply();
})();
