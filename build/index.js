"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const configs_1 = require("~/configs");
const routes_1 = __importDefault(require("~/routes"));
const app = express_1.default();
mongoose_1.default.connect(configs_1.secrets.MONGO_URL, configs_1.mongoConfig);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(configs_1.secrets.PORT || 4000);
