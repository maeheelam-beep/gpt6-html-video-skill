# Codex / GPT6运行适配

从本技能位置解析同级技能，默认根目录为本技能父目录，VIDEO_SKILLS_HOME可覆盖。不要绑定某次工作区。Node模块用fileURLToPath/pathToFileURL，Windows中文/空格路径用参数数组传递。

studio.mjs doctor报告Node、FFmpeg/FFprobe、浏览器和可选技能。加 `--launch --project <dir>` 才启动Canvas浏览器检查。不调用外部API，不读取或打印密钥。同级motion-showreel可选；不存在时使用本技能自带runtime。在安装后的video-director目录执行npm ci安装锁定的playwright-core；浏览器、FFmpeg和FFprobe另外安装。Lemo库由它自己的register-library或LEMO_OPUSCAR_HOME管理。

自带渲染器支持单worker、单采样的浏览器逐帧采集、H.264视频和已有音频文件。自带QA检查规格、帧数、音轨与完整解码，不自动证明画面内容、字幕位置、黑闪或响度正确；这些按作品需要另行审查。高级参数仅在所选底座实际支持时使用。

原生入口不依赖Bash、Perl或jq。npm安装前创建/核验目标package.json，确认npm prefix等于该项目，避免向上查找修改父项目。脚手架拒绝覆盖非空目录。浏览器复用Chrome/Edge或CHROME_PATH；临时文件放可写位置。Python先找真实解释器，WindowsApps别名可能不能运行。

QA联系表的FFmpeg时间戳优先使用项目fonts；项目没有字体时探测系统Arial/DejaVu文件，避免Windows fontconfig缺失。它不代替影片实际中文字体，影片字体仍应自托管并带许可。

上游Read/Write/Edit/Bash/AskQuestion映射为当前宿主文件读取、apply_patch、exec_command与可用输入工具。图像、浏览器、语音、视频、插件、代理仅在确实可用且当前指令允许时使用；图像编辑遵循宿主原生工具规则。

GPT6适配指精确目标、按需读取、工具发现、可复建输出与观察后修改，不训练模型权重，不更改账号、默认模型或推理等级。技能名不证明模型能力。

project.json：

```json
{"version":1,"route":"code","starter":false,"duration":30,"width":1920,"height":1080,"fps":24,"audio":"none","scenes":[{"id":"opening","start":0,"end":6},{"id":"main","start":6,"end":30}]}
```

audio是none|required验收意图，不是文件名；render时另传音频路径。route可为code/map/ui/data/character/footage/hybrid，记录方案，不代表所有引擎已就绪。验收规格来自用户，不从最终文件倒推。

已有项目只需补规格供统一入口读取，或沿用原构建脚本；不复制starter覆盖影片。只按实际格式/素材任务安装必要解析器和声音栈。
