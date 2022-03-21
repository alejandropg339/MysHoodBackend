"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_middlewares_1 = require("./../middlewares/user.middlewares");
const authJWT_1 = require("./../middlewares/authJWT");
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.get('/personal-info/:id', [authJWT_1.verifyToken, user_middlewares_1.verifyConsultPersonalData], users_controller_1.personalData);
exports.default = router;
//# sourceMappingURL=users.routes.js.map