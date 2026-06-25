let interval
let stealMaxed = false

const game = {
    coins: 0,
    coinsPerSecond: 0,
    coinsPerClick: 1,
    totalCoinsEarned: 0,
    totalClicks: 0,
    timePlayed: 0,
    critChance: 0.5,
    critMulti: 5,
    clickMultiplier: 1,
    passiveIncomeMulti: 1,
    achievementsTotal: 0,
    achievementsClickBonus: 1,
    achievementsPassiveBonus: 1,
    currentPrestigePoints: 0,
    prestigePoints: 0,
    totalPrestigePoints: 0,
    prestigeMultiplier: 0,
    prestigePointsFormula: 1000000,

    stealCooldown: false,
    stealTimeLeft: 8,
    stealCooldownTime: 8
}

let items = [
    {
        type: "upgrade",
        id: "upgrade1",
        upDesc: "Double click power!",
        button: document.getElementById("upgrade1"),
        amountElement: document.getElementById("upgrade1Amount"),
        maxAmountElement: document.getElementById("upgrade1MaxAmount"),
        multiElement: document.getElementById("upgrade1Multi"),
        costElement: document.getElementById("upgrade1Cost"),
        upDescElement: document.getElementById("up1Desc"),
        amount: 0,
        maxAmount: 1000,
        multi: 1,
        baseCost: 5,
        cost: 5,
        costMulti: 4,
        
        onBuy() {
            this.multi *= 2
            game.clickMultiplier *= 2
        },

        maxed() {

        }
    },
    {
        type: "upgrade",
        id: "upgrade2",
        upDesc: "Smaller steal cooldown!",
        button: document.getElementById("upgrade2"),
        amountElement: document.getElementById("upgrade2Amount"),
        maxAmountElement: document.getElementById("upgrade2MaxAmount"),
        valueElement: document.getElementById("upgrade2Value"),
        costElement: document.getElementById("upgrade2Cost"),
        upDescElement: document.getElementById("up2Desc"),
        amount: 0,
        maxAmount: 8,
        value: 0,
        baseCost: 10,
        cost: 10,
        costMulti: 100,

        formatValue() {
            return `-${this.value}s`
        },

        onBuy() {
            this.value++
            game.stealCooldownTime--
        },

        maxed() {
            stealMaxed = true
        }
    },
    {
        type: "upgrade",
        id: "upgrade3",
        upDesc: "Double passive income!",
        button: document.getElementById("upgrade3"),
        amountElement: document.getElementById("upgrade3Amount"),
        maxAmountElement: document.getElementById("upgrade3MaxAmount"),
        multiElement: document.getElementById("upgrade3Multi"),
        costElement: document.getElementById("upgrade3Cost"),
        upDescElement: document.getElementById("up3Desc"),
        amount: 0,
        maxAmount: 1000,
        multi: 1,
        baseCost: 20,
        cost: 20,
        costMulti: 4,
        
        onBuy() {
            this.multi *= 2
            game.passiveIncomeMulti *= 2
        },

        maxed() {

        }
    },
    {
        type: "upgrade",
        id: "upgrade4",
        upDesc: "More base clicks!",
        button: document.getElementById("upgrade4"),
        amountElement: document.getElementById("upgrade4Amount"),
        maxAmountElement: document.getElementById("upgrade4MaxAmount"),
        valueElement: document.getElementById("upgrade4Value"),
        costElement: document.getElementById("upgrade4Cost"),
        upDescElement: document.getElementById("up4Desc"),
        amount: 0,
        maxAmount: 1000,
        value: 0,
        baseCost: 100,
        cost: 100,
        costMulti: 4,

        formatValue() {
            return `+${this.value}`
        },

        onBuy() {
            this.value += 10
            game.coinsPerClick += 10
        },

        maxed() {

        }
    },
    {
        type: "building",
        id: "building1",
        button: document.getElementById("building1"),
        amountElement: document.getElementById("building1Amount"),
        costElement: document.getElementById("building1Cost"),
        incomeElement: document.getElementById("building1Income"),
        rewardElement: document.getElementById("building1Reward"),
        goalElement: document.getElementById("building1Goal"),
        totalElement: document.getElementById("building1Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 50,
        cost:50,
        costMulti: 1.2,
        baseIncome: 1,
        income: 1,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {

        }
    },
    {
        type: "building",
        id: "building2",
        button: document.getElementById("building2"),
        amountElement: document.getElementById("building2Amount"),
        costElement: document.getElementById("building2Cost"),
        incomeElement: document.getElementById("building2Income"),
        rewardElement: document.getElementById("building2Reward"),
        goalElement: document.getElementById("building2Goal"),
        totalElement: document.getElementById("building2Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 200,
        cost: 200,
        costMulti: 1.2,
        baseIncome: 5,
        income: 5,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {
            
        }
    },
    {
        type: "building",
        id: "building3",
        button: document.getElementById("building3"),
        amountElement: document.getElementById("building3Amount"),
        costElement: document.getElementById("building3Cost"),
        incomeElement: document.getElementById("building3Income"),
        rewardElement: document.getElementById("building3Reward"),
        goalElement: document.getElementById("building3Goal"),
        totalElement: document.getElementById("building3Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 500,
        cost: 500,
        costMulti: 1.2,
        baseIncome: 20,
        income: 20,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {
            
        }
    },
    {
        type: "building",
        id: "building4",
        button: document.getElementById("building4"),
        amountElement: document.getElementById("building4Amount"),
        costElement: document.getElementById("building4Cost"),
        incomeElement: document.getElementById("building4Income"),
        rewardElement: document.getElementById("building4Reward"),
        goalElement: document.getElementById("building4Goal"),
        totalElement: document.getElementById("building4Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 2500,
        cost: 2500,
        costMulti: 1.2,
        baseIncome: 100,
        income: 100,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {
            
        }
    },
    {
        type: "building",
        id: "building5",
        button: document.getElementById("building5"),
        amountElement: document.getElementById("building5Amount"),
        costElement: document.getElementById("building5Cost"),
        incomeElement: document.getElementById("building5Income"),
        rewardElement: document.getElementById("building5Reward"),
        goalElement: document.getElementById("building5Goal"),
        totalElement: document.getElementById("building5Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 10000,
        cost: 10000,
        costMulti: 1.2,
        baseIncome: 500,
        income: 500,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {
            
        }
    },
    {
        type: "building",
        id: "building6",
        button: document.getElementById("building6"),
        amountElement: document.getElementById("building6Amount"),
        costElement: document.getElementById("building6Cost"),
        incomeElement: document.getElementById("building6Income"),
        rewardElement: document.getElementById("building6Reward"),
        goalElement: document.getElementById("building6Goal"),
        totalElement: document.getElementById("building6Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 50000,
        cost: 50000,
        costMulti: 1.2,
        baseIncome: 2500,
        income: 2500,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {
            
        }
    },
    {
        type: "building",
        id: "building7",
        button: document.getElementById("building7"),
        amountElement: document.getElementById("building7Amount"),
        costElement: document.getElementById("building7Cost"),
        incomeElement: document.getElementById("building7Income"),
        rewardElement: document.getElementById("building7Reward"),
        goalElement: document.getElementById("building7Goal"),
        totalElement: document.getElementById("building7Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 250000,
        cost: 250000,
        costMulti: 1.2,
        baseIncome: 10000,
        income: 10000,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {
            
        }
    },
    {
        type: "building",
        id: "building8",
        button: document.getElementById("building8"),
        amountElement: document.getElementById("building8Amount"),
        costElement: document.getElementById("building8Cost"),
        incomeElement: document.getElementById("building8Income"),
        rewardElement: document.getElementById("building8Reward"),
        goalElement: document.getElementById("building8Goal"),
        totalElement: document.getElementById("building8Total"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 1000000,
        cost: 1000000,
        costMulti: 1.2,
        baseIncome: 50000,
        income: 50000,
        currentReward: 2,
        reward1: 3,
        reward2: 4,
        reward3: 5,
        reward4: 10,
        reward5: 10,

        onBuy() {
            
        }
    }
]

const achievements = [
    {
        id: "achiev1",
        name: "Arthritis",
        level: 0,
        goal: 10,
        scale: 10,

        value() {
            return game.totalClicks
        },
        check() {
            return this.value() >= this.goal
        },
        onUnlock() {
            game.clickMultiplier *= 1.1
            game.achievementsClickBonus *= 1.1
            game.achievementsTotal++
        },
        desc() {
            return `Steal ${formatNumber(this.goal)} times! Steal power 1.1x`
        }
    },
    {
        id: "achiev2",
        name: "Wealthy",
        level: 0,
        goal: 100,
        scale: 100,

        value() {
            return game.totalCoinsEarned
        },
        check() {
            return this.value() >= this.goal
        },
        onUnlock() {
            game.clickMultiplier *= 1.1
            game.passiveIncomeMulti *= 1.1
            game.achievementsClickBonus *= 1.1
            game.achievementsPassiveBonus *= 1.1
            game.achievementsTotal++
        },
        desc() {
            return `Steal ${formatNumber(this.goal)} coins! All power 1.1x`
        }
    },
    {
        id: "achiev3",
        name: "Consistent thief",
        level: 0,
        goal: 100,
        scale: 10,

        value() {
            return game.coinsPerSecond
        },
        check() {
            return this.value() >= this.goal
        },
        onUnlock() {
            game.passiveIncomeMulti *= 1.1
            game.achievementsPassiveBonus *= 1.1
            game.achievementsTotal++
        },
        desc() {
            return `Steal ${formatNumber(this.goal)} coins per second! Passive power 1.1x`
        }
    },
    {
        id: "achiev4",
        name: "No life",
        level: 0,
        goal: 60,
        scale: 10,

        value() {
            return game.timePlayed
        },
        check() {
            return this.value() >= this.goal
        },
        onUnlock() {
            game.clickMultiplier *= 1.1
            game.passiveIncomeMulti *= 1.1
            game.achievementsClickBonus *= 1.1
            game.achievementsPassiveBonus *= 1.1
            game.achievementsTotal++
        },
        desc() {
            return `Play for ${formatTime(this.goal)}! All power 1.1x`
        }
    }
]

function buyItem(item) {
    if(item.type === "upgrade") {

        if (game.coins >= item.cost) {
            game.coins -= item.cost
            item.amount++

            item.onBuy()

            item.cost = item.baseCost * (item.costMulti ** item.amount)

            if (item.amount >= item.maxAmount) {
                item.maxed()
            }
            playSound(sounds.buy)
            updateAll()
        }
    }

    if (item.type === "building") {
        if (game.coins >= item.cost) {
            game.coins -= item.cost
            item.amount++
            item.cost = item.baseCost * (1.2 ** item.amount)

            playSound(sounds.buy)
            checkMilestone(item)
            updateAll()
        }
    }
}

function checkMilestone(item) {
    if (item.amount < item.nextMilestone) return

    if (item.nextMilestone === 10) {
        item.income *= item.currentReward
        item.previousMilestone = 10
        item.nextMilestone = 25
        item.currentReward = item.reward1
    } else if (item.nextMilestone === 25) {
        item.income *= item.currentReward
        item.previousMilestone = 25
        item.nextMilestone = 50
        item.currentReward = item.reward2
    } else if (item.nextMilestone === 50) {
        item.income *= item.currentReward
        item.previousMilestone = 50
        item.nextMilestone = 100
        item.currentReward = item.reward3
    } else if (item.nextMilestone === 100) {
        item.income *= item.currentReward
        item.previousMilestone = 100
        item.nextMilestone += 100
        item.currentReward = item.reward4
    } else {
        item.income *= item.currentReward
        item.previousMilestone += 100
        item.nextMilestone +=100
        item.currentReward = item.reward5
    }
}

function passiveIncome() {
    game.coinsPerSecond = 0

    items.forEach((item) => {
        if (item.type === "building") {
            game.coinsPerSecond += item.amount * item.income * game.passiveIncomeMulti
        }
    })

    game.coins += game.coinsPerSecond
    game.totalCoinsEarned += game.coinsPerSecond
    updateAll()
}

function resetGameForPrestige() {
    game.coins = 0
    game.coinsPerSecond = 0
    game.coinsPerClick = 1
    game.clickMultiplier = 1
    game.passiveIncomeMulti = 1
    game.stealCooldown = false
    game.stealTimeLeft = 8
    game.stealCooldownTime = 8
    game.prestigepoints = 0
    stealMaxed = false
}

function resetItem(item) {
    item.amount = 0
    item.cost = item.baseCost

    if (item.type === "upgrade") {
        if (item.multi !== undefined) {
            item.multi = 1
        }

        if (item.value !== undefined) {
            item.value = 0
        }
    }

    if (item.type === "building") {
        item.previousMilestone = 0
        item.nextMilestone = 10

        item.currentReward = 2

        item.income = item.baseIncome
    }
}

function postPrestige() {
    game.clickMultiplier = game.achievementsClickBonus
    game.passiveIncomeMulti = game.achievementsPassiveBonus
}