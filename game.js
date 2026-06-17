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

const stealButton = document.getElementById("steal")

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
}

function passiveIncome() {
    coinsPerSecond = minerAmount + tractorAmount * 5 + drillAmount * 20
    coins += coinsPerSecond
    updateAll()
}

stealButton.addEventListener("click", () => {
    coins += 1 + upgrade1Amount
    updateAll()
})

const upgrade1Button = document.getElementById("upgrade1Button")

upgrade1Button.addEventListener("click", () => {
    if (coins >= upgrade1Cost) {
        coins -= upgrade1Cost
        upgrade1Amount += 1
        updateAll()
    }
})

const miner = document.getElementById("miner")

miner.addEventListener("click", () => {
    if (coins >= minerCost) {
        coins -= minerCost
        minerAmount += 1
        updateAll()
    }
})

const tractor = document.getElementById("tractor")

tractor.addEventListener("click", () => {
    if (coins >= tractorCost) {
        coins -= tractorCost
        tractorAmount += 1
        updateAll()
    }
})

const drill = document.getElementById("drill")

drill.addEventListener("click", () => {
    if (coins >= drillCost) {
        coins -= drillCost
        drillAmount += 1
        updateAll()
    }
})

setInterval(passiveIncome, 1000)