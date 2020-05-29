const { ErrorHandler } = require('../helpers/error');

const posiblesSides = ['N', 'E', 'S', 'W'];
const possiblesAction = ['L', 'R', 'M'];

const moveForward = (currentPosition) => {
  const { side } = currentPosition;
  const newCurrentPosition = { ...currentPosition };

  switch (side) {
    case 'N':
      if (currentPosition.y === 4) {
        throw new ErrorHandler(400, 'Posição inválida');
      }
      newCurrentPosition.y = currentPosition.y + 1;
      break;
    case 'S':
      if (currentPosition.y === 0) {
        throw new ErrorHandler(400, 'Posição inválida');
      }
      newCurrentPosition.y = currentPosition.y - 1;
      break;
    case 'E':
      if (currentPosition.x === 4) {
        throw new ErrorHandler(400, 'Posição inválida');
      }
      newCurrentPosition.x = currentPosition.x + 1;
      break;
    case 'W':
      if (currentPosition.x === 0) {
        throw new ErrorHandler(400, 'Posição inválida');
      }
      newCurrentPosition.x = currentPosition.x - 1;
      break;
    default: throw new ErrorHandler(400, 'Posição inválida');
  }

  return newCurrentPosition;
};

const turnToRight = (currentPosition) => {
  const positionIndex = posiblesSides.indexOf(currentPosition.side);
  const newCurrentPosition = { ...currentPosition };
  const InitialIndex = 0;

  if (positionIndex === 3) {
    newCurrentPosition.side = posiblesSides[InitialIndex];
    return newCurrentPosition;
  }

  newCurrentPosition.side = posiblesSides[positionIndex + 1];

  return newCurrentPosition;
};

const turnToLeft = (currentPosition) => {
  const positionIndex = posiblesSides.indexOf(currentPosition.side);
  const newCurrentPosition = { ...currentPosition };
  const finalIndex = 3;

  if (positionIndex === 0) {
    newCurrentPosition.side = posiblesSides[finalIndex];
    return newCurrentPosition;
  }

  newCurrentPosition.side = posiblesSides[positionIndex - 1];

  return newCurrentPosition;
};

const move = (currentPosition, action) => {
  let newPosition;

  if (possiblesAction.indexOf(action) === -1) {
    throw new ErrorHandler(400, 'Comando inválido');
  }

  if (action === 'M') {
    newPosition = moveForward(currentPosition);
  }

  if (action === 'R') {
    newPosition = turnToRight(currentPosition);
  }

  if (action === 'L') {
    newPosition = turnToLeft(currentPosition);
  }

  return newPosition;
};

const movimentRobot = (req, res, next) => {
  const { moviment } = (req.params);
  const actions = moviment.split('');
  const initialPosition = {
    x: 0,
    y: 0,
    side: 'N',
  };

  try {
    const robotPosition = actions.reduce(move, initialPosition);
    res.send(`(${robotPosition.x}, ${robotPosition.y}, ${robotPosition.side})`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  movimentRobot,
  moveForward,
  turnToRight,
  turnToLeft,
  move,
};
