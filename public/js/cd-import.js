var e = document.getElementById('importButton');
e.addEventListener('click', () => {
    let keyValue = document.getElementById("key").value;
    let nameValue = document.getElementById("name").value;
    let ref = database.collection("bang_dream").doc(keyValue);
    if (keyValue != null && keyValue != "" && keyValue != typeof "undefined") {
        ref.set({
            name: nameValue
        }, { merge: true });
        let artistValue = document.getElementById("artist").value;
        if (artistValue != null && artistValue != "" && artistValue != typeof "undefined") {
            ref.set({
                artist: artistValue
            }, { merge: true });
        }
        let releaseValue = document.getElementById("release").value;
        if (releaseValue != null && releaseValue != "" && releaseValue != typeof "undefined") {
            ref.set({
                release: releaseValue
            }, { merge: true });
        }
        let typeValue = document.getElementById("type").value;
        if (typeValue != null && typeValue != "" && typeValue != typeof "undefined") {
            ref.set({
                type: typeValue
            }, { merge: true });
        }
        let urlValue = document.getElementById("url").value;
        if (urlValue != null && urlValue != "" && urlValue != typeof "undefined") {
            ref.set({
                website: urlValue
            }, { merge: true });
        }
        let otherValue = document.getElementById("other").value;
        if (otherValue != null && otherValue != "" && otherValue != typeof "undefined") {
            ref.set({
                other: otherValue
            }, { merge: true });
        }
        let image1Value = document.getElementById("image1").value;
        if (image1Value != null && image1Value != "" && image1Value != typeof "undefined") {
            ref.set({
                albumArt: {
                    "normal": image1Value
                }
            }, { merge: true });
        }
        let image2Value = document.getElementById("image2").value;
        if (image2Value != null && image2Value != "" && image2Value != typeof "undefined") {
            ref.set({
                albumArt: {
                    "limited": image2Value
                }
            }, { merge: true });
        }
        let spotifyValue = document.getElementById("spotify").value;
        if (spotifyValue != null && spotifyValue != "" && spotifyValue != typeof "undefined") {
            ref.set({
                broadcast: {
                    "spotify": spotifyValue
                }
            }, { merge: true });
        }
        let appleMusicValue = document.getElementById("appleMusic").value;
        if (appleMusicValue != null && appleMusicValue != "" && appleMusicValue != typeof "undefined") {
            ref.set({
                broadcast: {
                    "appleMusic": appleMusicValue
                }
            }, { merge: true });
        }
        let num = Number(document.getElementById("num").value);
        let coverDataRef = database.collection("bang_dream").doc(keyValue).collection("cover");
        for (let i = 0; i < num - 1; i++) {
            var coverNameValue = document.getElementById("coverDisc" + i).value + document.getElementById("coverTrack" + i).value;
            if (coverNameValue != null && coverNameValue != "" && coverNameValue != typeof "undefined") {
                var coverDiscValue = document.getElementById("coverDisc" + i).value;
                if (coverDiscValue != null && coverDiscValue != "" && coverDiscValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).set({
                        disc: coverDiscValue
                    }, { merge: true });
                }
                var coverTrackValue = document.getElementById("coverTrack" + i).value;
                if (coverTrackValue != null && coverTrackValue != "" && coverTrackValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).set({
                        track: coverTrackValue
                    }, { merge: true });
                }
                var coverValue = document.getElementById("coverName" + i).value;
                if (coverValue != null && coverValue != "" && coverValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).set({
                        name: coverValue
                    }, { merge: true });
                }
                var coverArtistValue = document.getElementById("coverArtist" + i).value;
                if (coverArtistValue != null && coverArtistValue != "" && coverArtistValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).update({
                        artist: coverArtistValue
                    });
                }
                var coverLyricistValue = document.getElementById("coverLyricist" + i).value;
                if (coverLyricistValue != null && coverLyricistValue != "" && coverLyricistValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).update({
                        lyricist: coverLyricistValue
                    });
                }
                var coverComposerValue = document.getElementById("coverComposer" + i).value;
                if (coverComposerValue != null && coverComposerValue != "" && coverComposerValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).update({
                        composer: coverComposerValue
                    });
                }
                var coverArrangerValue = document.getElementById("coverArranger" + i).value;
                if (coverArrangerValue != null && coverArrangerValue != "" && coverArrangerValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).update({
                        arranger: coverArrangerValue
                    });
                }
                var coverTimeValue = document.getElementById("coverTime" + i).value;
                if (coverTimeValue != null && coverTimeValue != "" && coverTimeValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).update({
                        time: coverTimeValue
                    });
                }
                var coverFirstLyricValue = document.getElementById("coverFirstLyric" + i).value;
                if (coverFirstLyricValue != null && coverFirstLyricValue != "" && coverFirstLyricValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).update({
                        firstLyric: coverFirstLyricValue
                    });
                }
                var coverOtherValue = document.getElementById("coverOther" + i).value;
                if (coverOtherValue != null && coverOtherValue != "" && coverOtherValue != typeof "undefined") {
                    coverDataRef.doc(coverNameValue).update({
                        other: coverOtherValue
                    });
                }
            }
        }
        document.getElementById('sendCompletedText').innerHTML = "データの登録が完了しました<br><a href='cd.html?id=" + keyValue + "' target='_blank'>確認する</a>";
        document.getElementById('sendCompleted').style.display = "block";
    } else {
        document.getElementById('sendCompletedText').innerHTML = "CDのidが入力されていません";
        document.getElementById('sendCompleted').style.display = "block";
    }
});


var f = document.getElementById('makeImportAreaButton');

f.addEventListener('click', () => {
    let num = Number(document.getElementById("num").value);
    let forHtml = "";
    for (let i = 1; i < num + 1; i++) {
        forHtml += '<h4>' + i + '曲目</h4>'
        forHtml += '<label>ディスク番号(disc)<input type="number" placeholder="disc" id ="coverDisc' + i + '"></label>'
        forHtml += '<label>トラック番号(track)<input type="number" placeholder="track" id ="coverTrack' + i + '"></label>'
        forHtml += '<label>名前(name)<input type="text" placeholder="name" id ="coverName' + i + '"></label>'
        forHtml += '<label>アーティスト名(artist)<input type="text" placeholder="artist" list="artistList" id ="coverArtist' + i + '"></label>'
        forHtml += '<label>作詞(lyricist)<input type="text" placeholder="lyricist" list="lyricistList" id ="coverLyricist' + i + '"></label>'
        forHtml += '<label>作曲(composer)<input type="text" placeholder="composer" list="composerList" id ="coverComposer' + i + '"></label>'
        forHtml += '<label>編曲(arranger)<input type="text" placeholder="arranger" list="arrangerList" id ="coverArranger' + i + '"></label>'
        forHtml += '<label>時間(time)<input type="text" placeholder="time" id ="coverTime' + i + '"></label>'
        forHtml += '<label>歌い出し(firstLyric)<input type="text" placeholder="firstLyric" id ="coverFirstLyric' + i + '"></label>'
        forHtml += '<label>その他(other)<input type="text" placeholder="other" id ="coverOther' + i + '"></label>'
    }
    document.getElementById('coverArea').innerHTML = forHtml;
});

var g = document.getElementById('sendCompletedButton');

g.addEventListener('click', () => {
    document.getElementById('sendCompleted').style.display = "none";
});