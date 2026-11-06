<p align="center"><img src="docs/hero.svg" alt="Make it move. Keep it editable." width="100%"></p>

# GPT6 HTML Video Skill

### 让想法动起来，让作品改得动。

用 GPT-6 / Codex 把想法、脚本和参考设计做成 **HTML 动画，再导出视频**。交付画面的同时保留源码，文案、布局、动作和节奏都能继续调整。

**[看案例](examples/README.md) · [开始使用](#开始使用) · [English](README.en.md) · [日本語](README.ja.md)**

## 先看它能做什么

**产品概念片 · STILL**

一个虚构的专注设备，用材质、姿态和屏幕波形讲述“安静”。

<a href="examples/previews/product.mp4"><img src="examples/previews/product.gif" alt="STILL 产品动画预览" width="100%"></a>

[查看 MP4](examples/previews/product.mp4) · [查看源码](examples/product/film.js) · [运行案例](examples/README.md)

### 换一种内容，也换一种表达

<table>
<tr>
<td width="50%"><a href="examples/previews/data.mp4"><img src="examples/previews/data.png" alt="数据叙事：通勤时间对比" width="100%"></a><br><strong>把数据讲清楚</strong><br>错峰增长的图表、同步变化的数字。<br><a href="examples/previews/data.mp4">看视频</a> · <a href="examples/data/film.js">看源码</a></td>
<td width="50%"><a href="examples/previews/science.mp4"><img src="examples/previews/science.png" alt="科学讲解：横波传播与质点振动" width="100%"></a><br><strong>把原理演出来</strong><br>让传播的波与振动的质点各自可见。<br><a href="examples/previews/science.mp4">看视频</a> · <a href="examples/science/film.js">看源码</a></td>
</tr>
<tr>
<td width="50%"><a href="examples/previews/typography.mp4"><img src="examples/previews/typography.png" alt="动态排版：MAKE ROOM FOR IDEAS" width="100%"></a><br><strong>让文字带动节奏</strong><br>大字、裁切与旋转，形成一句视觉宣言。<br><a href="examples/previews/typography.mp4">看视频</a> · <a href="examples/typography/film.js">看源码</a></td>
<td width="50%"><a href="examples/previews/interface.mp4"><img src="examples/previews/interface.png" alt="软件演示：任务逐项完成" width="100%"></a><br><strong>让交互自己说明</strong><br>用光标、状态变化和反馈演示产品。<br><a href="examples/previews/interface.mp4">看视频</a> · <a href="examples/interface/film.js">看源码</a></td>
</tr>
</table>

五支原创案例，每支 **8 秒 · 960×540 · 24 fps · 无声**，附 HTML、源码与再渲染命令。案例品牌及数据为虚构；它们展示可能性，下一部作品由你的需求决定。

## 从你的需求开始

给一个想法，也可以带上脚本、素材或品牌规范。题材、风格、时长和工作方式按这次需求选择。

```text
用 $video-director 做一支 20 秒的产品介绍视频。
参考附件的品牌风格，重点演示三个关键交互。
先给我看预览，最终交付 MP4 和可编辑 HTML 源码。
```

想把节奏放慢、标注挪开、字幕换一种写法？继续描述修改即可。已有 HTML 动画工程也可以接着做。

| 你带来的内容 | 可以继续完成的工作 |
| --- | --- |
| 想法、脚本、参考设计 | 组织画面，选择 HTML/CSS、SVG、Canvas 或 WebGL 实现 |
| 第一版动画 | 修改文案、布局、动作、时间与素材 |
| 准备交付的工程 | 导出视频，按作品需要检查关键帧与输出规格 |

字幕、旁白和音乐按需加入；所需素材和外部服务取决于实际可用环境。

## 开始使用

在 Codex 中，让技能安装器安装这个目录：

```text
安装 https://github.com/maeheelam-beep/gpt6-html-video-skill/tree/main/skills/video-director
```

安装后，在**已安装的 `video-director` 目录**执行 `npm ci`，准备好 **Node.js 20+、FFmpeg/FFprobe、Chrome / Chromium / Edge**。之后用 `$video-director` 加上你的需求开始。

<details>
<summary><strong>先在本地跑案例</strong></summary>

```bash
git clone https://github.com/maeheelam-beep/gpt6-html-video-skill.git
cd gpt6-html-video-skill
npm --prefix skills/video-director ci
node skills/video-director/runtime/backend.mjs preview examples
```

打开终端打印的地址即可查看案例。GitHub 文件页展示源码，不执行 HTML。

重新导出一个案例：

```bash
node examples/render.mjs product
```

找不到浏览器时，设置 `CHROME_PATH` 为浏览器可执行文件路径。

</details>

<details>
<summary><strong>创建、渲染与检查自己的工程</strong></summary>

以下参数是示例，按作品需求调整。辅助命令可选，也可沿用已有工具链。

```bash
node skills/video-director/scripts/studio.mjs doctor
node skills/video-director/scripts/studio.mjs init my-film --duration 20 --size 1920x1080 --fps 24 --audio none
# 实现画面后，在 project.json 中设置 starter=false
node skills/video-director/scripts/studio.mjs render my-film --out film.mp4
node skills/video-director/scripts/studio.mjs qa my-film/film.mp4 --project my-film
node skills/video-director/scripts/studio.mjs review my-film
```

内置基础运行时支持单 worker、单采样、H.264 MP4 和已有音频混入；QA 检查规格、帧数、音轨与完整解码。视觉内容仍需实际审看。高级运动模糊、黑帧检测、响度测量及复杂 3D 等，需要相应工具。已安装的适配版 `motion-showreel` 可作为可选底座。

</details>

## 继续了解

[案例与运行说明](examples/README.md) · [技能本体](skills/video-director/SKILL.md) · [运行环境](skills/video-director/references/runtime.md) · [实现选项](skills/video-director/references/routes.md) · [检查工具](skills/video-director/references/review.md) · [验证范围](docs/VALIDATION.md) · [发布文案](docs/ANNOUNCEMENTS.md)

欢迎在 Issues 中反馈问题，也欢迎提交新的案例。描述预期效果、实际结果和复现方式，会更方便一起改进。

---

参考与致谢：[Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar)、[Garden Skills](https://github.com/ConardLi/garden-skills)、[AI Animation](https://github.com/Unclecheng-li/AI_Animation)。上游完整素材库未随仓库分发。

[MIT License](LICENSE) · [第三方说明](THIRD_PARTY_NOTICES.md)。社区项目，与 OpenAI 无隶属或背书关系。
