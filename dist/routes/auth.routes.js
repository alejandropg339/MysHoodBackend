"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth/auth.controller");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
router.post('/signin', auth_controller_1.signIn);
router.post('/signUp', users_controller_1.createUser);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map