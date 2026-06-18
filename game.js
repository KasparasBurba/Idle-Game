let interval

const game = {
    coins: 0,
    coinsPerSecond: 0,
    coinsPerClick: 1,
    totalCoinsEarned: 0,
    totalClicks: 0,
    timePlayed: 0
}


let upgrades = [
    {
        id: "upgrade1",
        amount: 0,
        baseCost: 10,
        bonus: 1
    }
]

let buildings = [
    {
        id: "miner",
        amount: 0,
        baseCost: 50,
        income: 1
    },
    {
        id: "tractor",
        amount: 0,
        baseCost: 200,
        income: 5
    },
    {
        id: "drill",
        amount: 0,
        baseCost: 500,
        income: 20
    }
]

function buyUpgrade(upgrade) {
    const cost = upgrade.baseCost * (1.2 ** upgrade.amount)

    if (game.coins >= cost) {
        game.coins -= cost
        upgrade.amount += 1
        game.coinsPerClick += upgrade.bonus

        updateAll()
    }
}

function buyBuilding(building) {
    const cost = building.baseCost * (1.2 ** building.amount)

    if (game.coins >= cost) {
        game.coins -= cost
        building.amount += 1

        updateAll()
    }
}

function passiveIncome() {
    game.coinsPerSecond = 0

    buildings.forEach((building) => {
        game.coinsPerSecond += building.amount * building.income
    })

    game.coins += game.coinsPerSecond
    game.totalCoinsEarned += game.coinsPerSecond
    updateAll()
}