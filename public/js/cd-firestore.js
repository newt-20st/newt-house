function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getQuery() {
    var q = decodeURI(location.search).split("?"),
        a, i, s, o;
    if (q.length > 1) {
        o = {};
        q = q[1];
        a = q.split("&");
        for (i = 0; i < a.length; i++) {
            s = a[i].split("=");
            if (!o[s[0]]) {
                o[s[0]] = [s[1]];
            } else {
                o[s[0]].push(s[1]);
            }
        }
    }
    return o;
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
window.onload = function cdid() {
    var cdid = getParam('id');
    if (cdid != "" && cdid != null && typeof cdid != "undefined") {
        try {
            database.collection("bang_dream").doc(cdid).get().then(function(doc) {
                console.log(doc.data());
                console.log(doc.data().artist);
                console.log(doc.data().albumArt.normal);
                document.getElementById('cdTitle').innerHTML = doc.data().name;
                document.title = doc.data().name;
                if (doc.data().albumArt.normal != null && doc.data().albumArt.normal != "" && doc.data().albumArt.normal != typeof "undefined") {
                    document.getElementById('cdImage1').innerHTML = "<img class='cdImage' src='" + doc.data().albumArt.normal + "'><div style='text-align:center;'>通常盤</div>";
                }
                if (doc.data().albumArt.limited != null && doc.data().albumArt.limited != "" && doc.data().albumArt.limited != typeof "undefined") {
                    document.getElementById('cdImage2').innerHTML = "<img class='cdImage' src='" + doc.data().albumArt.limited + "'><div style='text-align:center;'>生産限定盤</div>";
                } else {
                    document.getElementById('cdImage1').setAttribute('id', 'cdImage1Fixed');
                    document.getElementById('cdMovie').setAttribute('id', 'cdMovieFixed');
                }

                if (doc.data().mv != null && doc.data().mv != "" && doc.data().mv != typeof "undefined") {
                    let videoId = getId(doc.data().mv);
                    document.getElementById('cdMovie').innerHTML += '<iframe width="560" height="315" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
                }
                let cdData = "";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>アーティスト名</div><div class='cdCoverValue'>" + doc.data().artist + "</div></div>";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>リリース日</div><div class='cdCoverValue'>" + doc.data().release + "</div></div>";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>タイプ</div><div class='cdCoverValue'>" + doc.data().type + "</div></div>";
                cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>ウェブサイト</div><div class='cdCoverValue'><a href='" + doc.data().website + "' target='_blank'>" + doc.data().website + "</a></div></div>";
                if (doc.data().other != null && doc.data().other != "" && doc.data().other != typeof "undefined") {
                    cdData += "<div class='cdCoverRow'><div class='cdCoverKey'>その他</div><div class='cdCoverValue'>" + doc.data().other + "</div></div>";
                }
                document.getElementById('cdData').innerHTML = cdData;

                let cdMusicService = "<h4>配信情報</h4>";
                try {
                    cdMusicService += "<div class='cdCoverRow'><div class='cdCoverKey'>Spotify</div><div class='cdCoverValue'><a href='" + doc.data().broadcast.spotify + "' target='_blank'>" + doc.data().broadcast.spotify + "</a></div></div>";
                } catch {}
                let appleMusic = doc.data().broadcast.appleMusic;
                console.log(appleMusic);
                var a = appleMusic.slice(0, 8)
                var b = 'embed.'
                var c = appleMusic.slice(8)
                let appleMusicEmbed = a + b + c;
                cdMusicService += "<div class='cdCoverRow'><div class='cdCoverKey'>Apple Music</div><div class='cdCoverValue'><a href='" + appleMusic + "' target='_blank'>" + appleMusic + "</a></div></div>"
                cdMusicService += "<div style='width:100%;text-align:center;'><iframe allow='autoplay *; encrypted-media *; frameborder='0' height='450' style='width:100%;overflow:hidden;background:transparent;border-radius:1em;border:solid 1px white;' sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation' src='" + appleMusicEmbed + "'></iframe></div>";

                if (cdMusicService != "<h4>配信情報</h4>") {
                    document.getElementById('cdMusicService').innerHTML = cdMusicService;
                }

                let cdCover = "";
                database.collection("bang_dream").doc(doc.id).collection("cover").get().then((querySnapshot) => {
                    querySnapshot.forEach((docCover) => {
                        cdCover += "<h4>" + docCover.id + "</h4>";
                        if (docCover.data().track != null && docCover.data().track != "" && docCover.data().track != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>トラック番号</div><div class='cdCoverValue'>" + docCover.data().track + "</div></div>";
                        }
                        if (docCover.data().artist != null && docCover.data().artist != "" && docCover.data().artist != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>アーティスト名</div><div class='cdCoverValue'>" + docCover.data().artist + "</div></div>";
                        }
                        if (docCover.data().lyricist != null && docCover.data().lyricist != "" && docCover.data().lyricist != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>作詞</div><div class='cdCoverValue'>" + docCover.data().lyricist + "</div></div>";
                        }
                        if (docCover.data().composer != null && docCover.data().composer != "" && docCover.data().composer != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>作曲</div><div class='cdCoverValue'>" + docCover.data().composer + "</div></div>";
                        }
                        if (docCover.data().arranger != null && docCover.data().arranger != "" && docCover.data().arranger != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>編曲</div><div class='cdCoverValue'>" + docCover.data().arranger + "</div></div>";
                        }
                        if (docCover.data().time != null && docCover.data().time != "" && docCover.data().time != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>時間</div><div class='cdCoverValue'>" + docCover.data().time + "</div></div>";
                        }
                        if (docCover.data().firstLyric != null && docCover.data().firstLyric != "" && docCover.data().firstLyric != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>歌い出し</div><div class='cdCoverValue'>" + docCover.data().firstLyric + "</div></div>";
                        }
                        if (docCover.data().other != null && docCover.data().other != "" && docCover.data().other != typeof "undefined") {
                            cdCover += "<div class='cdCoverRow'><div class='cdCoverKey'>その他</div><div class='cdCoverValue'>" + docCover.data().other + "</div></div>";
                        }
                        document.getElementById('cdCover').innerHTML = cdCover;
                    });
                });
            });
        } catch (e) {
            document.getElementById('cdTitle').innerHTML = "BanG Dream! CD一覧";
            document.getElementById('backToTop').style.display = 'none';
            document.getElementById('cdInfo').style.display = 'none';
            console.log(e);
            document.getElementById('cdTitle').innerHTML = "BanG Dream! CD一覧";
            let cdList = "<p>※横方向にスクロール可能</p><table id='listDataTable'><thead><th></th><th>CD名</th><th>アーティスト名</th><th>リリース日</th></thead><tbody>";
            database.collection("bang_dream").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    cdList += "<tr><td><img id='cdThumbnail' src='" + doc.data().albumArt.normal + "'></td><td><a href='cd.html?id=" + doc.data().id + "'>" + doc.data().name + "</a></td><td>" + doc.data().artist + "</td><td>" + doc.data().release + "</td></tr>";
                })
                cdList += "</tbody></table>";
                document.getElementById('cdInfoTop').innerHTML = cdList;
            });
        }
    } else {
        document.getElementById('cdTitle').innerHTML = "BanG Dream! CD一覧";
        document.getElementById('backToTop').style.display = 'none';
        document.getElementById('cdInfo').style.display = 'none';
        console.log("top");
        document.getElementById('cdTitle').innerHTML = "BanG Dream! CD一覧";
        let cdList = "<p>※横方向にスクロール可能</p><table id='listDataTable'><thead><th></th><th>CD名</th><th>アーティスト名</th><th>リリース日</th></thead><tbody>";
        database.collection("bang_dream").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().albumArt.normal != typeof "undefined") {
                    cdList += "<tr><td><img id='cdThumbnail' src='" + doc.data().albumArt.normal + "'></td><td><a href='cd.html?id=" + doc.data().id + "'>" + doc.data().name + "</a></td><td>" + doc.data().artist + "</td><td>" + doc.data().release + "</td></tr>";
                }
            })
            cdList += "</tbody></table>";
            document.getElementById('cdInfoTop').innerHTML = cdList;
        });
    }
};

var e = document.getElementById('edit');
e.addEventListener('click', () => {

});