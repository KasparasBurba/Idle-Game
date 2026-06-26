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
    { id: "timePlayed", getValue: () => formatTime(game.timePlayed) },
    { id: "coinsPerSecond", getValue: () => formatNumber(game.coinsPerSecond) },
    { id: "coinsPerClick", getValue: () => formatNumber(game.coinsPerClick * game.clickMultiplier) },
    { id: "coins", getValue: () => formatNumber(game.coins) }
]

const elements = {
    saveButton: document.getElementById("save"),
    loadButton: document.getElementById("load"),
    restartButton: document.getElementById("restart"),
    autoSaveBox: document.getElementById("autoSave"),
    stealButton: document.getElementById("steal"),
    popup: document.getElementById("achievementPopup"),
    achievementName: document.getElementById("achievementName"),
    achievementDesc: document.getElementById("achievementDesc"),
    achievementsButton: document.getElementById("achievementsButton"),
    closeAchievements: document.getElementById("closeAchievements"),
    achievementsModal: document.getElementById("achievementsModal"),
    achievementsList: document.getElementById("achievementsList"),
    offlineBackdrop: document.getElementById("offlineBackdrop"),
    offlineEarningsPopup: document.getElementById("offlineEarningsPopup"),
    offlineEarningsElement: document.getElementById("offlineEarnings"),
    offlineEarningsButton: document.getElementById("offlineEarningsButton"),
    timeAwayElement: document.getElementById("timeAway"),
    prestigeButton: document.getElementById("prestigeButton"),
    prestigeModal: document.getElementById("prestigeModal"),
    prestigeModalClose: document.getElementById("prestigeModalClose"),
    currentPrestigePoints: document.getElementById("currentPrestigePoints"),
    prestigePoints: document.getElementById("prestigePoints"),
    totalPrestigePoints: document.getElementById("totalPrestigePoints"),
    prestigeConfirmButton: document.getElementById("prestigeConfirm"),
    prestigeMultiplier: document.getElementById("prestigeMultiplier"),
    prestigeFormula: document.getElementById("prestigeFormula"),
    menuButton: document.getElementById("menu"),
    menuModal: document.getElementById("menuModal"),
    closeMenu: document.getElementById("closeMenu"),
    soundVolume: document.getElementById("soundVolume"),
    muteSound: document.getElementById("muteSound")
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

        if (item.maxAmount) {
            item.button.disabled = game.coins < item.cost || item.amount >= item.maxAmount
            if (item.amount >= item.maxAmount) {
                item.costElement.textContent = "MAXED"
            }
        }
        if (item.maxAmountElement) {
            item.maxAmountElement.textContent = item.maxAmount
        }
        if (item.multiElement) {
            item.multiElement.textContent = formatNumber(item.multi)
        }
        if (item.valueElement) {
            item.valueElement.textContent = item.formatValue()
        }
        if (item.upDescElement) {
            item.upDescElement.textContent = item.upDesc
        }
        if (item.incomeElement) {
            item.incomeElement.textContent = `+${formatNumber(item.income)}/s`
            const progress = (item.amount - item.previousMilestone) / (item.nextMilestone - item.previousMilestone) * 100
            item.button.style.setProperty("--progress", `${progress}%`)
        }
        if (item.rewardElement) {
            item.rewardElement.textContent = `${formatNumber(item.currentReward)}x`
            item.goalElement.textContent =  `${formatNumber(item.amount)}/${formatNumber(item.nextMilestone)}`
            item.totalElement.textContent = `+${formatNumber(item.income*item.amount)}/s`
        }
    })
}

function updateDisplays() {
    displays.forEach((display) => {
        document.getElementById(display.id).textContent = display.getValue()
    })
    if (game.coins >= 1000000) {
        elements.prestigeButton.classList.remove("hidden")
    }
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

            playSound(sounds.achievement)
        }
    })
}

