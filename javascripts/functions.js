// запуск функций
document.addEventListener('DOMContentLoaded', () => {
  changeScreen()
  trackPupil()
  matrix()
  gameHope()
  notification()
  ghosts()
  draggableFear()
  movingText()
  drawingSpace()
  angerScale()
  draggableLever()
  errors()
  musicDJ()
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

  //   победное сообщение

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

// отряд привидений вылетает по клику

function ghosts() {
  let greenButtons = document.querySelectorAll('.green-button')
  let ghosts = document.querySelectorAll('.ghosts')

  greenButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      let ghost = ghosts[index]
      ghost.classList.remove('animate-ghost')
      void ghost.offsetWidth
      ghost.classList.add('animate-ghost')
    })
  })
}

// перетаскивание элементов страха

function draggableFear() {
  let draggableElements = document.querySelectorAll(
    '.green-icon-fear > div, .purple-icon-fear > div'
  )

  let container = document.querySelector('.fear-not-game')
  let isDragging = false
  let currentElement = null
  let offsetX = 0
  let offsetY = 0

  draggableElements.forEach((element) => {
    element.style.cursor = 'grab'

    element.addEventListener('mousedown', (e) => {
      e.preventDefault()
      isDragging = true
      currentElement = element

      let containerRect = container.getBoundingClientRect()
      let elementRect = element.getBoundingClientRect()

      // удалить марджин!

      element.style.margin = '0'

      offsetX = e.clientX - elementRect.left
      offsetY = e.clientY - elementRect.top

      element.style.position = 'absolute'
      element.style.zIndex = '1000'
      element.style.pointerEvents = 'none'
      element.style.cursor = 'grabbing'
      element.style.left = `${elementRect.left - containerRect.left}px`
      element.style.top = `${elementRect.top - containerRect.top}px`

      container.appendChild(element)
    })

    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !currentElement) return

      let containerRect = container.getBoundingClientRect()

      let newX = e.clientX - containerRect.left - offsetX
      let newY = e.clientY - containerRect.top - offsetY

      //   ограничение перемещения в пределах родительского контейнера

      newX = Math.max(
        0,
        Math.min(newX, containerRect.width - currentElement.offsetWidth)
      )
      newY = Math.max(
        0,
        Math.min(newY, containerRect.height - currentElement.offsetHeight)
      )

      currentElement.style.left = `${newX}px`
      currentElement.style.top = `${newY}px`
    })

    document.addEventListener('mouseup', () => {
      if (currentElement) {
        currentElement.style.pointerEvents = 'auto'
        currentElement.style.cursor = 'grab'
        currentElement.style.margin = '0'
      }
      isDragging = false
      currentElement = null
    })
  })
}

// анимация движения текста в гневе

function movingText() {
  let firstText = document.querySelector('.fst-text-anger')
  let secondText = document.querySelector('.snd-text-anger')
  let thirdText = document.querySelector('.trd-text-anger')

  firstText.addEventListener('click', () => {
    firstText.classList.toggle('paused')
  })

  secondText.addEventListener('click', () => {
    secondText.classList.toggle('paused')
  })

  thirdText.addEventListener('click', () => {
    thirdText.classList.toggle('paused')
  })
}

// рисовашка по клеточкам

function drawingSpace() {
  let drawingSpace = document.querySelector('.drawing-space')
  let totalSquares = 288
  let isDrawing = false
  let attempts = 0

  // сброс всех квадратов

  function resetSquares() {
    let squares = document.querySelectorAll('.squares-anger')
    squares.forEach((square) => {
      square.classList.remove('active')
    })
    updateAngerScale()
  }

  // обновление шкалы гнева

  function updateAngerScale() {
    let activeSquares = document.querySelectorAll(
      '.squares-anger.active'
    ).length
    let scaleSquares = document.querySelectorAll('.square-anger-scale')
    let threshold = Math.ceil(
      (activeSquares / totalSquares) * scaleSquares.length
    )
    let percentageElement = document.querySelector('.percentage-anger')

    scaleSquares.forEach((square, index) => {
      if (index < threshold) {
        square.classList.add('active')
      } else {
        square.classList.remove('active')
      }
    })

    // обновление процента

    let percentage = Math.max(1, 100 - threshold * 5)
    percentageElement.textContent = `${percentage}%`
  }

  // создание квадратиков

  for (let i = 0; i < totalSquares; i++) {
    let square = document.createElement('div')
    square.classList.add('squares-anger')
    drawingSpace.appendChild(square)

    square.addEventListener('mousedown', () => {
      isDrawing = true
      square.classList.add('active')
      updateAngerScale()
    })

    square.addEventListener('mouseover', () => {
      if (isDrawing) {
        square.classList.add('active')
        updateAngerScale()
      }
    })

    square.addEventListener('mouseup', () => {
      isDrawing = false
      attempts++
      if (attempts >= 3) {
        setTimeout(resetSquares, 1000)
        attempts = 0
      }
    })
  }

  // чтобы не выходить за пределы

  drawingSpace.addEventListener('mouseleave', () => {
    isDrawing = false
  })
}

