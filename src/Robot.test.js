const Robot = require('./Robot');
const { ErrorHandler } = require('../helpers/error');

describe('Robot', () => {
  describe('# moveFoward()', () => {
    it('should return one forward position when side is N and y position lower than 4', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };
      const expectedPosition = {
        x: 0,
        y: 1,
        side: 'N',
      };

      expect(Robot.moveForward(currentPosition)).toMatchObject(expectedPosition);
    });

    it('should return one forward position when side is E and x position lower than 4', () => {
      const currentPosition = {
        x: 3,
        y: 0,
        side: 'E',
      };
      const expectedPosition = {
        x: 4,
        y: 0,
        side: 'E',
      };

      expect(Robot.moveForward(currentPosition)).toMatchObject(expectedPosition);
    });

    it('should return one forward position when side is S and y position bigger than 0', () => {
      const currentPosition = {
        x: 0,
        y: 1,
        side: 'S',
      };
      const expectedPosition = {
        x: 0,
        y: 0,
        side: 'S',
      };

      expect(Robot.moveForward(currentPosition)).toMatchObject(expectedPosition);
    });

    it('should return one forward position when side is W and x position lower than 0', () => {
      const currentPosition = {
        x: 2,
        y: 0,
        side: 'W',
      };
      const expectedPosition = {
        x: 1,
        y: 0,
        side: 'W',
      };

      expect(Robot.moveForward(currentPosition)).toMatchObject(expectedPosition);
    });

    it('should throw an error when side is N and Y position is bigger than 4', () => {
      const currentPosition = {
        x: 0,
        y: 4,
        side: 'N',
      };

      expect(() => {
        Robot.moveForward(currentPosition);
      }).toThrowError(new ErrorHandler(400, 'Posição inválida'));
    });

    it('should throw an error when side is E and X position is bigger than 4', () => {
      const currentPosition = {
        x: 4,
        y: 0,
        side: 'E',
      };

      expect(() => {
        Robot.moveForward(currentPosition);
      }).toThrowError(new ErrorHandler(400, 'Posição inválida'));
    });

    it('should throw an error when side is S and Y position is lower than 0', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'S',
      };

      expect(() => {
        Robot.moveForward(currentPosition);
      }).toThrowError(new ErrorHandler(400, 'Posição inválida'));
    });

    it('should throw an error when side is W and Y position is lower than 0', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'W',
      };

      expect(() => {
        Robot.moveForward(currentPosition);
      }).toThrowError(new ErrorHandler(400, 'Posição inválida'));
    });

    it('should throw an error when side is different of (N, E, S or W)', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'J',
      };

      expect(() => {
        Robot.moveForward(currentPosition);
      }).toThrowError(new ErrorHandler(400, 'Posição inválida'));
    });
  });
  describe('# turnToRight()', () => {
    it('should return the robot turned one position to right', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };
      const expectedPosition = {
        x: 0,
        y: 0,
        side: 'E',
      };

      expect(Robot.turnToRight(currentPosition)).toMatchObject(expectedPosition);
    });

    it('should return the robot turned to N when initial side is W', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'W',
      };
      const expectedPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };

      expect(Robot.turnToRight(currentPosition)).toMatchObject(expectedPosition);
    });
  });
  describe('# turnToLeft()', () => {
    it('should return the robot turned one position to left', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'E',
      };
      const expectedPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };

      expect(Robot.turnToLeft(currentPosition)).toMatchObject(expectedPosition);
    });

    it('should return the robot turned to W when initial side is N', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };
      const expectedPosition = {
        x: 0,
        y: 0,
        side: 'W',
      };

      expect(Robot.turnToLeft(currentPosition)).toMatchObject(expectedPosition);
    });
  });
  describe('# move()', () => {
    it('should moveFoward when comand is M', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };
      const expectedPosition = {
        x: 0,
        y: 1,
        side: 'N',
      };

      expect(Robot.move(currentPosition, 'M')).toMatchObject(expectedPosition);
    });
    it('should turnRight when comand is R', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };
      const expectedPosition = {
        x: 0,
        y: 0,
        side: 'E',
      };

      expect(Robot.move(currentPosition, 'R')).toMatchObject(expectedPosition);
    });
    it('should turnLeftt when comand is L', () => {
      const currentPosition = {
        x: 0,
        y: 0,
        side: 'E',
      };
      const expectedPosition = {
        x: 0,
        y: 0,
        side: 'N',
      };

      expect(Robot.move(currentPosition, 'L')).toMatchObject(expectedPosition);
    });
  });
});
