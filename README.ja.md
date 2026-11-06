<p align="center"><img src="docs/hero.svg" alt="Make it move. Keep it editable." width="100%"></p>

# GPT6 HTML Video Skill

### アイデアに動きを。作品に、編集の自由を。

GPT-6 / Codexでアイデアや台本、参考デザインを **HTMLアニメーションにして、動画へ書き出す**スキルです。ソースも残るので、文言、レイアウト、動き、タイミングを続けて調整できます。

**[作例を見る](examples/README.md) · [使い始める](#使い始める) · [中文](README.md) · [English](README.en.md)**

## まず、動く作例から

**製品コンセプト · STILL**

架空の集中支援デバイスを、素材感、穏やかな動き、画面の波形で表現しました。

<a href="examples/previews/product.mp4"><img src="examples/previews/product.gif" alt="STILL 製品アニメーション" width="100%"></a>

[MP4を見る](examples/previews/product.mp4) · [ソースを見る](examples/product/film.js) · [作例を動かす](examples/README.md)

### 伝える内容に合わせて、表現も変える

<table>
<tr>
<td width="50%"><a href="examples/previews/data.mp4"><img src="examples/previews/data.png" alt="架空の通勤時間を比較するグラフ" width="100%"></a><br><strong>データに流れをつくる</strong><br>順に伸びる棒グラフと、連動する数値。<br><a href="examples/previews/data.mp4">動画</a> · <a href="examples/data/film.js">ソース</a></td>
<td width="50%"><a href="examples/previews/science.mp4"><img src="examples/previews/science.png" alt="横波の模式図" width="100%"></a><br><strong>原理を目に見える形に</strong><br>進む波と、振動する粒子を描き分ける。<br><a href="examples/previews/science.mp4">動画</a> · <a href="examples/science/film.js">ソース</a></td>
</tr>
<tr>
<td width="50%"><a href="examples/previews/typography.mp4"><img src="examples/previews/typography.png" alt="MAKE ROOM FOR IDEAS" width="100%"></a><br><strong>文字でリズムをつくる</strong><br>大きな文字、マスク、回転する図形。<br><a href="examples/previews/typography.mp4">動画</a> · <a href="examples/typography/film.js">ソース</a></td>
<td width="50%"><a href="examples/previews/interface.mp4"><img src="examples/previews/interface.png" alt="架空のタスク管理アプリ" width="100%"></a><br><strong>操作で使い方を伝える</strong><br>カーソル、状態変化、完了のフィードバック。<br><a href="examples/previews/interface.mp4">動画</a> · <a href="examples/interface/film.js">ソース</a></td>
</tr>
</table>

5つのオリジナル作例は、それぞれ **8秒・960×540・24 fps・音声なし**。HTML、ソース、再レンダリング用コマンドを公開しています。ブランドとデータは架空です。次の作品の方向は、あなたの要望から決まります。

## 要望から始める

短いアイデアでも、台本やブランドガイドがあっても構いません。内容、作風、尺、進め方を今回の依頼に合わせます。

```text
$video-director で、20秒の商品紹介動画を作ってください。
添付のブランドガイドに合わせ、3つの主要な操作を見せてください。
まずプレビューを確認したいです。納品はMP4と編集可能なHTMLソースで。
```

テンポを落とす、ラベルを動かす、字幕を書き換える。変更を伝えて、同じプロジェクトを調整できます。既存のHTMLアニメーションからの制作にも対応します。

| 用意するもの | 取り組めること |
| --- | --- |
| アイデア・台本・参考デザイン | HTML/CSS、SVG、Canvas、WebGLで画面を構成 |
| アニメーションの初稿 | 文言、レイアウト、動き、タイミング、素材の調整 |
| 納品前のプロジェクト | 動画の書き出し、必要なフレームと出力仕様の確認 |

字幕、ナレーション、音楽は必要に応じて追加します。素材や外部サービスは、実際に使える環境に依存します。

## 使い始める

Codexのスキルインストーラーに、次のディレクトリーのインストールを依頼します。

```text
https://github.com/maeheelam-beep/gpt6-html-video-skill/tree/main/skills/video-director
```

**インストール先の `video-director` ディレクトリー**で `npm ci` を実行してください。**Node.js 20以上、FFmpeg/FFprobe、Chrome / Chromium / Edge**を用意し、`$video-director` に依頼を続けて入力します。

<details>
<summary><strong>ローカルで作例を動かす</strong></summary>

```bash
git clone https://github.com/maeheelam-beep/gpt6-html-video-skill.git
cd gpt6-html-video-skill
npm --prefix skills/video-director ci
node skills/video-director/runtime/backend.mjs preview examples
```

ターミナルに表示されたURLを開きます。GitHubのファイルページではHTMLは実行されません。作例を再レンダリングするには：

```bash
node examples/render.mjs product
```

ブラウザーを検出できない場合は、`CHROME_PATH` に実行ファイルのパスを設定してください。

</details>

<details>
<summary><strong>プロジェクトの作成・書き出し・確認</strong></summary>

以下の値は例です。作品に合わせて変更できます。補助コマンドは任意で、既存のツールチェーンも利用できます。

```bash
node skills/video-director/scripts/studio.mjs doctor
node skills/video-director/scripts/studio.mjs init my-film --duration 20 --size 1920x1080 --fps 24 --audio none
# 内容を実装し、project.json の starter を false に変更します。
node skills/video-director/scripts/studio.mjs render my-film --out film.mp4
node skills/video-director/scripts/studio.mjs qa my-film/film.mp4 --project my-film
node skills/video-director/scripts/studio.mjs review my-film
```

同梱ランタイムは単一ワーカー・単一サンプル、H.264 MP4、既存音声の合成に対応します。基本検査は仕様、フレーム数、音声トラック、全編のデコードを確認します。画面内容は別途目視で確認します。高度なモーションブラー、黒フレーム検出、音量測定、複雑な3Dなどには対応するツールが必要です。適応済みの `motion-showreel` は任意のバックエンドとして利用できます。

</details>

## 詳しく見る

[作例と実行方法](examples/README.md) · [スキル本体](skills/video-director/SKILL.md) · [実行環境](skills/video-director/references/runtime.md) · [実装の選択肢](skills/video-director/references/routes.md) · [確認ツール](skills/video-director/references/review.md) · [検証範囲](docs/VALIDATION.md) · [紹介文](docs/ANNOUNCEMENTS.md)

不具合の報告や新しい作例を歓迎します。期待した結果、実際の結果、再現方法を添えていただけると改善に役立ちます。

---

参考・謝辞：[Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar)、[Garden Skills](https://github.com/ConardLi/garden-skills)、[AI Animation](https://github.com/Unclecheng-li/AI_Animation)。上流の素材集は同梱していません。

[MIT License](LICENSE) · [第三者に関する表記](THIRD_PARTY_NOTICES.md)。コミュニティープロジェクトであり、OpenAIの公式プロジェクトではありません。
