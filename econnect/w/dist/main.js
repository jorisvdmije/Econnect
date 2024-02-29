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
exports.main = void 0;
var fetch_econnect_js_1 = require("./fetch-econnect.js");
var fetch_workflow_js_1 = require("./fetch-workflow.js");
var fs_1 = require("fs");
// import { db } from "../lib/db/index.js";
// const groepen = {
//   Adviesvaardigheden: 22.5,
//   "Arbeids- en gezondheidspsychologie": 22.5,
//   "Basisopleiding coaching": 22.5,
//   "Bedrijfspsychologie en organisatiegedrag": 22.5,
//   "Begeleiding in organisaties": 25,
//   "Coaching en begeleidingskunde": 50,
//   "Communicatieve vaardigheden": 12.5,
//   Dyscalculie: 25,
//   "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 1": 30,
//   "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 3": 30,
//   "Interculturele psychiatrie": 11.5,
//   "Jeugdwet en jeugdhulp": 22.5,
//   Kinderopvang: 12.5,
//   "Management van kinderopvang": 22.5,
//   "Masterclass Gedragsbe\u00efnvloeding": 50,
//   "Masterclass Onderwijs- en Opleidingsmanagement": 50,
//   "Masterclass Onderwijspedagogiek": 50,
//   "Masterclass Ontwerpen en Realiseren van Leertrajecten": 50,
//   "Masterclass Psychologie en Gedrag": 50,
//   "Ondernemend gedrag (geschikt voor niveau 3 en 4) - K0072": 65,
//   "Ontwikkelings- en levensfasepsychologie": 22.5,
//   "Oplossingsgericht werken": 22.5,
//   "Organisatie en bestuur basisonderwijs": 22.5,
//   "Organisatie en kwaliteit VO/MBO": 22.5,
//   "Persoonlijke groei en zelfinzicht": 22.5,
//   "Professionele mediation": 25,
//   "Propedeuse Portfolio Bachelor Social Work profiel Welzijn en samenleving": 50,
//   "Zakelijk schrijven": 11.5,
//   "kinderen en gedragsproblemen": 11.5,
//   "Cognitieve psychologie": 0,
//   Didactiek: 0,
//   "Integrale opdracht HBO Bachelor Social Work fase 1": 0,
//   "Integrale opdracht HBO Consulent Seksuele Gezondheid (met subsidie) (e-learning)": 0,
//   "Management voor zorg en welzijn": 0,
//   "Masterclass Digitale Technologie voor Leren en Ontwikkelen": 0,
//   "Orthopedagogiek en begeleiding": 0,
//   "Portfolio fase 3 Bachelor Social Work profiel Zorg": 0,
//   "Portfolio fase 4 Bachelor Social Work profiel Zorg": 50,
//   "Post Bachelor Oplossingsgericht Coachen": 0,
//   "Professioneel en oplossingsgericht werken": 0,
//   "Sociaal domein en ontwikkelingen": 0,
//   "Sociaal-maatschappelijke problematiek": 0,
//   "Sociale psychologie": 0,
//   "Integrale opdracht HBO Bachelor Toegepaste Psychologie fase 3 (e-learning)": 0,
//   "Integrale opdracht HBO Bachelor Pedagogiek fase 2": 0,
//   "Gedrag in organisaties": 0,
//   "Integrale opdracht HBO Bachelor Pedagogiek fase 3": 0,
//   "Interventies sociaal werk": 0,
//   "Kinderen en gedragsproblemen": 0,
//   "Pedagogisch handelen": 0,
// };
function mainAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, fetchedEconnenctData, fetchedWorkflowData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        (0, fetch_econnect_js_1.default)(),
                        (0, fetch_workflow_js_1.default)(),
                    ])];
                case 1:
                    _a = _b.sent(), fetchedEconnenctData = _a[0], fetchedWorkflowData = _a[1];
                    return [2 /*return*/, { fetchedEconnenctData: fetchedEconnenctData, fetchedWorkflowData: fetchedWorkflowData }];
            }
        });
    });
}
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var jsonData, data, groepen, econnectData, fetchedIds, _a, fetchedEconnenctData, fetchedWorkflowData, workflowData, jdata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, fs_1.promises.readFile("/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/data.json")];
            case 1:
                jsonData = _b.sent();
                data = JSON.parse(jsonData.toString());
                groepen = data["groepen"];
                econnectData = data["econnect_data_niet_gekoppeld"];
                fetchedIds = [];
                return [4 /*yield*/, mainAsync()];
            case 2:
                _a = _b.sent(), fetchedEconnenctData = _a.fetchedEconnenctData, fetchedWorkflowData = _a.fetchedWorkflowData;
                workflowData = [];
                fetchedEconnenctData.forEach(function (fetchedEconnectItem) {
                    var econnectId = fetchedEconnectItem.examSubscription.moduleInstanceId;
                    var econnectGroep = fetchedEconnectItem.examSubscription.moduleName;
                    var econnectTarief = fetchedEconnectItem.tariffValue;
                    var econnectStudent = fetchedEconnectItem.studentName;
                    // Assuming 'groepen' is an object where keys are group names and values are tariffs
                    var groep = groepen.find(function (groep) { return groep.groep === econnectGroep; });
                    if (!groep) {
                    }
                    fetchedEconnectItem.tarief = groep.tarief;
                    var id = fetchedEconnectItem.studentName
                        ? "".concat(econnectId).concat(econnectStudent)
                        : econnectId;
                    var isOld = econnectData.some(function (item) { return item.id === id; });
                    if (!isOld) {
                        var newEconnectItem = {
                            id: id,
                            description: econnectGroep,
                            tariefEconnect: econnectTarief,
                            tarief: groep.tarief,
                            status: "actief",
                            taskDate: fetchedEconnectItem.taskDate,
                            taskType: fetchedEconnectItem.taskType,
                            studentName: econnectStudent,
                            workflowId: null,
                        };
                        econnectData.push(newEconnectItem);
                    }
                    // Assuming 'fetchedIds' is an array to track all processed IDs
                    fetchedIds.push(id);
                });
                fetchedWorkflowData.forEach(function (fetchedWorkflowItem) {
                    var workflowId = fetchedWorkflowItem.id;
                    if (workflowData.some(function (item) { return item.id === workflowId; })) {
                        return; // Skip to next iteration
                    }
                    var dateOnly = fetchedWorkflowItem.ExpectedDeliveryDate.split("T")[0];
                    var newWorkflowItem = {
                        id: workflowId,
                        amount: fetchedWorkflowItem.QuantityOrdered,
                        price: fetchedWorkflowItem.PriceDC,
                        taskDate: dateOnly,
                        description: fetchedWorkflowItem.Descr,
                        amountAssigned: 0,
                    };
                    workflowData.push(newWorkflowItem);
                });
                econnectData.forEach(function (item) {
                    // Check if still active
                    if (!fetchedIds.includes(item.id)) {
                        item.status = "nietActief";
                    }
                    var econnectId = item.id;
                    fetchedWorkflowData.forEach(function (value, index) {
                        var workflowDate = value.taskDate;
                        var workflowOpdrachtNaam = value.description;
                        var econnectOpdrachtNaam = item.description;
                        var econnectDate = item.taskDate;
                        if (workflowDate === null || econnectDate === null) {
                            return; // Equivalent to 'continue' in a for loop
                        }
                        if (workflowDate == econnectDate &&
                            workflowOpdrachtNaam.includes(econnectOpdrachtNaam)) {
                            if (value.amountAssigned < value.amount) {
                                value.amountAssigned += 1;
                                item.workflowId = value.id;
                            }
                        }
                    });
                });
                jdata = JSON.stringify(data, null, 2);
                return [4 /*yield*/, fs_1.promises.writeFile("/Users/jorisvdmije/Desktop/programming/webscraping/econnect/w/dist/data.json", jdata)];
            case 3:
                _b.sent();
                return [2 /*return*/, { success: true }];
        }
    });
}); };
exports.main = main;
//   await db.$transaction([
//     db.econnect.deleteMany({}),
//     db.econnect.createMany({
//       data: econnectData,
//     }),
//   ]);
//   await db.$transaction([
//     db.workflow.deleteMany({}),
//     db.workflow.createMany({
//       data: workflowData,
//     }),
//   ]);
function deleteWorkflowById(listOfDicts, idToDelete) {
    var index = listOfDicts.findIndex(function (item) { return item.id === idToDelete; });
    if (index !== -1) {
        return listOfDicts.splice(index, 1)[0]; // Splice returns an array of removed items
    }
}
function deleteEconnectById(listOfDicts, idToDelete) {
    var index = listOfDicts.findIndex(function (item) { return item.id === idToDelete; });
    if (index !== -1) {
        return listOfDicts.splice(index, 1)[0];
    }
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.main)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
