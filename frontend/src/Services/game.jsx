const play = (id) => {
  return { win: 0, untillNext: 10 }
}

const restart = (id) => {
  return { msg: 'Points reset' }
}

export default { play, restart };
