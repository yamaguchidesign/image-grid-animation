// マスクアニメーション用のJavaScript
// ページ読み込み時にマスクアニメーションを初期化
window.addEventListener('DOMContentLoaded', function () {
    // マスクアニメーションクラスを持つ要素をすべて取得
    var maskContainers = document.querySelectorAll('.mask-animation');

    maskContainers.forEach(function (maskContainer) {
        // マスクアニメーションの初期化（少し遅らせて確実に実行）
        setTimeout(function () {
            initMaskAnimation(maskContainer);
        }, 100);
    });
});

// マスクアニメーションの初期化関数
function initMaskAnimation(maskContainer) {
    console.log('マスクアニメーション開始');
    var maskLayer = maskContainer.querySelector('.mask-layer');

    if (!maskLayer) {
        console.error('maskLayer要素が見つかりません');
        return;
    }

    var gridCols = 8; // 横8列
    var gridRows = 6; // 縦6行
    var totalItems = gridCols * gridRows;
    
    // 画像のURLを取得（デバッグ用）
    var img = maskContainer.querySelector('.mask-image') || maskContainer.querySelector('img');
    var imageUrl = img ? img.src : 'デフォルト画像';
    console.log('使用する画像:', imageUrl);

    // 既存のグリッドアニメーションと同じパラメータを使用
    var delayMin = 2; // 最初のグリッドの表示間隔（ミリ秒）
    var delayMax = 20; // 最後のグリッドの表示間隔（ミリ秒）

    console.log('マスクアイテムを生成中...', totalItems + '個');

    // マスクアイテムを動的に生成
    for (var i = 0; i < totalItems; i++) {
        var maskItem = document.createElement('div');
        maskItem.className = 'mask-item';
        maskLayer.appendChild(maskItem);
    }

    console.log('マスクアイテム生成完了');

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
    var maskItems = document.querySelectorAll('.mask-item');
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
