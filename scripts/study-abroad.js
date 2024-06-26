// 画像の配列を定義
const images = [
    "C:/Users/kouki/Downloads/38.jpg",  // 画像1のファイル名
    'C:/Users/kouki/Downloads/61310.jpg',  // 画像2のファイル名
    'C:/Users/kouki/Downloads/0c38ec5a30ee483b12e69092173c3cbf11.jpg'   // 画像3のファイル名
];
let currentIndex = 0;  // 現在の画像のインデックス

// 画像を切り替える関数
function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;  // 次の画像のインデックス
    const imgElement = document.getElementById('slideshow');
    imgElement.src = images[currentIndex];  // 画像ソースの更新
}

// 5秒ごとにchangeImage関数を呼び出す
setInterval(changeImage, 5000);

document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector('.zoom-image');

    function zoomImage() {
        image.style.transform = 'scale(1.5)'; // 画像を1.5倍に拡大
        setTimeout(() => {
            image.style.transform = 'scale(1)'; // 5秒後に元のサイズに戻す
        }, 5000);
    }

    // 5秒おきにズームアニメーションを繰り返す
    setInterval(zoomImage, 10000); // 5秒ズームイン、5秒で戻る、繰り返し
}); 



