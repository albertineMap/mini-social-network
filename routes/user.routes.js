const  router = require('express').Router();
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

//auth
router.post("/register", authController.signUp);

//user
router.get("/all", userController.index);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);
router.patch("/follow/:id", userController.follow);
// router.patch("/:id", userController.unfollow);

module.exports = router;