const { ErrorHandler } = require('../helpers/error');

const posiblesSides = ['N', 'E', 'S', 'W'];
const possiblesAction = ['L', 'R', 'M'];


const setPosition = (currentPosition) => {
  const { side } = currentPosition;

  const action = {
    N: () => ({
      ...currentPosition,
      y: currentPosition.y + 1,
    }),
    E: () => ({
      ...currentPosition,
      x: currentPosition.x + 1,
    }),
    W: () => ({
      ...currentPosition,
      x: currentPosition.x - 1,
    }),
    S: () => ({
      ...currentPosition,
      y: currentPosition.y - 1,
    }),
  };

  return action[side]();
};

const moveForward = (currentPosition) => {
  const position = setPosition(currentPosition);

  if (position.y > 4 || position.y < 0 || position.x > 4 || position.x < 0) {
    throw new ErrorHandler(400, 'Posição inválida');
  }

  return position;
};

const turnToRight = (currentPosition) => {
  const newCurrentPosition = { ...currentPosition };
  const positionIndex = posiblesSides.indexOf(currentPosition.side);
  const InitialIndex = 0;

  if (positionIndex === 3) {
    newCurrentPosition.side = posiblesSides[InitialIndex];
    return newCurrentPosition;
  }

  newCurrentPosition.side = posiblesSides[positionIndex + 1];

  return newCurrentPosition;
};

const turnToLeft = (currentPosition) => {
  const newCurrentPosition = { ...currentPosition };
  const positionIndex = posiblesSides.indexOf(currentPosition.side);
  const finalIndex = 3;

  if (positionIndex === 0) {
    newCurrentPosition.side = posiblesSides[finalIndex];
    return newCurrentPosition;
  }

  newCurrentPosition.side = posiblesSides[positionIndex - 1];

  return newCurrentPosition;
};

const moveByAction = (currentPosition, command) => {
  const action = {
    M: () => moveForward(currentPosition),
    R: () => turnToRight(currentPosition),
    L: () => turnToLeft(currentPosition),
  };
  return action[command]();
};

const move = (currentPosition, action) => {
  if (possiblesAction.indexOf(action) === -1) {
    throw new ErrorHandler(400, 'Comando inválido');
  }
  if (posiblesSides.indexOf(currentPosition.side) === -1) {
    throw new ErrorHandler(400, 'Posição inválida');
  }

  return moveByAction(currentPosition, action);
};

const movementRobot = (req, res, next) => {
  const { movement } = (req.params);
  const actions = movement.split('');
  const initialPosition = {
    x: 0,
    y: 0,
    side: 'N',
  };

  try {
    const { x, y, side } = actions.reduce(move, initialPosition);
    res.send(`(${x}, ${y}, ${side})`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  movementRobot,
  moveForward,
  turnToRight,
  turnToLeft,
  move,
};
