var database = firebase.database();
var dataRef = database.ref('bang-dream/music/16022401/');
dataRef.once("value")
    .then(function(snapshot) {
        var firstText = document.getElementById('bdDiscOutputArea');
        var maintext = "";
        maintext += "<tr><th>" + snapshot.child("name").val() + "</th>";
        maintext += "<th>" + snapshot.child("artist").val() + "</th>";
        maintext += "<th>" + snapshot.child("release").val() + "</th></tr>";
        firstText.innerHTML = maintext;
    });