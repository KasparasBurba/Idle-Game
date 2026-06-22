elements.saveButton.addEventListener("click", () => {
    playSound(sounds.buy)
    saveGame()
})
elements.loadButton.addEventListener("click", () => {
    playSound(sounds.buy)
    loadGame()
})
elements.restartButton.addEventListener("click", () => {
    playSound(sounds.buy)
    restartGame()
})

document.addEventListener("click", () => {
    game.totalClicks += 1
})

items.forEach((item) => {
    document.getElementById(item.id).addEventListener("click", () => buyItem(item))
})

elements.autoSaveBox.addEventListener("change", () => {
    playSound(sounds.buy)
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
        playSound(sounds.steal)
        startInterval()
        updateAll()
        updateSteal()
    }
})

let achievementsInterval

elements.achievementsButton.addEventListener("click", () => {
    elements.achievementsModal.classList.remove("hidden")
    document.body.style.overflow = "hidden"
    updateAchievementsWindow()
    playSound(sounds.buy)
    achievementsInterval = setInterval(() =>{
        updateAchievementsWindow()
    }, 1000)
})

elements.closeAchievements.addEventListener("click", () => {
    clearInterval(achievementsInterval)
    elements.achievementsModal.classList.add("hidden")
    document.body.style.overflow = ""
    playSound(sounds.click)
})

elements.achievementsModal.addEventListener("click", (event) => {
    if (event.target === elements.achievementsModal) {
        clearInterval(achievementsInterval)
        elements.achievementsModal.classList.add("hidden")
        document.body.style.overflow = ""
        playSound(sounds.buy)
    }
})

let stealInterval

function startInterval () {
    if (stealInterval) return

    stealInterval = setInterval(() => {
        if(!game.stealCooldown) return

        game.stealTimeLeft--
        updateSteal()
        
        if(game.stealTimeLeft <= 0) {
            clearInterval(stealInterval)
            stealInterval = null

            const reward = game.coinsPerClick * game.clickMultiplier
            game.coins += reward
            playSound(sounds.click)
            showFloatingText(reward)
            for (let i = 0; i < 10; i++) {
                createParticle()
            }
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