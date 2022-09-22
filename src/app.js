"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
const user_1 = require("./entity/user");
// establish database connection
app_data_source_1.default
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/welcome", (req, res, next) => {
    res.send("welcome!!@");
});
app.get("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("params:", req.params.id);
        const results = yield app_data_source_1.default.getRepository(user_1.User).findOneBy({
            id: Number(req.params.id),
        });
        console.log("GET user", results);
        return res.send(results);
    });
});
// register routes
app.get("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield app_data_source_1.default.getRepository(user_1.User).find();
        res.json(users);
    });
});
app.post("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const user = yield app_data_source_1.default.getRepository(user_1.User).create(req.body);
        const results = yield app_data_source_1.default.getRepository(user_1.User).save(user);
        return res.send(results);
    });
});
app.put("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield app_data_source_1.default.getRepository(user_1.User).findOneBy({
            id: Number(req.params.id),
        });
        if (user === null)
            return;
        app_data_source_1.default.getRepository(user_1.User).merge(user, req.body);
        const results = yield app_data_source_1.default.getRepository(user_1.User).save(user);
        return res.send(results);
    });
});
app.delete("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.default.getRepository(user_1.User).delete(req.params.id);
        return res.send(results);
    });
});
app.listen("1234", () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
