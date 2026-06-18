elements.saveButton.addEventListener("click", saveGame)
elements.loadButton.addEventListener("click", loadGame)
elements.restartButton.addEventListener("click", restartGame)

document.addEventListener("click", () => {
    game.totalClicks += 1
})

upgrades.forEach((upgrade) => {
    document.getElementById(upgrade.id).addEventListener("click", () => buyUpgrade(upgrade))
})

buildings.forEach((building) => {
    document.getElementById(building.id).addEventListener("click", () => buyBuilding(building))
})

elements.autoSaveBox.addEventListener("change", () => {
    if (elements.autoSaveBox.checked) {
        autoSave()
    } else {
        clearInterval(interval)
        interval = null
    }
})

elements.stealButton.addEventListener("click", () => {
    game.coins += game.coinsPerClick
    game.totalCoinsEarned += game.coinsPerClick
    updateAll()
})