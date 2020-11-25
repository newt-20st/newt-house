// XMLHttpRequestオブジェクトの作成
var request = new XMLHttpRequest();

function getData() {
    // URLを開く
    request.open('GET', "https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec?page=bang-dream", true);
    //request.open('GET', "https://script.googleusercontent.com/macros/echo?user_content_key=nizMW-7XW0I5005TnUZ9WM3IqceEVUDmjOKt0jr6KCrin3ULW_HcqehyuDl9EBOJGonH0uz9kAZ93xRhZs44VC5TaIxnRfdjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMrnVg3SHD1sDJ3KzgWYUY8TpEgVsJ99dV94IG553mvqRuhhSWPmo65o798gisyFJhGBuem81hn6BabAhTYRdMZFrDsKqU4seQ&lib=MaFHeSkQ4frKInXEyCnyYhL4ni4SENd-0", true);
    request.responseType = 'json';
    // レスポンスが返ってきた時の処理を記述 
    request.onload = function() {
            // レスポンスが返ってきた時の処理
            var data = this.response;
            console.log(data);
            console.log(data[0]);
            console.log(data[0]["曲名"]);
            var c = database.collection('bang_dream_song');
            for (let i = 0; data.length - 1 > i; i++) {
                var a = data[i];
                var d = String(i + 1);
                database.collection('bang_dream_song').doc(d).set({
                        id: Number(d),
                        name: a["曲名"],
                        artist: a["アーティスト名"],
                        time: a["曲長"],
                        lyricist: a["作詞"],
                        composer: a["作曲"],
                        arranger: a["編曲"],
                        release: a["リリース"],
                        firstLyric: a["歌い出し"],
                        other: a["備考"],
                        albumArt: {
                            normal: a["アルバムアート"]
                        },
                        broadcast: {
                            spotify: a["Spotify"],
                            appleMusic: a["AppleMusic"]
                        }
                    }, { merge: true })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            }
        }
        // リクエストをURLに送信
    request.send();
}
const uri = new URI();

