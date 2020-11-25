function createRandomNumber(n) {
    var codeTable = "0123456789";
    var firstCodeTable = "123456789";
    var r = "";
    r += firstCodeTable.charAt(Math.floor(firstCodeTable.length * Math.random()));
    for (var i = 0, k = codeTable.length; i < n - 1; i++) {
        r += codeTable.charAt(Math.floor(k * Math.random()));
    }
    return r;
}

function sleep(waitMsec) {
    var startMsec = new Date();

    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}

var flashStart = document.getElementById('flashStart');
var flashAnswer = document.getElementById('flashAnswer');

flashStart.addEventListener('click', () => {
    try {
        const flashSpeed = document.getElementById("flashSpeed").value;
        const flashLow = document.getElementById("flashLow").value;
        const flashNum = document.getElementById("flashNum").value;
        const inputArea = document.getElementById("flashInputArea");
        const resultArea = document.getElementById("flashResultArea");
        resultArea.style.display = "none";
        var count = 0;
        var sum = 0;
        var answer = " [ ";
        var id = setInterval(
            function() {
                if (count >= flashNum) {
                    clearInterval(id);　 //idをclearIntervalで指定
                    inputArea.innerHTML = "";
                    answer += "]";
                    resultArea.innerHTML = '<span id="flashResultMain">' + sum + '</span>' + answer;
                } else {
                    var inputNumber = createRandomNumber(flashLow);
                    inputArea.innerHTML = inputNumber;
                    sum += Number(inputNumber);
                    answer += inputNumber + " ";
                    count++;
                }
            }, (flashSpeed * 1000)
        );

    } catch (e) {
        const resultArea = document.getElementById("flashResultArea");
        resultArea.innerHTML = "設定の値が正しくありません";
        resultArea.style.display = "block";
    }

});

flashAnswer.addEventListener('click', () => {
    const resultArea = document.getElementById("flashResultArea");
    resultArea.style.display = "block";
});