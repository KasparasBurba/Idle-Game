const suffixes = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc"
]

const displays = [
    { id: "totalCoinsEarned", getValue: () => formatNumber(game.totalCoinsEarned) },
    { id: "totalClicks", getValue: () => formatNumber(game.totalClicks) },
    { id: "timePlayed", getValue: () => formatTime() },
    { id: "coinsPerSecond", getValue: () => formatNumber(game.coinsPerSecond) },
    { id: "coinsPerClick", getValue: () => formatNumber(game.coinsPerClick) },
    { id: "coins", getValue: () => formatNumber(game.coins) }
]

const elements = {
    saveButton: document.getElementById("save"),
    loadButton: document.getElementById("load"),
    restartButton: document.getElementById("restart"),
    autoSaveBox: document.getElementById("autoSave"),
    stealButton: document.getElementById("steal")
}

function updateAll() {
    updateItems()
    updateDisplays()
}

function updateItems() {
    items.forEach((item) => {
        item.amountElement.textContent = formatNumber(item.amount)
        item.costElement.textContent = formatNumber(item.cost)
        item.button.disabled = game.coins < item.cost
    })
}

function updateDisplays() {
    displays.forEach((display) => {
        document.getElementById(display.id).textContent = display.getValue()
    })
}

function formatNumber (number) {
    let index = 0
    while(number >= 1000 && index < suffixes.length - 1) {
        number /= 1000
        index++
    }

    return number.toFixed(2) + suffixes[index]
}

function formatTime() {
    let hours = Math.floor(game.timePlayed / 3600)
    let minutes = Math.floor((game.timePlayed % 3600) / 60)
    let seconds = game.timePlayed % 60

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`
    }

    if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    }

    return `${seconds}s`
}