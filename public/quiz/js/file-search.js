const urlParams = [...new URLSearchParams(location.search).entries()].reduce((obj, e) => ({...obj, [e[0]]: e[1] }), {});

document.getElementById("search").addEventListener("click", function() {
    try {
        document.getElementById('result').innerHTML = "";
        getInfo();
    } catch (e) {
        document.getElementById("load").style.display = "none";
        document.getElementById("result").innerHTML = "URLが適切ではありません";
    }
});

function getInfo() {
    // open URL
    var url = document.getElementById('url').value;
    var urla = url.split("/d/")[1].split("/")[0];
    const apiUrl = "https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec?t=info&p=" + urla;
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl, true);
    request.responseType = 'json';
    request.onload = function() {
            // processing when the response comes back
            var data = this.response;
            console.log(data);
            console.log(data[1]);
            var sheets = '<ul>';
            for (var i = 0; i < data[2]; i++) {
                sheets = sheets + '<li><a href="play.html?p=' + data[1] + '&s=' + i + '">' + data[3][i] + '</a> (' + data[4][i] + '問)' + '</a></li><br>';
            }
            sheets = sheets + '</ul>';
            var displayText;
            displayText = '<b>スプレッドシートのID:</b> ' + data[1] + '<br><b>URL:</b><a href="https://docs.google.com/spreadsheets/d/' + data[1] + '" target="_blank">こちら</a><br><b>ファイル名:</b> ' + data[0] + '<br><b>シート数:</b> ' + data[2] + '<br>検索結果が適切な場合は下のリンクをクリックしてください。<br>' + sheets;
            document.getElementById('result').innerHTML = displayText;
            document.getElementById('result').style.display = "block";
            document.getElementById('load').style.display = "none";
        }
        // send the request to the URL
    request.send();
}

function onloadSearch() {
    if (urlParams["p"] == typeof undefined || !urlParams["p"]) {
        document.getElementById("load").style.display = "none";
        document.getElementById("result").innerHTML = "URLが適切ではありません";
    } else {
        try {
            onloadGetInfo();
        } catch (e) {
            document.getElementById("load").style.display = "none";
            document.getElementById("result").innerHTML = "URLが適切ではありません";
        }
    }
}

function onloadGetInfo() {
    document.getElementById('url').value = "https://docs.google.com/spreadsheets/d/" + urlParams["p"];
    // open URL
    const apiUrl = "https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec?t=info&p=" + urlParams["p"];
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl, true);
    request.responseType = 'json';
    request.onload = function() {
            // processing when the response comes back
            var data = this.response;
            console.log(data);
            console.log(data[1]);
            var sheets = '<ul>';
            for (var i = 0; i < data[2]; i++) {
                sheets = sheets + '<br><li><a href="play.html?p=' + data[1] + '&s=' + i + '">' + data[3][i] + '</a> (' + data[4][i] + '問)' + '</a></li>';
            }
            sheets = sheets + '</ul>';
            var displayText;
            displayText = '<b>スプレッドシートのID:</b> ' + data[1] + '<br><b>元データ:</b> <a href="https://docs.google.com/spreadsheets/d/' + data[1] + '" target="_blank">' + data[0] + ' - Google スプレッドシート<i class="fas fa-external-link-alt"></i></a><br><b>ファイル名:</b> ' + data[0] + '<br><b>シート数:</b> ' + data[2] + '<br><br>検索結果が適切な場合は下のリンクをクリックしてください。allはすべてのシートからランダムに出題します。シンプルを選ぶと問題文の末尾に問題番号が付きません。<br>' + sheets;
            document.getElementById('result').innerHTML = displayText;
            document.getElementById('result').style.display = "block";
            document.getElementById('load').style.display = "none";
        }
        // send the request to the URL
    request.send();
}