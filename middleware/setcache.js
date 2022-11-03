"use strict";
module.exports = function setcache() {
    return function setcache(_req, res, next) {
      const period = 60 * 5
      res.set('Cache-control', `public, max-age=${period}`);
      next();
    };
};
