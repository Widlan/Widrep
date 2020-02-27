var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10
  }
  
  function mineGold() {
    gameData.gold += gameData.goldPerClick
    document.getElementById('goldMined').innerHTML = gameData.gold + " Gold Mined"
  }
  
  function buyGoldPerClick() 
  {
    if (gameData.goldPerClickCost <= gameData.gold)
    {
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        document.getElementById('goldPerClick').innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost * 2 + " Gold"
        gameData.goldPerClickCost *= 2
        document.getElementById('goldMined').innerHTML = gameData.gold + " Gold Mined"
    }


  }

  var mainGameLoop = window.setInterval(function()
  {
    mineGold()
  }, 1000)

  var saveGameLoop = window.setInterval(function() {
    localStorage.setItem('goldMinerSave',JSON.stringify(gameData))
  }, 15000)