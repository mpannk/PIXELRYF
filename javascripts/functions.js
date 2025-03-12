// запуск функций
document.addEventListener('DOMContentLoaded', () => {
  changeScreen()
  trackPupil()
  matrix()
  gameHope()
  notification()
})

// переключение экранов

function changeScreen() {
  let mainScreen = document.querySelector('#main-screen')

  let peaceScreen = document.querySelector('#peace-screen')
  let hopeScreen = document.querySelector('#hope-screen')
  let angerScreen = document.querySelector('#anger-screen')
  let fearScreen = document.querySelector('#fear-screen')

  let peaceButton = document.querySelector('.f-scr-peace-color')
  let peaceHomeButton = document.querySelector('.blur-home-button-peace')

  let hopeButton = document.querySelector('.f-scr-hope-color')
  let hopeHomeButton = document.querySelector('.blur-home-button-hope')

  let angerButton = document.querySelector('.f-scr-anger-color')
  let angerHomeButton = document.querySelector('.blur-home-button-anger')

  let fearButton = document.querySelector('.f-scr-fear-color')
  let fearHomeButton = document.querySelector('.blur-home-button-fear')

  //   умиротворение

  peaceButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden')
    peaceScreen.classList.remove('hidden')
  })

  peaceHomeButton.addEventListener('click', () => {
    mainScreen.classList.remove('hidden')
    peaceScreen.classList.add('hidden')
  })

  //   надежда

  hopeButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden')
    hopeScreen.classList.remove('hidden')
  })

  hopeHomeButton.addEventListener('click', () => {
    mainScreen.classList.remove('hidden')
    hopeScreen.classList.add('hidden')
  })

  // гнев

  angerButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden')
    angerScreen.classList.remove('hidden')
  })

  angerHomeButton.addEventListener('click', () => {
    mainScreen.classList.remove('hidden')
    angerScreen.classList.add('hidden')
  })

  // страх

  fearButton.addEventListener('click', () => {
    mainScreen.classList.add('hidden')
    fearScreen.classList.remove('hidden')
  })

  fearHomeButton.addEventListener('click', () => {
    mainScreen.classList.remove('hidden')
    fearScreen.classList.add('hidden')
  })
}

// движение зрачка

function trackPupil() {
  let eyeContainer = document.querySelector('.eye-container')
  let pupil = document.querySelector('.pupil')

  document.addEventListener('mousemove', function (e) {
    let eyeRect = eyeContainer.getBoundingClientRect()
    let eyeCenterX = eyeRect.left + eyeRect.width / 2
    let eyeCenterY = eyeRect.top + eyeRect.height / 2

    let maxMoveX = eyeRect.width * 0.15
    let maxMoveY = eyeRect.height * 0.15

    let dx = e.clientX - eyeCenterX
    let dy = e.clientY - eyeCenterY

    let distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > maxMoveX) {
      let ratio = maxMoveX / distance
      dx *= ratio
      dy *= ratio
    }

    pupil.style.transform = `translate(${dx}px, ${dy}px)`
  })
}

// закос на матрицу

function matrix() {
  createMatrix()
  setInterval(updateMatrix, 300)
}

// создание матрицы
function createMatrix() {
  let columns = document.querySelectorAll('.numbers-column')

  columns.forEach((column) => {
    for (let i = 0; i < 11; i++) {
      let digit = document.createElement('span')
      digit.classList.add('digit')
      digit.textContent = Math.random() > 0.5 ? '1' : '0'
      column.appendChild(digit)
    }
  })
}

// обновление чисел в матрице
function updateMatrix() {
  let digits = document.querySelectorAll('.digit')

  digits.forEach((digit) => {
    if (Math.random() < 0.7) {
      digit.textContent = digit.textContent === '0' ? '1' : '0'
      digit.style.color = Math.random() < 0.5 ? '#00ff76' : '#000000'
    }
  })
}

// игра надежда

function gameHope() {
  let startButton = document.querySelector('.start')
  let sign = document.querySelector('.sign')
  let starsContainer = document.querySelector('.stars-container')
  let stars = document.querySelectorAll('.star-hope')
  let scoreText = document.querySelector('.score-value')
  let victoryMessage = document.querySelector('.victory-message')

  let score = 0

  startButton.addEventListener('click', () => {
    score = 0
    scoreText.textContent = score
    sign.classList.add('hidden')
    starsContainer.classList.remove('hidden')

    // возвращение звезд при повторном запуске
    stars.forEach((star) => {
      star.style.visibility = 'visible'
      star.style.opacity = '1'
    })
  })

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      if (star.style.visibility !== 'hidden') {
        score += 125
        scoreText.textContent = score

        // плавное исчезновение
        star.style.opacity = '0'
        setTimeout(() => {
          star.style.visibility = 'hidden'
        }, 500)

        if (score >= 1000) {
          displayVictoryMessage()
        }
      }
    })
  })

  function displayVictoryMessage() {
    victoryMessage.style.display = 'block'

    setTimeout(() => {
      victoryMessage.style.display = 'none'
      starsContainer.classList.add('hidden')
      sign.classList.remove('hidden')
      score = 0
      scoreText.textContent = score
    }, 5000)
  }
}

// появление сообщения по нажатию

function notification() {
  let messageButton = document.querySelector('.message')
  let notification = document.querySelector('.notification')

  messageButton.addEventListener('click', () => {
    notification.classList.toggle('hidden')
  })

  notification.addEventListener('click', () => {
    notification.classList.add('hidden')
  })
}
