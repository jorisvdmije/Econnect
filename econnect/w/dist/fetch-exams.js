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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var fs_1 = require("fs");
var axios_1 = require("axios");
function wait(seconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, seconds); });
}
function fetchExams() {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData, data, exams_1, dates, browser, page, error_1, fetchedExams_1, i, newExams, stringifyData, mess, _i, newExams_1, exam, message, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 22, , 23]);
                    return [4 /*yield*/, fs_1.promises.readFile("/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/exams.json")];
                case 1:
                    jsonData = _a.sent();
                    data = JSON.parse(jsonData.toString());
                    exams_1 = data["exams"];
                    dates = data["dates"];
                    return [4 /*yield*/, playwright_1.chromium.launch({ headless: true })];
                case 2:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page = _a.sent();
                    // Navigate to the login page
                    return [4 /*yield*/, page.goto("https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253DIpkTTHVYuOHC1d4BsveQFuim3h_dQ1egxZ_E01TN_QKVYHAGvz78qQ63SeQ2ABLecA_m_KcN30bBwJdEtL39qXXA6iSmqlkj8oHkD95BU_NB_iuqNpUXPw1QtUOLQtExQleqV7LbgNNBsCc3Z8AA2tKo98fC63m2YfEmr72DxmJMN7MthTgb4BaXy342MpfQlvKo001sNF0IFVw6jsTneCJwQdC-qkOFK589uD_l2htL74DbOpXwwqpctE5siqHXyM1gWdzEU_obHKos82EQcw%26nonce%3D638432902420499125.ZjY1NDI3NDEtOTZjNy00MjNiLWFhZWQtNDlkM2ZlMjAyNTdkMzdmNGYyZmQtZDA4ZS00ODEzLThlMmYtOTRhYjJkYzNhNmZi")];
                case 4:
                    // Navigate to the login page
                    _a.sent();
                    // Fill in the login form and click the login button
                    return [4 /*yield*/, page.fill('input[name="Username"]', "mjmvanwonderen@gmail.com")];
                case 5:
                    // Fill in the login form and click the login button
                    _a.sent();
                    return [4 /*yield*/, page.fill('input[name="Password"]', "i_cQESD*9sV%9sj")];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 11, , 12]);
                    // Dismiss the "Allow Cookies" banner if present
                    return [4 /*yield*/, page.evaluate(function () {
                            var cookieBanner = document.querySelector("#cookiebotwrapper");
                            if (cookieBanner) {
                                cookieBanner.remove(); // Remove the banner from the DOM
                            }
                        })];
                case 8:
                    // Dismiss the "Allow Cookies" banner if present
                    _a.sent();
                    // Scroll to the "Submit" button if necessary
                    return [4 /*yield*/, page.evaluate(function () {
                            var submitButton = document.querySelector("#submit-button");
                            if (submitButton) {
                                submitButton.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                        })];
                case 9:
                    // Scroll to the "Submit" button if necessary
                    _a.sent();
                    // Submit the form programmatically
                    // await page.$eval("#submit-button", (button) => button.click()); // Click the "Submit" button
                    // await page.click('text="Inloggen"');
                    return [4 /*yield*/, page.click("#submit-button")];
                case 10:
                    // Submit the form programmatically
                    // await page.$eval("#submit-button", (button) => button.click()); // Click the "Submit" button
                    // await page.click('text="Inloggen"');
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _a.sent();
                    console.error("Error submitting the form:", error_1);
                    return [3 /*break*/, 12];
                case 12: 
                // await page.click('text="Allow all cookies"');
                // await page.click('text="Inloggen"');
                // await page.click("#submit-button");
                // Go to the page with the data
                return [4 /*yield*/, page.goto("https://mijn-econnect.nl/#/professionals/exams-reservations")];
                case 13:
                    // await page.click('text="Allow all cookies"');
                    // await page.click('text="Inloggen"');
                    // await page.click("#submit-button");
                    // Go to the page with the data
                    _a.sent();
                    fetchedExams_1 = [];
                    page.on("response", function (response) { return __awaiter(_this, void 0, void 0, function () {
                        var aa;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!response
                                        .url()
                                        .includes("https://api.opleidingsgroep.nl/Exams/api/v1/exams-reservations")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, response.json()];
                                case 1:
                                    aa = _a.sent();
                                    fetchedExams_1 = __spreadArray([], aa, true);
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    i = 0;
                    _a.label = 14;
                case 14:
                    if (!(fetchedExams_1.length === 0)) return [3 /*break*/, 18];
                    i++;
                    if (!(i === 100)) return [3 /*break*/, 16];
                    return [4 /*yield*/, page.goto("https://mijn-econnect.nl/#/professionals/exams-reservations")];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16:
                    if (i === 200) {
                        console.log("failed to fetch exams");
                    }
                    return [4 /*yield*/, wait(100)];
                case 17:
                    _a.sent();
                    return [3 /*break*/, 14];
                case 18:
                    newExams = fetchedExams_1
                        .filter(function (exam) {
                        return !exams_1.some(function (oldExam) { return oldExam.id === exam.examId; });
                    })
                        .map(function (exam) { return ({
                        id: exam.examId,
                        date: new Date().toISOString(),
                        description: exam.moduleName,
                    }); });
                    exams_1.push.apply(exams_1, newExams);
                    dates.push(new Date().toISOString());
                    stringifyData = JSON.stringify(data, null, 2);
                    return [4 /*yield*/, fs_1.promises.writeFile("/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/exams.json", stringifyData)];
                case 19:
                    _a.sent();
                    console.log("success");
                    if (!(newExams.length > 0)) return [3 /*break*/, 21];
                    mess = "";
                    for (_i = 0, newExams_1 = newExams; _i < newExams_1.length; _i++) {
                        exam = newExams_1[_i];
                        mess = mess + " ".concat(exam.description);
                    }
                    message = "".concat(newExams.length, " new exams have been added to the list. ").concat(mess);
                    return [4 /*yield*/, sendNotification(message)];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21:
                    browser.close();
                    return [3 /*break*/, 23];
                case 22:
                    error_2 = _a.sent();
                    console.error("Error fetching exams:", error_2);
                    return [2 /*return*/, []];
                case 23: return [2 /*return*/];
            }
        });
    });
}
exports.default = fetchExams;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchExams()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
var sendNotification = function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var pushoverUserKey, pushoverToken, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pushoverUserKey = "u7soizbxedxa4wys9cdzj3247ewind";
                pushoverToken = "adqx5y9v85cdc5azwxivpf1ud69waw";
                content = {
                    token: pushoverToken,
                    user: pushoverUserKey,
                    message: message,
                };
                return [4 /*yield*/, axios_1.default
                        .post("https://api.pushover.net/1/messages.json", content)
                        .then(function (response) {
                        console.log("Notification sent successfully:", response.data);
                    })
                        .catch(function (error) {
                        console.error("Failed to send notification:", error);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
