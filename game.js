let interval

const game = {
    coins: 0,
    coinsPerSecond: 0,
    coinsPerClick: 1,
    totalCoinsEarned: 0,
    totalClicks: 0,
    timePlayed: 0,
    clickMultiplier: 1,
    passiveIncomeMulti: 1,

    stealCooldown: false,
    stealTimeLeft: 8,
    stealCooldownTime: 8
}

let items = [
    {
        type: "upgrade",
        id: "upgrade1",
        button: document.getElementById("upgrade1"),
        amountElement: document.getElementById("upgrade1Amount"),
        multiElement: document.getElementById("upgrade1Multi"),
        costElement: document.getElementById("upgrade1Cost"),
        amount: 0,
        multi: 1,
        baseCost: 5,
        cost: 5,
        costMulti: 4,
        
        onBuy() {
            this.multi *= 2
            game.clickMultiplier *= 2
        }
    },
    {
        type: "upgrade",
        id: "upgrade2",
        button: document.getElementById("upgrade2"),
        amountElement: document.getElementById("upgrade2Amount"),
        valueElement: document.getElementById("upgrade2Value"),
        costElement: document.getElementById("upgrade2Cost"),
        amount: 0,
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
        }
    },
    {
        type: "upgrade",
        id: "upgrade3",
        button: document.getElementById("upgrade3"),
        amountElement: document.getElementById("upgrade3Amount"),
        multiElement: document.getElementById("upgrade3Multi"),
        costElement: document.getElementById("upgrade3Cost"),
        amount: 0,
        multi: 1,
        baseCost: 20,
        cost: 20,
        costMulti: 4,
        
        onBuy() {
            this.multi *= 2
            game.passiveIncomeMulti *= 2
        }
    },
    {
        type: "upgrade",
        id: "upgrade4",
        button: document.getElementById("upgrade4"),
        amountElement: document.getElementById("upgrade4Amount"),
        valueElement: document.getElementById("upgrade4Value"),
        costElement: document.getElementById("upgrade4Cost"),
        amount: 0,
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
        }
    },
    {
        type: "building",
        id: "building1",
        button: document.getElementById("building1"),
        amountElement: document.getElementById("building1Amount"),
        costElement: document.getElementById("building1Cost"),
        incomeElement: document.getElementById("building1Income"),
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 50,
        cost:50,
        costMulti: 1.2,
        income: 1,

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
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 200,
        cost: 200,
        costMulti: 1.2,
        income: 5,

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
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 500,
        cost: 500,
        costMulti: 1.2,
        income: 20,

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
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 2500,
        cost: 2500,
        costMulti: 1.2,
        income: 100,

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
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 10000,
        cost: 10000,
        costMulti: 1.2,
        income: 500,

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
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 50000,
        cost: 50000,
        costMulti: 1.2,
        income: 2500,

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
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 250000,
        cost: 250000,
        costMulti: 1.2,
        income: 10000,

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
        amount: 0,
        previousMilestone: 0,
        nextMilestone: 10,
        baseCost: 1000000,
        cost: 1000000,
        costMulti: 1.2,
        income: 50000,

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
        check() {
            return game.totalClicks >= this.goal
        },
        onUnlock() {
            game.clickMultiplier *= 1.1
        },
        desc() {
            return `Steal ${formatNumber(this.goal)} times! Steal power +10%`
        }
    },
    {
        id: "achiev2",
        name: "Wealthy",
        level: 0,
        goal: 100,
        scale: 100,
        check() {
            return game.totalCoinsEarned >= this.goal
        },
        onUnlock() {
            game.clickMultiplier *= 1.1
            game.passiveIncomeMulti *= 1.1
        },
        desc() {
            return `Steal ${formatNumber(this.goal)} coins! All power +10%`
        }
    },
    {
        id: "achiev3",
        name: "Consistent thief",
        level: 0,
        goal: 100,
        scale: 10,
        check() {
            return game.coinsPerSecond >= this.goal
        },
        onUnlock() {
            game.passiveIncomeMulti *= 1.1
        },
        desc() {
            return `Steal ${formatNumber(this.goal)} coins per second! Passive power +10%`
        }
    },
    {
        id: "achiev4",
        name: "No life",
        level: 0,
        goal: 60,
        scale: 10,
        check() {
            return game.timePlayed >= this.goal
        },
        onUnlock() {
            game.clickMultiplier *= 1.1
            game.passiveIncomeMulti *= 1.1
        },
        desc() {
            return `Play for ${formatTime(this.goal)}! All power +10%`
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
        item.income *= 2
        item.previousMilestone = 10
        item.nextMilestone = 25
    } else if (item.nextMilestone === 25) {
        item.income *= 3
        item.previousMilestone = 25
        item.nextMilestone = 50
    } else if (item.nextMilestone === 50) {
        item.income *= 4
        item.previousMilestone = 50
        item.nextMilestone = 100
    } else if (item.nextMilestone === 100) {
        item.income *= 10
        item.previousMilestone = 100
        item.nextMilestone += 100
    } else {
        item.income *= 10
        item.previousMilestone += 100
        item.nextMilestone +=100
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