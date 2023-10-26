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
const inversify_1 = require("inversify");
const types_1 = require("./types");
const bindings_1 = require("./bindings");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const appContainer = new inversify_1.Container();
    appContainer.load(bindings_1.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    yield app.init();
    return { appContainer, app };
});
bootstrap();
