var saveGame = localStorage.getItem("goldMinerSave");
var gameData = {
  gold: 0,
  goldPerClick: 1,
  goldPerClickCost: 10,
  lastTick: Date.now()
};

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function mineGold() {
  gameData.gold += gameData.goldPerClick;
  update("goldMined", format(gameData.gold, "sci") + " Gold Mined");
}

function buyGoldPerClick() {
  if (gameData.gold >= gameData.goldPerClickCost) {
    gameData.gold -= gameData.goldPerClickCost;
    gameData.goldPerClick += 1;
    gameData.goldPerClickCost *= 2;
    update("goldMined", format(gameData.gold, "sci") + " Gold Mined");
    update(
      "perClickUpgrade",
      "Upgrade Pickaxe (Currently Level " +
        format(gameData.goldPerClick, "sci") +
        ") Cost: " +
        format(gameData.goldPerClickCost, "sci") +
        " Gold"
    );
  }
}

var mainGameLoop = window.setInterval(function() {
  diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now();
  gameData.gold += gameData.goldPerClick * (diff / 1000);
  update("goldMined", format(gameData.gold, "sci") + " Gold Mined");
}, 1000);

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("goldMinerSave", JSON.stringify(gameData));
if (typeof saveGame.gold !== "undefined") gameData.gold = saveGame.gold;
if (typeof saveGame.goldPerClick !== "undefined") gameData.goldPerClick = saveGame.goldPerClick;
if (typeof saveGame.goldPerClickCost !== "undefined") gameData.goldPerClickCost = saveGame.goldPerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
}, 15000);

function tab(tab) {
  // hide all your tabs, then show the one the user selected.
  document.getElementById("mineGoldMenu").style.display = "none"
  document.getElementById("shopMenu").style.display = "none"
  document.getElementById(tab).style.display = "inline-block"
}
// go to a tab for the first time, so not all show
tab("mineGoldMenu")

function format(number, type) {
  let exponent = Math.floor(Math.log10(number));
  let mantissa = number / Math.pow(10, exponent);
  if (exponent < 3) return number.toFixed(1);
  if (type == "sci") return mantissa.toFixed(2) + "e" + exponent;
  if (type == "engi")
    return (
      (Math.pow(10, exponent % 3) * mantissa).toFixed(2) +
      "e" +
      Math.floor(exponent / 3) * 3
    );
}