window.onload = function cdid() {
    try {
        var query_strings = uri.query(true); // trueを指定するとjson形式で返却してくれる
        var cdid = query_strings['id'];
        //let cdid = getQuery('id');
        if (typeof cdid !== "undefined") {
            database.collection("bang_dream_song").doc(cdid).get().then(function(doc) {
                console.log(doc.data());
                document.getElementById('songTitle').innerHTML = doc.data().name;
                document.title = doc.data().name;
                if (doc.data().albumArt.normal != "" & typeof doc.data().albumArt.normal != "undefined") {
                    document.getElementById('songImage').innerHTML = "<img class='songImage' src='" + doc.data().albumArt.normal + "'>";
                } else {
                    document.getElementById('songImage').innerHTML = "<div style='width:100%;height:100%;font-size:2.5em;text-align:center;margin:auto;font-weight:800;'>NO IMAGE</div>";
                }
                if (typeof doc.data().mv != "undefined") {
                    let videoId = getId(doc.data().mv);
                    document.getElementById('songMv').innerHTML += '<iframe width="560" height="315" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>';
                }
                let cdData = "";
                cdData += "<div class='songCoverRow'><div class='songCoverKey'>曲名</div><div class='cdCoverValue'>" + doc.data().name + "</div></div>";
                if (typeof doc.data().artist != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>アーティスト名</div><div class='cdCoverValue'>" + doc.data().artist + "</div></div>";
                }
                if (typeof doc.data().release != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>リリース日</div><div class='cdCoverValue'>" + doc.data().release + "</div></div>";
                }
                if (typeof doc.data().time != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>曲長</div><div class='cdCoverValue'>" + doc.data().time + "</div></div>";
                }
                if (typeof doc.data().lyricist != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>作詞</div><div class='cdCoverValue'>" + doc.data().lyricist + "</div></div>";
                }
                if (typeof doc.data().composer != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>作曲</div><div class='cdCoverValue'>" + doc.data().composer + "</div></div>";
                }
                if (typeof doc.data().arranger != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>編曲</div><div class='cdCoverValue'>" + doc.data().arranger + "</div></div>";
                }
                if (typeof doc.data().firstLyric != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>歌い出し</div><div class='cdCoverValue'>" + doc.data().firstLyric + "</div></div>";
                }
                if (typeof doc.data().other != "undefined") {
                    cdData += "<div class='songCoverRow'><div class='songCoverKey'>その他</div><div class='cdCoverValue'>" + doc.data().other + "</div></div>";
                }
                document.getElementById('songData').innerHTML = cdData;
                let cdMusicService = "<h4>配信情報</h4>";
                if (doc.data().broadcast.spotify != "" && typeof doc.data().broadcast.spotify != "undefined") {
                    cdMusicService += "<div class='songCoverRow'><div class='songCoverKey'>Spotify</div><div class='cdCoverValue'><a href='" + doc.data().broadcast.spotify + "' alt='Spotify(新しいタブで開きます)' target='_blank'>" + doc.data().broadcast.spotify + "</a></div></div>";
                }
                if (doc.data().broadcast.appleMusic != "" & typeof doc.data().broadcast.appleMusic != "undefined") {
                    var appleMusic = doc.data().broadcast.appleMusic;
                    console.log(appleMusic);
                    var a = appleMusic.slice(0, 8)
                    var b = 'embed.'
                    var c = appleMusic.slice(8)
                    let appleMusicEmbed = a + b + c;
                    cdMusicService += "<div class='songCoverRow'><div class='songCoverKey'>Apple Music</div><div class='cdCoverValue'><a href='" + appleMusic + "' alt='Apple Music(新しいタブで開きます)' target='_blank'>" + appleMusic + "</a></div></div>"
                    cdMusicService += "<div style='width:100%;text-align:center;'><iframe allow='autoplay *; encrypted-media *; frameborder='0' style='width:100%;overflow:hidden;background:transparent;border-radius:1em;border:solid 1px white;' sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation' src='" + appleMusicEmbed + "'></iframe></div>";
                }
                if (cdMusicService != "<h4>配信情報</h4>") {
                    document.getElementById('songMusicService').innerHTML = cdMusicService;
                }


                if (typeof doc.data().include != "undefined") {
                    let cdInclude = "<h4>収録CD</h4><ul>";
                    console.log(doc.data().include);
                    for (let i = 0; doc.data().include.length > i; i++) {
                        cdInclude += "<li>" + doc.data().include[i] + "</li>";
                    }
                    cdInclude += "</ul>"
                    document.getElementById('songInclude').innerHTML = cdInclude;
                }
            });

        } else {
            document.getElementById("songInfo").style.display = "none";
            document.getElementById('songTitle').innerHTML = "BanG Dream! 楽曲一覧";
            document.getElementById('backToTop').style.display = 'none';
            let songList = "<div class='table-responsive'><table class='table table-sm songListTable' style='min-width: 730px;'><thead><tr><th>楽曲名</th><th>アーティスト</th><th>リリース</th></tr></thead><tbody>";
            database.collection("bang_dream_song").orderBy("id").get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        songList += "<tr><td><a href='?id=" + doc.id + "'>" + doc.data().name + "</a></td><td>" + doc.data().artist + "</td><td>" + doc.data().release + "</td></tr>";
                    });
                    songList += "</tbody></table></div>";
                    document.getElementById("songList").innerHTML = songList;
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }
    } catch (e) {
        console.log(e);
        document.getElementById("songInfo").style.display = "none";
        document.getElementById('songTitle').innerHTML = "BanG Dream! 楽曲一覧";
        document.getElementById('backToTop').style.display = 'none';
        document.getElementById("songList").innerHTML = e;
    }
};

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}