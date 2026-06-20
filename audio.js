const sounds = {
    click: new Audio("sounds/click.ogg"),
    buy: new Audio("sounds/buy.ogg"),
    achievement: new Audio("sounds/achievement.ogg"),
    steal: new Audio("sounds/stealFinish.ogg"),
    error: new Audio("sounds/error.ogg"),
    switch: new Audio("sounds/switchMenu.ogg")
}

function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}