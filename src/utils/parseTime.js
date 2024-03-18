const DAYS = {
  sunday: 'SUN',
  monday: 'MON',
  tueasday: 'TUE',
  wendsday: 'WEN',
  thuesday: 'THU',
  friday: 'FRI',
  saturday: 'SAT',
}

export const parseTime = date => {
  const now = Math.floor(+new Date() / 1000)
  const timeDiffInSeconds = Math.floor(now - date)

  if (timeDiffInSeconds < 5) return 'just now'
  else if (timeDiffInSeconds > 5 && timeDiffInSeconds < 60) return '1 min'
  else if (timeDiffInSeconds > 60 && timeDiffInSeconds < 120) return '2 min'
  else if (timeDiffInSeconds > 120 && timeDiffInSeconds < 180) return '3 min'
  else if (timeDiffInSeconds > 180 && timeDiffInSeconds < 240) return '4 min'
  else if (timeDiffInSeconds > 240 && timeDiffInSeconds < 300) return '5 min'
  else if (timeDiffInSeconds > 300 && timeDiffInSeconds < 360) return '5 min'
  else {
    const totalMs = date * 1000
    const start = Math.floor(Date.now() / 1000)
    if (totalMs / 1000 - start > 86400000) {
      const day = new Date(totalMs)
      switch (day.getDay()) {
        case 0:
          return DAYS.sunday
        case 1:
          return DAYS.monday
        case 2:
          return DAYS.tueasday
        case 3:
          return DAYS.wendsday
        case 4:
          return DAYS.thuesday
        case 5:
          return DAYS.friday
        case 6:
          return DAYS.saturday
        default:
          break
      }
    }
    const result = new Date(totalMs).toISOString().slice(11, 16)
    return result
  }
}
