"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './Globals.env' });
const clave_secreta = process.env.CLAVE_SECRETA;
console.log(jwt_simple_1.default, moment_1.default, clave_secreta);
