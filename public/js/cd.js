function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload = function cdid() {
    try {
        var cdid = getParam('id');
        if (cdid != "" && cdid != null && typeof cdid != "undefined") {
            let database = firebase.database();
            let dataRef = database.ref('bang-dream/music/' + cdid + '/');
            dataRef.once("value", function(snapshot) {
                document.getElementById('cdTitle').innerHTML = snapshot.val().name;
                document.title = snapshot.val().name;
                document.getElementById('cdImage1').innerHTML = "<img class='cdImage' src='" + snapshot.val().image.albumArt.normal + "'><div style='text-align:center;'>通常盤</div>";
                if (snapshot.val().image.albumArt.limited !== undefined) {
                    document.getElementById('cdImage2').innerHTML = "<img class='cdImage' src='" + snapshot.val().image.albumArt.limited + "'><div style='text-align:center;'>生産限定盤</div>";
                } else {
                    document.getElementById('cdImage1').setAttribute('id', 'cdImage1Fixed');
                    document.getElementById('cdMovie').setAttribute('id', 'cdMovieFixed');
                }
                if (snapshot.val().trial != typeof "undefined") {
                    let videoId = getId(snapshot.val().trial);
                    if (document.getElementById('cdMovie') != null && document.getElementById('cdMovie') != "" && document.getElementById('cdMovie') != typeof "undefined") {
                        document.getElementById('cdMovie').innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
                    } else {
                        document.getElementById('cdMovieFixed').innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
                    }
                }
                let cdData = "";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>アーティスト名</div><div class='cdCoverValue'>" + snapshot.val().artist + "</div></div>";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>リリース日</div><div class='cdCoverValue'>" + snapshot.val().release + "</div></div>";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>タイプ</div><div class='cdCoverValue'>" + snapshot.val().type + "</div></div>";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>ウェブサイト</div><div class='cdCoverValue'><a href='" + snapshot.val().url + "'>" + snapshot.val().url + "</a></div></div>";
                if (snapshot.val().other != null && snapshot.val().other != "" && snapshot.val().other != typeof "undefined") {
                    cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>その他</div><div class='cdCoverValue'>" + snapshot.val().other + "</div></div>";
                }
                document.getElementById('cdData').innerHTML = cdData;
            });
            let musicServiceDataRef = database.ref('bang-dream/music/' + cdid + '/musicService/');
            let cdMusicService = "<h4>配信情報</h4>";
            musicServiceDataRef.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    let childData = childSnapshot.val();
                    if (childData != "") {
                        cdMusicService += "<div class='cdCoverRow'><div class='cdCoverKey'>" + childKey + "</div><div class='cdCoverValue'><a href='" + childData + "' target='_blank'>" + childData + "</a></div></div>";
                    }
                });
                if (cdMusicService != "<h4>配信情報</h4>") {
                    document.getElementById('cdMusicService').innerHTML = cdMusicService;
                }
            });
            let coverDataRef = database.ref('bang-dream/music/' + cdid + '/cover/');
            let cdCover = "";
            coverDataRef.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    let childData = childSnapshot.val();
                    cdCover += "<h4>" + childData.name + "</h4>";
                    if (childKey != null && childKey != "" && childKey != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>トラック番号</div><div class='cdCoverValue'>" + childKey + "</div></div>";
                    }
                    if (childData.artist != null && childData.artist != "" && childData.artist != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>アーティスト名</div><div class='cdCoverValue'>" + childData.artist + "</div></div>";
                    }
                    if (childData.lyricist != null && childData.lyricist != "" && childData.lyricist != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>作詞</div><div class='cdCoverValue'>" + childData.lyricist + "</div></div>";
                    }
                    if (childData.composer != null && childData.composer != "" && childData.composer != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>作曲</div><div class='cdCoverValue'>" + childData.composer + "</div></div>";
                    }
                    if (childData.arranger != null && childData.arranger != "" && childData.arranger != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>編曲</div><div class='cdCoverValue'>" + childData.arranger + "</div></div>";
                    }
                    if (childData.time != null && childData.time != "" && childData.time != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>時間</div><div class='cdCoverValue'>" + childData.time + "</div></div>";
                    }
                    if (childData.firstLyric != null && childData.firstLyric != "" && childData.firstLyric != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>歌い出し</div><div class='cdCoverValue'>" + childData.firstLyric + "</div></div>";
                    }
                    if (childData.other != null && childData.other != "" && childData.other != typeof "undefined") {
                        cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>その他</div><div class='cdCoverValue'>" + childData.other + "</div></div>";
                    }
                    document.getElementById('cdCover').innerHTML = cdCover;
                });
            });


        } else {
            document.getElementById('cdTitle').innerHTML = "BanG Dream! CD一覧";
            document.getElementById('backToTop').style.display = 'none';
            document.getElementById('cdInfo').style.display = 'none';
            console.log("top");
            document.getElementById('cdTitle').innerHTML = "BanG Dream! CD一覧";
            let listDataRef = database.ref('bang-dream/music/');
            let cdList = "<p>※横方向にスクロール可能</p><table id='listDataTable'><thead><th></th><th>CD名</th><th>アーティスト名</th><th>リリース日</th></thead><tbody>";
            listDataRef.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    let childKey = childSnapshot.key;
                    let childData = childSnapshot.val();
                    cdList += "<tr><td><img id='cdThumbnail' src='" + childData.image.albumArt.normal + "'></td><td><a href='cd.html?id=" + childKey + "'>" + childData.name + "</a></td><td>" + childData.artist + "</td><td>" + childData.release + "</td></tr>";
                });
                cdList += "</tbody></table>";
                document.getElementById('cdInfoTop').innerHTML = cdList;
            });
        }
    } catch (e) {
        console.log(e);
        document.getElementById('cdTitle').innerHTML = "BanG Dream! CD一覧";
        document.getElementById('backToTop').style.display = 'none';
        document.getElementById('cdInfo').style.display = 'none';
        let listDataRef = database.ref('bang-dream/music/');
        cdList += "<tr><td><img id='cdThumbnail' src='" + childData.image.albumArt.normal + "'></td><td><a href='cd.html?id=" + childKey + "'>" + childData.name + "</a></td><td>" + childData.artist + "</td><td>" + childData.release + "</td></tr>";
        listDataRef.once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val();
                cdList += "<tr><td>" + childData.image.albumArt.normal + "</td><td><a href='cd.html?id=" + childKey + "'>" + childData.name + "</a></td><td>" + childData.artist + "</td><td>" + childData.release + "</td></tr>";
                console.log(childData.name);
            });
            cdList += "</tbody></table>";
            document.getElementById('cdInfoTop').innerHTML = cdList;
        });
    }
}

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}