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
        id: "miner",
        button: document.getElementById("miner"),
        amountElement: document.getElementById("minerAmount"),
        costElement: document.getElementById("minerCost"),
        amount: 0,
        baseCost: 50,
        cost:50,
        costMulti: 1.2,
        income: 1,

        onBuy() {

        }
    },
    {
        type: "building",
        id: "tractor",
        button: document.getElementById("tractor"),
        amountElement: document.getElementById("tractorAmount"),
        costElement: document.getElementById("tractorCost"),
        amount: 0,
        baseCost: 200,
        cost: 200,
        costMulti: 1.2,
        income: 5,

        onBuy() {
            
        }
    },
    {
        type: "building",
        id: "drill",
        button: document.getElementById("drill"),
        amountElement: document.getElementById("drillAmount"),
        costElement: document.getElementById("drillCost"),
        amount: 0,
        baseCost: 500,
        cost: 500,
        costMulti: 1.2,
        income: 20,

        onBuy() {
            
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

            updateAll()
        }
    }

    if (item.type === "building") {
        if (game.coins >= item.cost) {
            game.coins -= item.cost
            item.amount++
            item.cost = item.baseCost * (1.2 ** item.amount)

            updateAll()
        }
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