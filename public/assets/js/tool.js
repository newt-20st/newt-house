// chat
document.getElementById('realTimeTest1Btn').addEventListener('click', () => {
    const time1 = new Date();
    const nowTime = time1.toLocaleString();
    const inputMessage = document.getElementById("realTimeTestTextInput").value;
    const inputName = document.getElementById("realTimeTestNameInput").value;
    firebase.database().ref('chat/').push({
        time: nowTime,
        name: inputName,
        text: inputMessage
    });
    inputMessage.value = "";
    inputName.value = "";
});

var commentsRef = firebase.database().ref('chat/')
commentsRef.on('child_added', function(snapshot) {
    const v = snapshot.val();
    let str = "";
    str += '<div class="text">日時：' + v.time + '</div>';
    str += '<div class="text">名前：' + v.name + '</div>';
    str += '<div class="text">メッセージ：' + v.text + '</div><hr>'
    var firstText = document.getElementById('realTimeTest1');
    firstText.innerHTML += str;
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// flash-number
document.getElementById('flashStart').addEventListener('click', () => {
    try {
        document.getElementById("flashStart").disabled = true;
        const speed = document.getElementById("flashSpeed").value;
        const low = document.getElementById("flashLow").value;
        const num = document.getElementById("flashNum").value;
        let totalNum = 0;
        for (var i = 0; i < num; i++) {
            setTimeout(function() {
                var min = Math.ceil(Math.pow(10, low - 1));
                var max = Math.floor(Math.pow(10, low));
                var displayNum = Math.floor(Math.random() * (max - min) + min);
                document.getElementById("flashInputArea").innerHTML = displayNum;
                totalNum += displayNum;
            }, speed * 1000);
        }
        document.getElementById("flashResultArea").innerHTML = totalNum;
        document.getElementById("flashStart").disabled = false;
        document.getElementById("flashAnswer").disabled = false;
    } catch (e) {
        console.log(e);
    }
});

document.getElementById('flashAnswer').addEventListener('click', () => {
    document.getElementById("flashResultArea").style.display = "block";
    document.getElementById("flashAnswer").disabled = true;
    document.getElementById("flashStart").disabled = false;
});