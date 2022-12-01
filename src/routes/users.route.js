const { Router } = require("express");
const dto = require("../dto/users.dto");
const controllers = require("../controllers/users.controllers");
const middleware = require("../Middlewares/auth.middleware");
const uploads = require("../Middlewares/upload.middleware");

const router = new Router();

router.post(
  "/register",
  uploads.uploadImg,
  dto.checkCreateUser,
  controllers.createUserController
);
router.get(
  "/getUser/",
  middleware.isAuthentificated,
  controllers.getUserController
);
router.patch(
  "/updateUser/user/",
  middleware.isAuthentificated,
  uploads.uploadImg,
  dto.checkPatchValue,
  controllers.patchUserController
);
router.delete(
  "/deleteUser/user/",
  middleware.isAuthentificated,
  controllers.deleteUserController
);

module.exports = router;
