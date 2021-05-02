"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secrets = exports.mongoConfig = void 0;
var mongoose_config_1 = require("./mongoose.config");
Object.defineProperty(exports, "mongoConfig", { enumerable: true, get: function () { return __importDefault(mongoose_config_1).default; } });
var secrets_config_1 = require("./secrets.config");
Object.defineProperty(exports, "secrets", { enumerable: true, get: function () { return __importDefault(secrets_config_1).default; } });
