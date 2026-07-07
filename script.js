// ======================================================
// Hear Tokyo v1.0
// 東京のライブ会場マップ
// 使用ライブラリ：Leaflet
// ======================================================



// ======================================================
// 1. 地図の設定
// ======================================================

// 表示範囲（東京23区～西東京付近）
const bounds = L.latLngBounds(
    [35.52, 139.45], // 南西
    [35.82, 139.95]  // 北東
);

// 地図作成
const map = L.map("map", {
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    minZoom: 10,
    maxZoom: 18
});

// 初期表示
map.fitBounds(bounds);

// OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);



// ======================================================
// 2. 会場データ
// （今後Firebaseに置き換える予定）
// ======================================================

const locations = [

    {
        name: "LINE CUBE SHIBUYA",

        lat: 35.6635,
        lng: 139.6989,

        venueAudio: "audio/linecube.wav",

        lives: [
            {
                title: "アークナイツオーケストラ『焼光追奏』",
                audio: "audio/gyoukou.wav"
            }
        ]
    },

    {
        name: "東京ガーデンシアター",

        lat: 35.6307,
        lng: 139.7920,

        venueAudio: "audio/garden.wav",

        lives: [
            {
                title: "『And So Henceforth,』",
                audio: "audio/andso.wav"
            }
        ]
    },
    {
    name: "LaLa arena TOKYO-BAY",

    lat: 35.6859,
    lng: 139.9958,

    venueAudio: "audio/lala.wav",

    lives: [
      {
        title: "『ポケモン feat. 初音ミク Project VOLTAGE Live!』",
        audio: "audio/mikupoke.wav"
      }
    ]
  },

  {
    name: "幕張メッセ",

    lat: 35.6486,
    lng: 140.0347,

    venueAudio: "audio/makuhari.wav",

    lives: [
      {
        title: "『花譜 4th ONEMAN LIVE 怪歌(再)』",
        audio: "audio/kaf.wav"
      }
    ]
  },
  {
    name: "豊洲PIT",

    lat: 35.6494,
    lng: 139.7907,

    venueAudio: "audio/toyosu.wav",

    lives: [
      {
        title: "『idios 1st live seize the day』",
        audio: "audio/idios"
      }
    ]
  },
  {
    name: "日本武道館",

    lat: 35.6933,
    lng: 139.7498,

    venueAudio: "audio/budoukan.wav",

    lives: [
      {
        title: "『DUSTCELL Live 「ONE」at 武道館』",
        audio: "audio/dustcell.wav"
      }
    ]
}
];



// ======================================================
// 3. 音声再生
// ======================================================

let currentAudio = null;

// 音声再生
function playAudio(file) {

    if (!file) return;

    // 他の音声を停止
    if (currentAudio) {

        currentAudio.pause();
        currentAudio.currentTime = 0;

    }

    currentAudio = new Audio(file);

    currentAudio.play();

}



// ======================================================
// 4. マーカー生成
// ======================================================

const markers = [];

locations.forEach(place => {

    // ピンを追加
    const marker = L.marker([place.lat, place.lng]).addTo(map);

    // ポップアップHTML
    let popupHTML = `<h3>${place.name}</h3>`;



    // -------------------------------
    // 会場紹介音声
    // -------------------------------

    if (place.venueAudio) {

        popupHTML += `

            <button onclick="playAudio('${place.venueAudio}')">
                🎤 会場紹介を聞く
            </button>

            <hr>

        `;

    }



    // -------------------------------
    // ライブ一覧
    // -------------------------------

    if (place.lives.length > 0) {

        popupHTML += "<h4>参加したライブ</h4>";

        place.lives.forEach(live => {

            popupHTML += `

                <p><strong>${live.title}</strong></p>

                <button onclick="playAudio('${live.audio}')">
                    ▶ 思い出を聞く
                </button>

            `;

        });

    }

    else {

        popupHTML += "<p>まだライブの登録はありません。</p>";

    }

    // ポップアップ設定
    marker.bindPopup(popupHTML);

    // 検索用
    markers.push({
        name: place.name,
        marker: marker
    });

});



// ======================================================
// 5. 会場検索
// ======================================================

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", () => {

    const keyword = searchBox.value.toLowerCase();

    markers.forEach(place => {

        if (place.name.toLowerCase().includes(keyword)) {

            map.setView(place.marker.getLatLng(), 15);

            place.marker.openPopup();

        }

    });

});



// ======================================================
// 6. 今後追加予定
// ======================================================
