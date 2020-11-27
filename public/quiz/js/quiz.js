const urlParams = [...new URLSearchParams(location.search).entries()].reduce((obj, e) => ({...obj, [e[0]]: e[1] }), {});
const setName = "quizData-" + urlParams["p"] + "-" + urlParams["s"];
const setInfoName = "quizInfo-" + urlParams["p"];

function onBtnClick() {
    if (urlParams["p"] == typeof undefined || !urlParams["p"]) {
        location.href = "https://newt-house.web.app/quiz/search.html";
    } else {
        if (document.getElementById("fileTitle").textContent == "" || document.getElementById("fileName").textContent == "") {
            getInfo();
        }
        try {
            document.getElementById('load').style.display = "block";
            var answer = document.getElementById("answer");
            var btn = document.getElementById("btn");
            if (answer.style.visibility == "hidden") {
                answer.style.visibility = "visible";
                btn.innerHTML = "次の問題";
                archive();
                document.getElementById('load').style.display = "none";
            } else {
                try {
                    var quizDataPre = localStorage.getItem(setName);
                    var data = JSON.parse(quizDataPre);
                    var h = data.length;
                    var r = Math.floor(Math.random() * (h - 0) + 0);
                    if (urlParams["x"] == "simple") {
                        document.getElementById("quiz").innerHTML = data[r]["q"] + "<span id='qn'>" + data[r]["n"] + "</span>";
                        document.getElementById("qn").style.display = "none";
                    } else {
                        document.getElementById("quiz").innerHTML = data[r]["q"] + "[<span id='qn'>" + data[r]["n"] + "</span>]";
                    }
                    document.getElementById("answer").innerHTML = data[r]["a"];
                    document.getElementById('load').style.display = "none";
                    answer.style.visibility = "hidden";
                    btn.innerHTML = "答えを見る";
                } catch (e) {
                    console.log(e);
                    if (data == typeof undefined || !data || data == null) {
                        getData();
                    } else {
                        document.getElementById('load').style.display = "none";
                        innerHTML = "[004]エラー：問題を表示できません。<a href='/quiz/search.html'>検索ページ</a>からやり直してください";
                    }
                }
            }
        } catch (f) {
            console.log(f);
            document.getElementById('load').style.display = "none";
            document.getElementById("quiz").innerHTML = "[001]エラー：問題を表示できません。<a href='/quiz/search.html'>検索ページ</a>からやり直してください";
        }
    }
}

function getData() {
    // open URL
    const apiUrl = "https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec?t=show&p=" + urlParams["p"] + "&s=" + urlParams["s"];
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl, true);
    request.responseType = 'json';
    request.onload = function() {
            try {
                // processing when the response comes back
                var data = this.response;
                localStorage.setItem(setName, JSON.stringify(data));
                var getData = data;
                var quizDataPre = localStorage.getItem(setName);
                var data = JSON.parse(quizDataPre);
                var h = data.length;
                var r = Math.floor(Math.random() * (h - 0) + 0);
                if (urlParams["x"] == "simple") {
                    document.getElementById("quiz").innerHTML = data[r]["q"] + "<span id='qn'>" + data[r]["n"] + "</span>";
                    document.getElementById("qn").style.display = "none";
                } else {
                    document.getElementById("quiz").innerHTML = data[r]["q"] + "[<span id='qn'>" + data[r]["n"] + "</span>]";
                }
                document.getElementById("answer").innerHTML = data[r]["a"];
                document.getElementById('load').style.display = "none";
                answer.style.visibility = "hidden";
                btn.innerHTML = "答えを見る";
                console.log("You have never visited this page");
            } catch (g) {
                // processing when the response doesn't come back
                console.log(g);
                if (document.getElementById("fileSheetRow").textContent == "[0]") {
                    document.getElementById('load').style.display = "none";
                    document.getElementById("quiz").innerHTML = "[002]このシートにはデータが存在しません。<a href='/quiz/search.html'>検索ページ</a>から違うシートを選択してください";
                } else {
                    document.getElementById('load').style.display = "none";
                    document.getElementById("quiz").innerHTML = "[003]現在問題を表示することができません。このシートにデータが存在しない可能性があります。<a href='/quiz/search.html'>検索ページ</a>から違うシートを選択してください";
                }
            }
            // return getData;
        }
        // send the request to the URL
    request.send();
}

function getInfo() {
    var setInfoName = "quizInfo-" + urlParams["p"];
    var quizDataPre = localStorage.getItem(setInfoName);
    var localData = JSON.parse(quizDataPre);
    if (localData) {
        var data = localData;
    }
    const apiUrl = "https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec?t=info&p=" + urlParams["p"];
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl, true);
    request.responseType = 'json';
    request.onload = function() {
        data = this.response;
        document.getElementById("fileTitle").innerHTML = data[0];
        document.getElementById("modalFileTitle").innerHTML = data[0];
        document.getElementById("fileName").innerHTML = "<a href='search.html?p=" + data[1] + "'>" + data[1] + "</a>";
        document.getElementById("modalFileName").innerHTML = "<a href='search.html?p=" + data[1] + "'>" + data[1] + "</a>";
        document.getElementById("fileSheet").innerHTML = "> " + urlParams["s"] + ":" + data[3][urlParams["s"]];
        document.getElementById("fileSheetRow").innerHTML = "[" + data[4][urlParams["s"]] + "]";
        document.getElementById("modalFileSheetNum").innerHTML = urlParams["s"];
        document.getElementById("modalFileSheetName").innerHTML = data[3][urlParams["s"]];
        document.getElementById("modalFileSheetRow").innerHTML = data[4][urlParams["s"]];
        document.getElementById("fileUrl").innerHTML = "<a href='https://docs.google.com/spreadsheets/d/" + data[1] + "' target='_blank'>https://docs.google.com/spreadsheets/d/" + data[1] + "<i class='fas fa-external-link-alt'></i></a>";
        document.title = data[0] + "｜Quiz Flasher";
        localStorage.setItem(setInfoName, JSON.stringify(data));
    }
    request.send();
}



function archive() {
    var archive = document.getElementById('archive');
    var quiz = document.getElementById('quiz');
    var answer = document.getElementById('answer');
    var row = document.getElementById('qn');
    if (archive.textContent.slice(0, quiz.textContent.length) == quiz.textContent || answer.textContent == "") {
        //strにhogeを含む場合の処理

    } else {
        archive.innerHTML = '<label for="' + row.textContent + '" class="labelhistory"><table id="' + row.textContent + row.textContent + '"><tr><td><input type="checkbox" class="checks" onchange="archivecheck(name)" id="' + row.textContent + '" name="' + row.textContent + '" value="' + row.textContent + '" checked></td><td>' + quiz.textContent + '</td><td>' + answer.textContent + '</td></tr></table></label>' + archive.innerHTML;
    }
}

function archivecheck(name, id) {
    var aaa = name + name;
    if (document.getElementById(aaa).innerHTML.match(/checked/)) {
        var newtext = document.getElementById(aaa).innerHTML.replace('checked', '');
        document.getElementById(aaa).innerHTML = newtext;
    } else {
        var newtext = document.getElementById(aaa).innerHTML.replace('></td><td>', 'checked></td><td>');
        document.getElementById(aaa).innerHTML = newtext;
    }
}

function checkdiv(obj, id) {
    if (obj.checked) {
        document.getElementById('history').style.display = "block";
    } else {
        document.getElementById('history').style.display = "none";
    }
}

var c = document.getElementById('deleateCash');
c.addEventListener('click', () => {
    localStorage.removeItem(setName);
});