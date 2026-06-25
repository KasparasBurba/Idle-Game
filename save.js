function saveGame () {
    const saveData = {
        lastSaveTime: Date.now(),
        game,
        items: items.map((item) => ({
            id: item.id,
            amount: item.amount,
            cost: item.cost,
            ...(item.multi !== undefined && {multi: item.multi}),
            ...(item.value !== undefined && {value: item.value})
        }))
    }
    console.log(saveData.lastSaveTime)
    localStorage.setItem("saveString", JSON.stringify(saveData))
}

function loadGame () {
    const loadString = localStorage.getItem("saveString")

    if (loadString) {
        const loadData = JSON.parse(loadString)

        Object.assign(game, loadData.game)
        clearInterval(stealInterval)
        stealInterval = null
        game.stealCooldown = false
        game.stealTimeLeft = game.stealCooldownTime
        elements.stealButton.disabled = false

        loadData.items.forEach((savedItem) => {
            const item = items.find((item) => item.id === savedItem.id)

            if (item) {
                item.amount = savedItem.amount
                item.cost = savedItem.cost
                
                if (savedItem.multi !== undefined) {
                    item.multi = savedItem.multi
                }
                if (savedItem.value !== undefined) {
                    item.value = savedItem.value
                }
            }
        })

        const secondsAway = Math.floor((Date.now() - loadData.lastSaveTime) / 1000)
        const offlineEarnings = secondsAway * game.coinsPerSecond
        game.coins += offlineEarnings
        game.totalCoinsEarned += offlineEarnings

        console.log(offlineEarnings)
        updateAll()
        updateSteal()
    }
}

function restartGame () {
    localStorage.removeItem("saveString")
    location.reload()
}

function autoSave () {
    if (interval) return

    interval = setInterval(() => {
        saveGame();
        console.log("Game saved")
    }, 2000)
}