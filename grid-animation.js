// グリッドアニメーション用のJavaScript
// ページ読み込み時に順番にフェードイン
window.addEventListener('DOMContentLoaded', function () {
    // グリッドアニメーションクラスを持つ要素をすべて取得
    var gridContainers = document.querySelectorAll('.grid-animation');

    gridContainers.forEach(function (gridContainer) {
        initGridAnimation(gridContainer);
    });
});

// グリッドアニメーションの初期化関数
function initGridAnimation(gridContainer) {
    var gridCols = 8; // 横8列
    var gridRows = 6; // 縦6行
    var totalItems = gridCols * gridRows;
    var delayMin = 2; // 最初のグリッドの表示間隔（ミリ秒）
    var delayMax = 20; // 最後のグリッドの表示間隔（ミリ秒）

    // 画像のURLを取得
    var img = gridContainer.querySelector('.grid-image') || gridContainer.querySelector('img');
    var imageUrl = img ? img.src : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop';

    // グリッドアイテムを動的に生成
    for (var i = 0; i < totalItems; i++) {
        var gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        // 行と列を計算
        var row = Math.floor(i / gridCols);
        var col = i % gridCols;

        // background-positionを計算（0%から100%の間で均等に配置）
        var posX = (col / (gridCols - 1)) * 100;
        var posY = (row / (gridRows - 1)) * 100;

        gridItem.style.backgroundImage = 'url(' + imageUrl + ')';
        gridItem.style.backgroundSize = '800% 600%';
        gridItem.style.backgroundPosition = posX + '% ' + posY + '%';
        gridContainer.appendChild(gridItem);
    }

    // 点滅パターン: [表示時間, 非表示時間]のペア
    var blinkPattern = [
        [40, 30],   // 0.02s表示 → 0.03s非表示
        [40, 60],   // 0.02s表示 → 0.06s非表示
        [80, 100]  // 0.08s表示 → 0.1s非表示
    ];

    // 点滅パターンを実行する関数
    function applyBlinkPattern(item, startTime) {
        var currentTime = startTime;

        blinkPattern.forEach(function (pattern) {
            var showDuration = pattern[0];
            var hideDuration = pattern[1];

            // 表示
            setTimeout(function () {
                item.classList.add('fade-in');
            }, currentTime);

            currentTime += showDuration;

            // 非表示
            setTimeout(function () {
                item.classList.remove('fade-in');
            }, currentTime);

            currentTime += hideDuration;
        });

        // 最終表示（そのまま表示し続ける）
        setTimeout(function () {
            item.classList.add('fade-in');
        }, currentTime);
    }

    // 累積時間を計算する関数（徐々に遅くなる）
    function calculateCumulativeTime(order, maxOrder) {
        var time = 0;
        for (var i = 0; i < order; i++) {
            // 線形補間: delayMin から delayMax まで徐々に増加
            var currentDelay = delayMin + (delayMax - delayMin) * (i / maxOrder);
            time += currentDelay;
        }
        return time;
    }

    // 点滅アニメーション（Z順と逆N字順の組み合わせ）
    var gridItems = document.querySelectorAll('.grid-item');
    var maxOrder = totalItems - 1;

    gridItems.forEach(function (item, index) {
        // 行と列を計算
        var row = Math.floor(index / gridCols);
        var col = index % gridCols;

        // Z順の表示順を計算（左上から右へ、次の行へ）
        var zOrder = index;
        var zStartTime = calculateCumulativeTime(zOrder, maxOrder);

        // 逆N字順の表示順を計算（列ごとに上から下）
        var reverseNOrder = col * gridRows + row;
        var reverseNStartTime = calculateCumulativeTime(reverseNOrder, maxOrder) + 100; // 0.2秒遅らせる

        // 2つのパターンを適用
        applyBlinkPattern(item, zStartTime);
        applyBlinkPattern(item, reverseNStartTime);
    });
});