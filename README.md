# Grid Animation

画像をグリッド状に分割して、段階的なフェードアニメーションで表示するJavaScriptライブラリです。

## デモ

- [オリジナル版](https://yamaguchidesign.github.io/image-grid-animation/)
- [ライブラリ版デモ](https://yamaguchidesign.github.io/image-grid-animation/demo.html)

## 使い方

### 1. ファイルを読み込む

```html
<script src="grid-animation.js"></script>
```

### 2. imgタグにクラスを追加

```html
<img src="your-image.jpg" class="grid-animation" alt="画像">
```

たったこれだけで、グリッドアニメーション効果が適用されます！

## 特徴

- **簡単**: imgタグに`class="grid-animation"`を追加するだけ
- **自動検出**: ページ読み込み後や動的に追加された画像にも対応
- **カスタマイズ可能**: グリッドサイズやアニメーション速度を調整可能
- **軽量**: 依存ライブラリなし、純粋なJavaScript

## アニメーション効果

- 8x6グリッドで画像を分割
- Z順（左→右、上→下）で点滅しながら表示
- 0.2秒後に逆N字順（列ごとに上→下）で再度点滅
- 徐々に遅くなる表示間隔
- 滑らかなフェード効果

## カスタマイズ

設定を変更する場合は、スクリプト読み込み後に以下のように設定してください：

```html
<script src="grid-animation.js"></script>
<script>
// グリッドサイズを変更
GridAnimation.config.gridCols = 10;
GridAnimation.config.gridRows = 8;

// アニメーション速度を変更
GridAnimation.config.delayMin = 5;
GridAnimation.config.delayMax = 30;

// 逆N字順の遅延時間を変更
GridAnimation.config.reverseNDelay = 300;
</script>
```

### 設定項目

| 項目 | デフォルト値 | 説明 |
|------|-------------|------|
| `gridCols` | 8 | 横のグリッド数 |
| `gridRows` | 6 | 縦のグリッド数 |
| `delayMin` | 2 | 最初のグリッドの表示間隔（ミリ秒） |
| `delayMax` | 20 | 最後のグリッドの表示間隔（ミリ秒） |
| `reverseNDelay` | 200 | 逆N字順の開始遅延（ミリ秒） |

## ブラウザ対応

モダンブラウザ（Chrome, Firefox, Safari, Edge）に対応しています。

## ライセンス

MIT