function showAchievement (achievement) {
    clearTimeout(popupTimeout)

    elements.achievementName.textContent = achievement.name
    elements.achievementDesc.textContent = achievement.desc()

    elements.popup.style.opacity = "1"
    elements.popup.style.transform = "translateX(0)"
    elements.popup.style.pointerEvents = "auto"

    popupTimeout = setTimeout(() => {
        elements.popup.style.opacity = "0"
        elements.popup.style.transform = "translateX(30px)"
        elements.popup.style.pointerEvents = "none"
    }, 3000)
}

function updateAchievementsWindow () {
    document.getElementById("totalAchievements").textContent = formatNumber(game.achievementsTotal)
    document.getElementById("achievementsClickBonus").textContent = formatNumber((game.achievementsClickBonus*100)-100)
    document.getElementById("achievementsPassiveBonus").textContent = formatNumber((game.achievementsPassiveBonus*100)-100)

    const list = elements.achievementsList
    list.innerHTML = ""

    achievements.forEach((achievement) => {
        const element = document.createElement("div")
        element.classList.add("achievement-card")
        const title = document.createElement("h3")
        title.textContent = achievement.name
        element.appendChild(title)
        const desc = document.createElement("p")
        desc.textContent = achievement.desc()
        element.appendChild(desc)
        const goal = document.createElement("p")

        if(achievement.id === "achiev4") {
            goal.textContent = `${formatTime(achievement.value())} / ${formatTime(achievement.goal)}`
        } else {
            goal.textContent = `${formatNumber(achievement.value())} / ${formatNumber(achievement.goal)}`
        }

        if(achievement.level <= 0) {
            element.classList.add("achievement-card-locked")
        } else {
            element.classList.add("achievement-card-unlocked")
        }
        
        element.appendChild(goal)
        list.appendChild(element)
    })
}

function offlineEarningsPopup() {
    elements.timeAwayElement.textContent = formatTime(secondsAway)
    elements.offlineEarningsElement.textContent = formatNumber(offlineEarnings)

    elements.offlineEarningsPopup.classList.remove("hidden")
    elements.offlineBackdrop.classList.remove("hidden")
}

function prestigeStats() {
    game.prestigePoints = game.totalCoinsEarned / game.prestigePointsFormula

    elements.currentPrestigePoints.textContent = formatNumber(game.currentPrestigePoints)
    elements.prestigeMultiplier.textContent = formatNumber(game.prestigeMultiplier)
    elements.prestigeFormula.textContent = formatNumber(game.currentPrestigePoints * game.prestigeMultiplier)
    elements.prestigePoints.textContent = formatNumber(game.prestigePoints + game.currentPrestigePoints)
    elements.totalPrestigePoints.textContent = formatNumber(game.totalPrestigePoints)
}

const container = document.getElementById("floatingTextContainer")

function showFloatingText(amount, isCrit) {
        const element = document.createElement("div")

        if (isCrit) {
            element.textContent = `CRIT +${formatNumber(amount)}`
        } else {
            element.textContent = `+${formatNumber(amount)}`
        }
        element.classList.add("floating-text")

        container.appendChild(element)

        setTimeout(() => {
            element.remove()
        }, 1000)
}

function createParticle() {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    const randomX = Math.random() * 60 - 30
    particle.style.left = `calc(52% + ${randomX}px)`
    const drandomX = Math.random() * 60 - 20
    particle.style.setProperty("--moveX", `${drandomX}px`)
    const drandomY = Math.random() * 50 
    particle.style.setProperty("--moveY", `${drandomY}px`)

    container.appendChild(particle)

    setTimeout(() => {
        particle.remove()
    }, 1000)
}

function formatNumber (number) {
    let index = 0

    while(number >= 1000 && index < suffixes.length - 1) {
        number /= 1000
        index++
    }
    if (!Number.isInteger(number)) {
        return number.toFixed(2) + suffixes[index]
    } else {
        return number.toFixed(0) + suffixes[index]
    }
}

function formatTime(time) {
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time % 3600) / 60)
    let seconds = time % 60

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`
    }

    if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    }

    return `${seconds}s`
}