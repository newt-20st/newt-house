var ctx = document.getElementById("pjsekai-activeuser");
Chart.plugins.register({
    beforeDraw: function(ch) {
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
            onComplete: function(animation) {
                var image = pjsekaiActiveuserChart.toBase64Image();
                //var image = document.getElementById('pjsekaiActiveuserChart').toDataURL();
                document.getElementById('ex_img').setAttribute('src', image);
            }
        }
    }
});



async function getMarker() {
    const snapshot = await firebase.firestore().collection('pjsekai-eventinfo').get();
    return snapshot.docs.map(doc => doc.data());
}

getMarker().then(value => {
    try {
        var data = "";
        var label = "";
        for (var i = 0; i < value.length; i++) {
            data += "<tr><td>" + (i + 1) + "</td><td>";
            data += value[i].name;
            data += "</td><td>";
            data += value[i].user;
            data += "</td><td>";
            data += moment(value[i].start).format("YY/MM/DD") + " ~ " + moment(value[i].end).format("YY/MM/DD");
            data += "</td></tr>";
            try {
                label = moment(value[i].start).format("YY/MM/DD") + " ~ " + moment(value[i].end).format("YY/MM/DD");
            } catch (e) {
                label = e;
            }
            addData(pjsekaiActiveuserChart, label, value[i].user);
        }
        document.getElementById("pjsekai-activeuser-tbody").innerHTML = data;
    } catch (e) {
        console.log(e);
        document.getElementById("pjsekai-activeuser-tbody").innerHTML = "<tr><td colspan='3'>データを取得できませんでした</td></tr>";
    }
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}