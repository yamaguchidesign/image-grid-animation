// マスクアニメーション用のJavaScript
// ページ読み込み時にマスクアニメーションを初期化
window.addEventListener('DOMContentLoaded', function () {
    // マスクアニメーションクラスを持つ画像要素をすべて取得
    var maskImages = document.querySelectorAll('.mask-animation');

    maskImages.forEach(function (maskImage) {
        // 画像が完全に読み込まれてから初期化
        if (maskImage.complete) {
            initMaskAnimation(maskImage);
        } else {
            maskImage.addEventListener('load', function () {
                initMaskAnimation(maskImage);
            });
        }
    });
});

// マスクアニメーションの初期化関数
function initMaskAnimation(maskImage) {
    console.log('マスクアニメーション開始');

    var gridCols = 8; // 横8列
    var gridRows = 6; // 縦6行
    var totalItems = gridCols * gridRows;

    // 画像のURLを取得（デバッグ用）
    var imageUrl = maskImage.src;
    console.log('使用する画像:', imageUrl);

    // 既存のグリッドアニメーションと同じパラメータを使用
    var delayMin = 2; // 最初のグリッドの表示間隔（ミリ秒）
    var delayMax = 20; // 最後のグリッドの表示間隔（ミリ秒）

    console.log('マスクアイテムを生成中...', totalItems + '個');

    // 画像の位置とサイズを取得（少し遅らせて確実に取得）
    setTimeout(function () {
        var imageRect = maskImage.getBoundingClientRect();
        var containerRect = maskImage.parentNode.getBoundingClientRect();
        var imageOffsetX = imageRect.left - containerRect.left;
        var imageOffsetY = imageRect.top - containerRect.top;

        // 画像の実際の表示サイズを取得
        var imageWidth = imageRect.width;
        var imageHeight = imageRect.height;

        console.log('画像サイズ:', imageWidth, 'x', imageHeight);
        console.log('画像位置:', imageOffsetX, imageOffsetY);

        // グリッドの1セルのサイズを計算（画像サイズをグリッド数で割る）
        var cellWidth = imageWidth / gridCols;
        var cellHeight = imageHeight / gridRows;

        console.log('セルサイズ:', cellWidth, 'x', cellHeight);

        // マスクアイテムを動的に生成
        createMaskItems(maskImage, imageOffsetX, imageOffsetY, cellWidth, cellHeight, gridCols, gridRows, totalItems);

        // マスクアイテム生成後にアニメーションを設定
        startMaskAnimation(maskImage, gridCols, gridRows, totalItems, delayMin, delayMax);
    }, 50);
}

// マスクアイテム生成関数
function createMaskItems(maskImage, imageOffsetX, imageOffsetY, cellWidth, cellHeight, gridCols, gridRows, totalItems) {
    // マスクアイテムを動的に生成
    for (var i = 0; i < totalItems; i++) {
        var maskItem = document.createElement('div');
        maskItem.className = 'mask-item';

        // 行と列を計算
        var row = Math.floor(i / gridCols);
        var col = i % gridCols;

        // 位置を計算（画像のサイズに正確に合わせる）
        var posX = imageOffsetX + (col * cellWidth);
        var posY = imageOffsetY + (row * cellHeight);

        // サイズを設定
        maskItem.style.width = cellWidth + 'px';
        maskItem.style.height = cellHeight + 'px';
        maskItem.style.left = posX + 'px';
        maskItem.style.top = posY + 'px';

        // 画像の後に追加（画像の上に重なるように）
        maskImage.parentNode.insertBefore(maskItem, maskImage.nextSibling);
    }

    console.log('マスクアイテム生成完了');
}

// マスクアニメーション開始関数
function startMaskAnimation(maskImage, gridCols, gridRows, totalItems, delayMin, delayMax) {
    // 既存のグリッドアニメーションと同じ累積時間計算関数を使用
    function calculateCumulativeTime(order, maxOrder) {
        var time = 0;
        for (var i = 0; i < order; i++) {
            // 線形補間: delayMin から delayMax まで徐々に増加
            var currentDelay = delayMin + (delayMax - delayMin) * (i / maxOrder);
            time += currentDelay;
        }
        return time;
    }

    // マスクアニメーション（既存のグリッドアニメーションと同じタイミング）
    var maskItems = maskImage.parentNode.querySelectorAll('.mask-item');
    var maxOrder = totalItems - 1;

    console.log('マスクアイテム数:', maskItems.length);

    maskItems.forEach(function (item, index) {
        // 行と列を計算
        var row = Math.floor(index / gridCols);
        var col = index % gridCols;

        // Z順の表示順を計算（左上から右へ、次の行へ）
        var zOrder = index;
        var zStartTime = calculateCumulativeTime(zOrder, maxOrder);

        console.log('マスクアイテム', index, ':', zStartTime + 'ms後に消去');

        // マスクを消すアニメーション（既存のグリッドと同じタイミング）
        setTimeout(function () {
            console.log('マスクアイテム', index, 'を消去');
            item.classList.add('fade-out');
        }, zStartTime);
    });

    console.log('マスクアニメーション設定完了');
}
