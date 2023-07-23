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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userModel_1 = __importDefault(require("../models/userModel"));
// passport.serializeUser((user: any, done) => {
//   done(null, user?.id);
// });
// passport.deserializeUser((id, done) => {
//   userModel.findById(id).then((user) => {
//     done(null, user);
//   });
// });
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: `${process.env.GOOGLE_OAUTH2_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_OAUTH2_CLIENT_SECRET}`,
    callbackURL: `${process.env.BACKEND_HOST}/api/auth/google/callback`,
}, function (accessToken, refeshToken, profile, cb) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { id, _json } = profile;
        const user = yield userModel_1.default.findOneAndUpdate({ googleId: id }, {
            firstName: _json.given_name,
            lastName: _json.family_name,
            avatar: _json.picture,
            email: _json.email,
            userName: (_a = _json === null || _json === void 0 ? void 0 : _json.email) === null || _a === void 0 ? void 0 : _a.replace("@", ""),
        }, { new: true, upsert: true });
        cb(null, user);
    });
}));
