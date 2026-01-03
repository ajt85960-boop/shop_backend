import express from "express";

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    user: 'user me'
  })
});

export default  router
