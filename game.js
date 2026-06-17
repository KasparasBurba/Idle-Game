let coins = 0
let upgrade1Amount = 0
let minerAmount = 0
let tractorAmount = 0
let drillAmount = 0
let coinsPerSecond = 0
let minerCost = 50
let tractorCost = 200
let drillCost = 500
let upgrade1Cost = 10

const saveButton = document.getElementById("save")
const loadButton = document.getElementById("load")
const restartButton = document.getElementById("restart")
const autoSaveBox = document.getElementById("autoSave")
const stealButton = document.getElementById("steal")
const upgrade1Button = document.getElementById("upgrade1Button")
const minerButton = document.getElementById("miner")
const tractorButton = document.getElementById("tractor")
const drillButton = document.getElementById("drill")

let interval

function saveGame () {
    const saveData = {
        coins,
        upgrade1Amount,
        minerAmount,
        tractorAmount,
        drillAmount
    }

    const saveString = JSON.stringify(saveData)
    localStorage.setItem("saveString", saveString)
}

function loadGame () {
    const loadString = localStorage.getItem("saveString")

    if (loadString){
        const loadData = JSON.parse(loadString)
        coins = loadData.coins
        upgrade1Amount = loadData.upgrade1Amount
        minerAmount = loadData.minerAmount
        tractorAmount = loadData.tractorAmount
        drillAmount = loadData.drillAmount

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

function updateAll() {
    minerCost = 50 * (1.2 ** minerAmount)
    tractorCost = 200 * (1.2 ** tractorAmount)
    drillCost = 500 * (1.2 ** drillAmount)
    upgrade1Cost = 10 * (1.2 ** upgrade1Amount)
    document.getElementById("coins").textContent = coins.toFixed(0)
    document.getElementById("upgrade1Amount").textContent = upgrade1Amount.toFixed(0)
    document.getElementById("upgrade1Cost").textContent = upgrade1Cost.toFixed(0)
    document.getElementById("minerAmount").textContent = minerAmount.toFixed(0)
    document.getElementById("minerCost").textContent = minerCost.toFixed(0)
    document.getElementById("tractorAmount").textContent = tractorAmount.toFixed(0)
    document.getElementById("tractorCost").textContent = tractorCost.toFixed(0)
    document.getElementById("drillAmount").textContent = drillAmount.toFixed(0)
    document.getElementById("drillCost").textContent = drillCost.toFixed(0)
    document.getElementById("coinsPerSecond").textContent = coinsPerSecond.toFixed(0)
    upgrade1Button.disabled = coins < upgrade1Cost
    minerButton.disabled = coins < minerCost
    tractorButton.disabled = coins < tractorCost
    drillButton.disabled = coins < drillCost
}

function passiveIncome() {
    coinsPerSecond = minerAmount + tractorAmount * 5 + drillAmount * 20
    coins += coinsPerSecond
    updateAll()
}

saveButton.addEventListener("click", () => {
    saveGame()
})

loadButton.addEventListener("click", () => {
    loadGame()
})

restartButton.addEventListener("click", () => {
    restartGame()
})

autoSaveBox.addEventListener("change", () => {
    if (autoSaveBox.checked) {
        autoSave()
    } else {
        clearInterval(interval)
        interval = null
    }
})

stealButton.addEventListener("click", () => {
    coins += 1 + upgrade1Amount
    updateAll()
})

upgrade1Button.addEventListener("click", () => {
    if (coins >= upgrade1Cost) {
        coins -= upgrade1Cost
        upgrade1Amount += 1
        updateAll()
    }
})

minerButton.addEventListener("click", () => {
    if (coins >= minerCost) {
        coins -= minerCost
        minerAmount += 1
        updateAll()
    }
})

tractorButton.addEventListener("click", () => {
    if (coins >= tractorCost) {
        coins -= tractorCost
        tractorAmount += 1
        updateAll()
    }
})

drillButton.addEventListener("click", () => {
    if (coins >= drillCost) {
        coins -= drillCost
        drillAmount += 1
        updateAll()
    }
})

setInterval(passiveIncome, 1000)

loadGame()