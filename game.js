let interval

const game = {
    coins: 0,
    coinsPerSecond: 0,
    coinsPerClick: 1,
    totalCoinsEarned: 0,
    totalClicks: 0,
    timePlayed: 0,

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
        costElement: document.getElementById("upgrade1Cost"),
        amount: 0,
        baseCost: 10,
        cost: 10,
        bonus: 1
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
        income: 1
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
        income: 5
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
        income: 20
    }
]

function buyItem(item) {
    if(item.type === "upgrade") {

        if (game.coins >= item.cost) {
            game.coins -= item.cost
            item.amount++
            item.cost = item.baseCost * (1.2 ** item.amount)
            game.coinsPerClick += item.bonus

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
            game.coinsPerSecond += item.amount * item.income
        }
    })

    game.coins += game.coinsPerSecond
    game.totalCoinsEarned += game.coinsPerSecond
    updateAll()
}