function saveGame () {
    const saveData = {
        game,
        upgrades,
        buildings
    }

    const saveString = JSON.stringify(saveData)
    localStorage.setItem("saveString", saveString)
}

function loadGame () {
    const loadString = localStorage.getItem("saveString")

    if (loadString){
        const loadData = JSON.parse(loadString)

        Object.assign(game, loadData.game)
        loadData.upgrades.forEach((savedUpgrade, index) => {
            upgrades[index].amount = savedUpgrade.amount
        })

        loadData.buildings.forEach((savedBuilding, index) => {
            buildings[index].amount = savedBuilding.amount
        })

        updateAll()
    }
}

function restartGame () {
    localStorage.removeItem("saveString")
    location.reload()
}

function autoSave () {
    interval = setInterval(() => {
        saveGame();
        console.log("Game saved")
    }, 2000)
}