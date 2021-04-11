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
        while (_) try {
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
var ctx = document.getElementById("pjsekai-activeuser");
Chart.plugins.register({
    beforeDraw: function (ch) {
        var ctx = ch.chart.ctx;
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, ch.chart.width, ch.chart.height);
    }
});
var pjsekaiActiveuserChart = new Chart(ctx, {
    type: 'line',
    labels: [],
    data: {
        datasets: [{
                label: 'ユーザー数',
                data: [],
                borderColor: "rgba(0, 176, 255,1)",
                backgroundColor: "rgba(0, 176, 255,.3)",
                fill: true,
                lineTension: 0,
            }],
    },
    options: {
        title: {
            display: true,
            text: 'プロセカユーザー数推移'
        },
        scales: {
            yAxes: [{
                    ticks: {
                        suggestedMax: 1400000,
                        suggestedMin: 900000,
                        stepSize: 50000,
                    }
                }],
            xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRoation: 90
                    }
                }],
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            onComplete: function (animation) {
                var image = pjsekaiActiveuserChart.toBase64Image();
                //var image = document.getElementById('pjsekaiActiveuserChart').toDataURL();
                document.getElementById('ex_img').setAttribute('src', image);
            }
        }
    }
});
function getMarker() {
    return __awaiter(this, void 0, void 0, function () {
        var snapshot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firebase.firestore().collection('pjsekai-eventinfo').get()];
                case 1:
                    snapshot = _a.sent();
                    return [2 /*return*/, snapshot.docs.map(function (doc) { return doc.data(); })];
            }
        });
    });
}
getMarker().then(function (value) {
    try {
        var data = "";
        var label = "";
        for (var i = 0; i < value.length; i++) {
            data += "<tr><td>" + (i + 1) + "</td><td>";
            data += value[i].name;
            data += "</td><td>";
            data += value[i].user;
            data += "</td><td>";
            data += moment(value[i].start).format("MM/DD") + " ~ " + moment(value[i].end).format("MM/DD");
            data += "</td></tr>";
            try {
                label = moment(value[i].start).format("MM/DD") + " ~ " + moment(value[i].end).format("MM/DD");
            }
            catch (e) {
                label = e;
            }
            addData(pjsekaiActiveuserChart, label, value[i].user);
        }
        document.getElementById("pjsekai-activeuser-tbody").innerHTML = data;
    }
    catch (e) {
        console.log(e);
        document.getElementById("pjsekai-activeuser-tbody").innerHTML = "<tr><td colspan='3'>データを取得できませんでした</td></tr>";
    }
});
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach(function (dataset) {
        dataset.data.push(data);
    });
    chart.update();
}
