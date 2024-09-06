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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)();
// const sequelize = new Sequelize(
//   process.env.DB_DATABASE!,process.env.DB_USER!,process.env.DB_PASSWORD!, {
//   host:process.env.DB_HOST!,
//   dialect: 'mysql'
// })
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
});
function testConection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
testConection();
exports.default = sequelize;
