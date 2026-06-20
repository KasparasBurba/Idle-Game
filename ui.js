const popup = document.getElementById("achievementPopup")
const achievementName = document.getElementById("achievementName")
const achievementDesc = document.getElementById("achievementDesc")

let popupTimeout

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
    { id: "coinsPerClick", getValue: () => formatNumber(game.coinsPerClick * game.clickMultiplier) },
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
    checkAchievements()
}

function updateItems() {
    items.forEach((item) => {
        item.amountElement.textContent = formatNumber(item.amount)
        item.costElement.textContent = formatNumber(item.cost)
        item.button.disabled = game.coins < item.cost

        if (item.multiElement) {
            item.multiElement.textContent = formatNumber(item.multi)
        }
        if (item.valueElement) {
            item.valueElement.textContent = item.formatValue()
        }
        if (item.incomeElement) {
            item.incomeElement.textContent = `+${formatNumber(item.income)}/s`
            const progress = (item.amount - item.previousMilestone) / (item.nextMilestone - item.previousMilestone) * 100
            item.button.style.setProperty("--progress", `${progress}%`)
        }
    })
}

function updateDisplays() {
    displays.forEach((display) => {
        document.getElementById(display.id).textContent = display.getValue()
    })
}

function updateSteal() {
    const progress = ((game.stealCooldownTime - game.stealTimeLeft) / game.stealCooldownTime) * 100
    if(game.stealCooldown) {
        elements.stealButton.textContent = `Stealing...\n${game.stealTimeLeft}s`
        elements.stealButton.style.setProperty("--progress", `${progress}%`)
    } else {
        elements.stealButton.textContent = "Steal"
        elements.stealButton.style.setProperty("--progress", "0%")
    }
}

function checkAchievements() {
    achievements.forEach((achievement) => {
        if(achievement.check()) {
            showAchievement(achievement)
            achievement.goal *= achievement.scale
            achievement.level++
            achievement.onUnlock()
        }
    })
}

function showAchievement (achievement) {
    clearTimeout(popupTimeout)

    achievementName.textContent = achievement.name
    achievementDesc.textContent = achievement.desc()

    popup.style.opacity = "1"
    popup.style.transform = "translateX(0)"
    popup.style.pointerEvents = "auto"

    popupTimeout = setTimeout(() => {
        popup.style.opacity = "0"
        popup.style.transform = "translateX(30px)"
        popup.style.pointerEvents = "none"
    }, 3000)
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