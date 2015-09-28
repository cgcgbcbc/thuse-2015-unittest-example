(function () {
  'use strict';

  describe('Test kernel.js', function () {
    before(function() {
      GLOBAL_CONST.WIDTH = 5;
      GLOBAL_CONST.HEIGHT = 5;
    });
    describe('Test arena', function () {
      it('should init every grid\'s value to 0', function () {
        var testArena = new Arena();
        for (var i = GLOBAL_CONST.HEIGHT - 1; i >= 0; i--) {
          for (var j = 0; j < GLOBAL_CONST.WIDTH -1; j++) {//every grid's value of the origin terrain should be 0
            assert.equal(testArena.terrain[i][j],0);
            assert.equal(testArena.changed[i][j],false);
          }
        }
      });
    });

    describe('Test NavigateCell', function() {
      it('should has correct neighbors', function() {
        //test whether the neighbors fo [2,3] are correct
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[0]),[1,2]);
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[1]),[1,3]);
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[2]),[1,4]);
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[3]),[2,4]);
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[4]),[3,4]);
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[5]),[3,3]);
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[6]),[3,2]);
        assert.deepEqual(NavigateCell([2,3],GLOBAL_CONST.NEIGHBOR[7]),[2,2]);
        //test whether the neighbors fo [0,0] are correct
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[0]),[4,4]);
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[1]),[4,0]);
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[2]),[4,1]);
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[3]),[0,1]);
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[4]),[1,1]);
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[5]),[1,0]);
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[6]),[1,4]);
        assert.deepEqual(NavigateCell([0,0],GLOBAL_CONST.NEIGHBOR[7]),[0,4]);
        //test whether the neighbors fo [3,0] are correct
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[0]),[2,4]);
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[1]),[2,0]);
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[2]),[2,1]);
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[3]),[3,1]);
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[4]),[4,1]);
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[5]),[4,0]);
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[6]),[4,4]);
        assert.deepEqual(NavigateCell([3,0],GLOBAL_CONST.NEIGHBOR[7]),[3,4]);
      });
    });

  });
})();
