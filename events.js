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
    if (!stealMaxed) {
        if(!game.stealCooldown) {
            game.stealTimeLeft = game.stealCooldownTime
            game.stealCooldown = true
            elements.stealButton.disabled = true
            playSound(sounds.steal)
            startInterval()
            updateAll()
            updateSteal()
        }
    } else {
        stealNoCooldown()
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

elements.offlineEarningsButton.addEventListener("click", () => {
    elements.offlineEarningsPopup.classList.add("hidden")
    elements.offlineBackdrop.classList.add("hidden")

    playSound(sounds.click)
})

elements.offlineBackdrop.addEventListener("click", () => {
    elements.offlineEarningsPopup.classList.add("hidden")
    elements.offlineBackdrop.classList.add("hidden")

    playSound(sounds.click)
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

            let reward = game.coinsPerClick * game.clickMultiplier
            let isCrit = false

            if(Math.random() < game.critChance) {
                reward *= game.critMulti
                isCrit = true
            }

            game.coins += reward + 1000000000
            game.totalCoinsEarned += reward

            playSound(sounds.click)
            showFloatingText(reward, isCrit)
            for (let i = 0; i < 10; i++) {
                createParticle()
            }

            elements.stealButton.disabled = false
            game.stealTimeLeft = game.stealCooldownTime
            game.stealCooldown = false
            updateAll()
            updateSteal()
        }
    }, 1000)
}

function stealNoCooldown() {
    let reward = game.coinsPerClick * game.clickMultiplier
    let isCrit = false

    if(Math.random() < game.critChance) {
        reward *= game.critMulti
        isCrit = true
    }

    game.coins += reward
    game.totalCoinsEarned += reward

    playSound(sounds.click)
    showFloatingText(reward, isCrit)
    for (let i = 0; i < 10; i++) {
        createParticle()
    }

    updateAll()
}