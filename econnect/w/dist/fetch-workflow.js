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
function makeReq(page, url, reqHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.request.fetch(url, {
                        method: reqHeaders.method,
                        headers: reqHeaders.headers,
                        data: reqHeaders.data,
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
function modifyFirstRequest(route) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, originalBody, bodyData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = route.request().headers();
                    originalBody = route.request().postData() || "{}";
                    try {
                        bodyData = JSON.parse(originalBody);
                    }
                    catch (error) {
                        bodyData = {};
                    }
                    // Modify the request body here
                    if (!bodyData.paging) {
                        bodyData.paging = {};
                    }
                    bodyData.paging.pageSize = 100;
                    return [4 /*yield*/, route.continue({
                            headers: headers,
                            postBody: JSON.stringify(bodyData),
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var reqData = {
    data: null,
    headers: null,
    method: null,
};
function getHeaders(route) {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = route.request();
                    reqData.data = request.postData();
                    reqData.headers = request.headers();
                    reqData.method = request.method();
                    return [4 /*yield*/, route.continue()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function fetchWorkflow() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, ids, urls, opdrachten, _i, urls_1, url, res, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch({ headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    // Login
                    return [4 /*yield*/, page.goto("https://web-ncoi.workflowwise.net/login?redirectUrl=%2Fredirect-url%2FL2FwcC9kZG0vdHJhbnNhY3Rpb25hbC93b3JrbGlzdC9UVFZCMlBQdXJjaGFzZXM%3D")];
                case 3:
                    // Login
                    _a.sent();
                    return [4 /*yield*/, page.fill('[placeholder="User name"]', "mjmvanwonderen@gmail.com")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.fill('[placeholder="Password"]', "Monique55!!!")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click('role=button[name="Sign in"]')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 7:
                    _a.sent(); // Using setTimeout for delay
                    return [4 /*yield*/, page.goto("https://web-ncoi.workflowwise.net/app/ddm/transactional/worklist/TTVB2PPurchases")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, page.route("**/api/worklist/TTVB2PPurchases*", modifyFirstRequest)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, page.route("**/api/personal/TTVB2PPurchases/**", getHeaders)];
                case 10:
                    _a.sent();
                    ids = [];
                    page.on("response", function (response) { return __awaiter(_this, void 0, void 0, function () {
                        var jsonResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!response.url().includes("/api/worklist/TTVB2PPurchases")) return [3 /*break*/, 2];
                                    return [4 /*yield*/, response.json()];
                                case 1:
                                    jsonResponse = _a.sent();
                                    ids.push.apply(ids, Object.keys(jsonResponse.data.metadata)); // Extract ID
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    _a.label = 11;
                case 11:
                    if (!(ids.length === 0 || !reqData.headers)) return [3 /*break*/, 13];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 13:
                    urls = ids.map(function (id) {
                        return "https://ncoi.workflowwise.net/api/personal/TTVB2PPurchases/".concat(id, "/lines");
                    });
                    opdrachten = [];
                    _i = 0, urls_1 = urls;
                    _a.label = 14;
                case 14:
                    if (!(_i < urls_1.length)) return [3 /*break*/, 17];
                    url = urls_1[_i];
                    return [4 /*yield*/, makeReq(page, url, reqData)];
                case 15:
                    res = _a.sent();
                    result = res.data;
                    if (!result) {
                        console.log("no data attribute on list item");
                        return [3 /*break*/, 16]; // Skip to the next iteration if result is not found
                    }
                    result = result[1]; // Accessing the second item in the data array
                    if (!result) {
                        console.log("no data[1] attribute on list item");
                        return [3 /*break*/, 16]; // Skip to the next iteration if result is not found
                    }
                    result = result.normalizedCollection;
                    if (!result) {
                        console.log("no data[1][normalizedCollection] attribute on list item");
                        return [3 /*break*/, 16]; // Skip to the next iteration if result is not found
                    }
                    result = result.entities;
                    if (!result) {
                        console.log("no data[1][normalizedCollection][entities] attribute on list item");
                        return [3 /*break*/, 16]; // Skip to the next iteration if result is not found
                    }
                    result = result.TranTTVB2PPurchasesDetailLn;
                    if (!result) {
                        console.log("no data[1][normalizedCollection][entities][TranTTVB2PPurchasesDetailLn] attribute on list item");
                        return [3 /*break*/, 16]; // Skip to the next iteration if result is not found
                    }
                    // Combine current 'opdrachten' with new results using spread operator
                    opdrachten = __spreadArray(__spreadArray([], opdrachten, true), Object.values(result), true);
                    _a.label = 16;
                case 16:
                    _i++;
                    return [3 /*break*/, 14];
                case 17:
                    browser.close();
                    return [2 /*return*/, opdrachten];
            }
        });
    });
}
exports.default = fetchWorkflow;
