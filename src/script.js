const digitSegments = [
  [1, 2, 3, 4, 5, 6],
  [2, 3],
  [1, 2, 7, 5, 4],
  [1, 2, 7, 3, 4],
  [6, 7, 2, 3],
  [1, 6, 7, 3, 4],
  [1, 6, 5, 4, 3, 7],
  [1, 2, 3],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 7, 3, 6],
]

const hours = document.querySelectorAll('.hours')
const minutes = document.querySelectorAll('.minutes')
const seconds = document.querySelectorAll('.seconds')
const dateInner = document.querySelector('.date')

setInterval(function () {
  let date = new Date()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()
  let AAstr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  let YY = date.getFullYear().toString().slice(-2)
  let MM = date.getMonth() + 1
  let DD = date.getDate()
  let AA = date.getDay()

  if (MM < 10) MM = '0' + MM
  if (DD < 10) DD = '0' + DD

  dateInner.innerHTML = `${YY} - ${MM} - ${DD} ${AAstr[AA]}`

  setNumber(hours[0], Math.floor(hh / 10), 1)
  setNumber(hours[1], hh % 10, 1)

  setNumber(minutes[0], Math.floor(mm / 10), 1)
  setNumber(minutes[1], mm % 10, 1)

  setNumber(seconds[0], Math.floor(ss / 10), 1)
  setNumber(seconds[1], ss % 10, 1)
}, 1000)

const setNumber = function (digit, number) {
  const segments = digit.querySelectorAll('.segment')
  const current = parseInt(digit.getAttribute('data-value'))

  if (!isNaN(current) && current != number) {
    digitSegments[current].forEach(function (digitSegment, index) {
      setTimeout(function () {
        segments[digitSegment - 1].classList.remove('on')
      }, index * 45)
    })
  }

  if (isNaN(current) || current != number) {
    setTimeout(function () {
      digitSegments[number].forEach(function (digitSegment, index) {
        setTimeout(function () {
          segments[digitSegment - 1].classList.add('on')
        }, index * 45)
      })
    }, 250)
    digit.setAttribute('data-value', number)
  }
}