// шкала гнева

function angerScale() {
  let angerScale = document.querySelector('.anger-scale')
  let totalScaleSquares = 20
  let percentageElement = document.querySelector('.percentage-anger')

  // начальное значение процента

  percentageElement.textContent = '100%'

  for (let i = 0; i < totalScaleSquares; i++) {
    let square = document.createElement('div')
    square.classList.add('square-anger-scale')
    angerScale.appendChild(square)
  }
}

// перетаскивание рычага на диджей-пульте

function draggableLever() {
  let lever = document.querySelector('.lever-dj')
  let ladder = document.querySelector('.ladder-dj')
  let isDragging = false
  let startY = 0
  let leverTop = 0

  lever.addEventListener('mousedown', (e) => {
    isDragging = true
    startY = e.clientY
    leverTop = lever.offsetTop
    lever.style.cursor = 'grabbing'
  })

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return

    let deltaY = e.clientY - startY
    let newTop = leverTop + deltaY

    let ladderRect = ladder.getBoundingClientRect()
    let leverRect = lever.getBoundingClientRect()

    newTop = Math.max(0, Math.min(newTop, ladderRect.height - leverRect.height))

    lever.style.top = `${newTop}px`
  })

  document.addEventListener('mouseup', () => {
    isDragging = false
    lever.style.cursor = 'grab'
  })
}

// появление ошибок при загрузке плаката

function errors() {
  let errors = document.querySelectorAll('.error')
  let shownErrors = new Set()

  // получение случайной позиции

  function getRandomPosition(error) {
    error.style.opacity = '0'
    error.style.display = 'block'

    let errorRect = error.getBoundingClientRect()
    let maxX = window.innerWidth - errorRect.width
    let maxY = window.innerHeight - errorRect.height

    // возвращение таблички обратно

    error.style.opacity = ''
    error.style.display = ''

    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    }
  }

  function showError(error) {
    let position = getRandomPosition(error)
    error.style.left = `${position.x}px`
    error.style.top = `${position.y}px`
    error.classList.add('visible')
  }

  function hideError(error) {
    error.classList.add('hidden')
    shownErrors.add(error)
  }

  // задержка ошибок

  errors.forEach((error, index) => {
    setTimeout(() => {
      if (!shownErrors.has(error)) {
        showError(error)
      }
    }, index * 500)
  })

  errors.forEach((error) => {
    error.addEventListener('click', () => {
      hideError(error)
    })
  })
}

// музыка на диджей-пульте

function musicDJ() {
  let mainSound = document.querySelector('.main-sound')
  let pauseButton = document.querySelector('.pause-button-dj')
  let discDj = document.querySelector('.disc-dj')
  let secondDiscDj = document.querySelector('.second-disc-dj')
  let djTurnOn = document.querySelector('.dj-turn-on')
  let buttonSoundMap = {
    'birds-button': 'birds-sound',
    'book-button': 'book-sound',
    'cooking-button': 'cooking-sound',
    'grass-button': 'grass-sound',
    'grasshopers-button': 'grasshopers-sound',
    'sea-button': 'sea-sound',
    'soda-button': 'soda-sound',
    'train-button': 'train-sound'
  }

  // вращение дисков при включении музыки

  function rotateDiscs(isPlaying) {
    if (isPlaying) {
      discDj.classList.add('playing')
      secondDiscDj.classList.add('playing')
    } else {
      discDj.classList.remove('playing')
      secondDiscDj.classList.remove('playing')
    }
  }

  // кнопка паузы

  pauseButton.addEventListener('click', () => {
    if (mainSound.paused) {
      mainSound.play()
      pauseButton.classList.remove('pause')
      pauseButton.classList.add('active')
      djTurnOn.style.opacity = '0'
      rotateDiscs(true)
    } else {
      mainSound.pause()
      pauseButton.classList.add('pause')
      pauseButton.classList.remove('active')
      djTurnOn.style.opacity = '1'
      rotateDiscs(false)
    }
  })

  // кнопки музыки

  Object.entries(buttonSoundMap).forEach(([buttonClass, soundClass]) => {
    let button = document.querySelector(`.${buttonClass}`)
    let sound = document.querySelector(`.${soundClass}`)
    let coloredButton = button.querySelector('.colored-music-button')

    button.addEventListener('click', () => {
      if (sound.paused) {
        sound.play()
        coloredButton.classList.add('active')
      } else {
        sound.pause()
        coloredButton.classList.remove('active')
      }
    })
  })
}
