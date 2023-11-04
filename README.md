# CloudMusic (cloudmusic)

基于大佬构建网易云 api 的桌面程序

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### class 类名排序

自定义
布局
间隔
颜色
其他

### 主题颜色配置

| name                         | description                              | refer          |
| ---------------------------- | ---------------------------------------- | -------------- |
| MATERIAL_PRIMARYCOLOR        | Primary color                            | #2979ff        |
| MATERIAL_PRIMARYLIGHTCOLOR   | A bright version of the primary color    | #75a7ff        |
| MATERIAL_SECONDARYCOLOR      | Secondary color                          | #f5f5f5        |
| MATERIAL_SECONDARYLIGHTCOLOR | A bright version of the secondary color  | #ffffff        |
| MATERIAL_SECONDARYDARKCOLOR  | A dark version of the primary color      | #e6e6e6        |
| MATERIAL_PRIMARYTEXTCOLOR    | Color for text over primary background   | #000000        |
| MATERIAL_SECONDARYTEXTCOLOR  | Color for text over secondary background | #000000        |
| MATERIAL_THEME               | Name of theme used                       | light_blue.xml |

```
$c-mp: #fc3d49; // 主色  material-primary
$c-mp-light: rgb(255, 143, 150); // 主色亮色 material-primary-light
$c-ms: #f7f9fc; // 辅色 material-secondary
$c-ms-light: #fafafa; // 辅色亮色 material-secondary-light
$c-ms-dark: #f0f3f6; // 辅色暗色 material-secondarydark
$c-mpt: #787f8d; // 主色背景下文本
$c-mpt-highlight: #000000; // 主色背景下高亮文本 material-primary-text-highlight
$c-mst: #787f8d; // 辅色背景下文本 material-secondarytext
$c-mst-highlight: #000000; // 辅色背景下亮色文本 material-secondary-text-highlight
```

### 近期任务

1. 修正底部 footer 被侧栏遮盖盖问题 ok
2. 顶部导航栏适配 electron
3. 首页播放器制作
