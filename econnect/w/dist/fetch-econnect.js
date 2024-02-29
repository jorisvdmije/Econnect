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
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var fs_1 = require("fs");
function makeReq(page, url, reqHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.request.fetch(url, {
                        method: reqHeaders.method,
                        headers: reqHeaders.headers,
                        body: reqHeaders.data,
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseBody = _a.sent();
                    return [2 /*return*/, responseBody]; // Do something with the response
            }
        });
    });
}
var reqDataEconnect = {
    data: undefined,
    headers: undefined,
    method: undefined,
};
function getHeaders(route, request) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            reqDataEconnect.data = request.postData();
            reqDataEconnect.headers = request.headers();
            reqDataEconnect.method = request.method();
            return [2 /*return*/];
        });
    });
}
function wait(seconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, seconds * 1000); });
}
function fetchEconnect() {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData, data, groepen, taskTypes, browser, page, optionsUrl, optionsResponse, fetchedTaskTypes, fetchedGroepen, _loop_1, _i, fetchedTaskTypes_1, taskType, _loop_2, _a, fetchedGroepen_1, groep, tasksUrl, econnectResponse, tasks, _b, econnectResponse_1, econnect, id, url, request, econnectDetails, stringifyData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fs_1.promises.readFile("/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/data.json")];
                case 1:
                    jsonData = _c.sent();
                    data = JSON.parse(jsonData.toString());
                    groepen = data["groepen"];
                    taskTypes = data["taskTypes"];
                    return [4 /*yield*/, playwright_1.chromium.launch({ headless: false })];
                case 2:
                    browser = _c.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page = _c.sent();
                    // Navigate to the login page
                    return [4 /*yield*/, page.goto("https://accounts.mijn-econnect.nl/idsvr/core/Account/Login?ReturnUrl=%2Fidsvr%2Fcore%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Deconnectspahostclient2%26redirect_uri%3Dhttps%253A%252F%252Fmijn-econnect.nl%252Foidccallback%26response_mode%3Dform_post%26response_type%3Did_token%26scope%3Dopenid%26state%3DOpenIdConnect.AuthenticationProperties%253DIpkTTHVYuOHC1d4BsveQFuim3h_dQ1egxZ_E01TN_QKVYHAGvz78qQ63SeQ2ABLecA_m_KcN30bBwJdEtL39qXXA6iSmqlkj8oHkD95BU_NB_iuqNpUXPw1QtUOLQtExQleqV7LbgNNBsCc3Z8AA2tKo98fC63m2YfEmr72DxmJMN7MthTgb4BaXy342MpfQlvKo001sNF0IFVw6jsTneCJwQdC-qkOFK589uD_l2htL74DbOpXwwqpctE5siqHXyM1gWdzEU_obHKos82EQcw%26nonce%3D638432902420499125.ZjY1NDI3NDEtOTZjNy00MjNiLWFhZWQtNDlkM2ZlMjAyNTdkMzdmNGYyZmQtZDA4ZS00ODEzLThlMmYtOTRhYjJkYzNhNmZi")];
                case 4:
                    // Navigate to the login page
                    _c.sent();
                    // Fill in the login form and click the login button
                    return [4 /*yield*/, page.click('text="Allow all cookies"')];
                case 5:
                    // Fill in the login form and click the login button
                    _c.sent();
                    return [4 /*yield*/, page.fill('input[name="Username"]', "mjmvanwonderen@gmail.com")];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, page.fill('input[name="Password"]', "i_cQESD*9sV%9sj")];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, page.click('text="Inloggen"')];
                case 8:
                    _c.sent();
                    // Go to the page with the data
                    return [4 /*yield*/, page.goto("https://mijn-econnect.nl/#/professionals/active-tasks")];
                case 9:
                    // Go to the page with the data
                    _c.sent();
                    // await wait(3);
                    // get the headers
                    return [4 /*yield*/, page.route("**/api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks**", getHeaders)];
                case 10:
                    // await wait(3);
                    // get the headers
                    _c.sent();
                    _c.label = 11;
                case 11:
                    if (!!reqDataEconnect.headers) return [3 /*break*/, 13];
                    console.log("waiting for headers");
                    return [4 /*yield*/, wait(0.1)];
                case 12:
                    _c.sent();
                    return [3 /*break*/, 11];
                case 13:
                    console.log("jee");
                    optionsUrl = "https://api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks/get-options?category=active&teacherId=142";
                    return [4 /*yield*/, makeReq(page, optionsUrl, reqDataEconnect)];
                case 14:
                    optionsResponse = _c.sent();
                    fetchedTaskTypes = optionsResponse.taskTypes, fetchedGroepen = optionsResponse.products;
                    _loop_1 = function (taskType) {
                        if (!taskTypes.find(function (task) { return task.id === taskType["id"]; }))
                            taskTypes.push(taskType);
                    };
                    for (_i = 0, fetchedTaskTypes_1 = fetchedTaskTypes; _i < fetchedTaskTypes_1.length; _i++) {
                        taskType = fetchedTaskTypes_1[_i];
                        _loop_1(taskType);
                    }
                    _loop_2 = function (groep) {
                        if (!groepen.find(function (g) { return g.groep === groep; }))
                            console.log(groep, "groep");
                        groepen.push({ groep: groep, tarief: 0 });
                    };
                    for (_a = 0, fetchedGroepen_1 = fetchedGroepen; _a < fetchedGroepen_1.length; _a++) {
                        groep = fetchedGroepen_1[_a];
                        _loop_2(groep);
                    }
                    tasksUrl = "https://api.opleidingsgroep.nl/Notifications/api/v1/professional-tasks?category=active&limit=100&offset=0&teacherId=142";
                    return [4 /*yield*/, makeReq(page, tasksUrl, reqDataEconnect)];
                case 15:
                    econnectResponse = _c.sent();
                    tasks = [];
                    for (_b = 0, econnectResponse_1 = econnectResponse; _b < econnectResponse_1.length; _b++) {
                        econnect = econnectResponse_1[_b];
                        id = econnect.examSubscriptionId;
                        if (id) {
                            url = "https://api.opleidingsgroep.nl/Exams/api/v1/exam-subscriptions/".concat(id, "/get-exam-for-review");
                            request = makeReq(page, url, reqDataEconnect);
                            tasks.push(request);
                        }
                    }
                    return [4 /*yield*/, Promise.all(tasks)];
                case 16:
                    econnectDetails = _c.sent();
                    // Additional processing as per Python code
                    econnectDetails.forEach(function (detail) {
                        var info = econnectResponse.find(function (i) { return i.examSubscriptionId === detail.examSubscription.examSubscriptionId; });
                        if (info) {
                            var dateOnly = info.taskDate.split("T")[0];
                            detail.taskDate = dateOnly;
                            var taskType = taskTypes.find(function (t) { return t.id === info.taskType; });
                            if (taskType) {
                                detail.taskType = taskType.label;
                            }
                        }
                    });
                    stringifyData = JSON.stringify(data, null, 2);
                    return [4 /*yield*/, fs_1.promises.writeFile("/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/data.json", stringifyData)];
                case 17:
                    _c.sent();
                    browser.close();
                    return [2 /*return*/, econnectDetails];
            }
        });
    });
}
exports.default = fetchEconnect;
