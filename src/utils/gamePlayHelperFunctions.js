export const createInitialDisplayState = (cards) => {
    const initialDisplayState = {};
    cards.forEach((card, index) => {
      initialDisplayState[index] = null
    })
    return initialDisplayState
  }

export const createInitialDisabledState = (cards) => {
    const initialDisabledState = {};
    cards.forEach((card, index) => {
      initialDisabledState[index] = null
    })
    return initialDisabledState
  }