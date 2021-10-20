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
exports.qfetch = void 0;
const graphql_request_1 = require("graphql-request");
require("../config");
const qfetch = (req, body = {}) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, graphql_request_1.request)(process.env.ENDPOINT, req, body);
        return data;
    }
    catch (e) {
        return null;
    }
});
exports.qfetch = qfetch;
//# sourceMappingURL=instance.js.map