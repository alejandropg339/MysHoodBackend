"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConsultPersonalData = void 0;
const verifyConsultPersonalData = (req, res, next) => {
    const { id } = req.params;
    if (id !== req.userId) {
        const errorResponse = {
            state: 0,
            message: "Unauthorized request"
        };
        return res.status(400).json(errorResponse);
    }
    next();
};
exports.verifyConsultPersonalData = verifyConsultPersonalData;
//# sourceMappingURL=user.middlewares.js.map