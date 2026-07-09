module.exports = {
  testEnvironment: "node"
};

function cartesian(...sets) {
  return sets.reduce(
    function (a, b) {
      return a
        .map(function (x) {
          return b.map(function (y) {
            return x.concat([y]);
          });
        })
        .reduce(function (pre, cur) {
          return pre.concat(cur);
        });
    },
    [[]]
  );
}

cartesian([1, 2], [3, 4], [5, 6]);
