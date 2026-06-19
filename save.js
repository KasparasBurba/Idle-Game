function saveGame () {
    const saveData = {
        game,
        items: items.map((item) => ({
            id: item.id,
            amount: item.amount,
            cost: item.cost
        }))
    }

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
            }
        })

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