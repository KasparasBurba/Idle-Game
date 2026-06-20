elements.saveButton.addEventListener("click", saveGame)
elements.loadButton.addEventListener("click", loadGame)
elements.restartButton.addEventListener("click", restartGame)

document.addEventListener("click", () => {
    game.totalClicks += 1
})

items.forEach((item) => {
    document.getElementById(item.id).addEventListener("click", () => buyItem(item))
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
    if(!game.stealCooldown) {
        game.stealTimeLeft = game.stealCooldownTime
        game.stealCooldown = true
        elements.stealButton.disabled = true
        startInterval()
        updateAll()
        updateSteal()
    }
})

let stealInterval

function startInterval () {
    if(stealInterval) return

    stealInterval = setInterval(() => {
        if(!game.stealCooldown) return

        game.stealTimeLeft--
        updateSteal()
        
        if(game.stealTimeLeft <= 0) {
            clearInterval(stealInterval)
            stealInterval = null

            const reward = game.coinsPerClick * game.clickMultiplier
            game.coins += reward
            showFloatingText(reward)
            game.totalCoinsEarned += reward
            elements.stealButton.disabled = false
            game.stealTimeLeft = game.stealCooldownTime
            game.stealCooldown = false
            game.coins += 1000000
            updateAll()
            updateSteal()
        }
    }, 1000)
}