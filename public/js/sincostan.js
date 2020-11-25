var sctStart = document.getElementById('sctStart');
sctStart.addEventListener('click', () => {
    try {
        const resultErrorArea = document.getElementById("sctResultError");
        resultErrorArea.innerHTML = "";
        const angle = document.getElementById("sctInput").value;
        var sctSinResult = document.getElementById("sctSinResult");
        var sctCosResult = document.getElementById("sctCosResult");
        var sctTanResult = document.getElementById("sctTanResult");
        if (angle == 90) {
            var sinResult = Math.sin(angle * (Math.PI / 180));
            var cosResult = 0;
            var tanResult = "なし";
        } else if (angle == 180 || angle == 360) {
            var sinResult = 0;
            var cosResult = Math.cos(angle * (Math.PI / 180));
            var tanResult = Math.tan(angle * (Math.PI / 180));
        } else if (angle == 270) {
            var sinResult = Math.sin(angle * (Math.PI / 180));
            var cosResult = 0;
            var tanResult = Math.tan(angle * (Math.PI / 180));
        } else {
            var sinResult = Math.sin(angle * (Math.PI / 180));
            var cosResult = Math.cos(angle * (Math.PI / 180));
            var tanResult = Math.tan(angle * (Math.PI / 180));
        }
        sctSinResult.innerHTML = sinResult;
        sctCosResult.innerHTML = cosResult;
        sctTanResult.innerHTML = tanResult;
    } catch (e) {
        const resultErrorArea = document.getElementById("sctResultError");
        resultErrorArea.innerHTML = "設定の値が正しくありません";
        console.log(e);
    }

});