# 一、在 VS Code 编辑器中安装代码格式化插件

1、打开 VS Code 扩展，分别安装2个插件：`Prettier - Code formatter；ESLint`
  - Prettier 插件，需要在设置中配置启用；
  - ESLint 插件，安装即生效，会自动检测代码中潜在的错误，如：语法错误； 

2、打开 VS Code 设置，进行如下设置：
  - 搜索 `autosave` > 选择 `onFocusChange`，使得每次切换窗口时 VS Code 都会自动保存文件；
  - 搜索 `default formatter` > 选择 `Prettier - Code formatter`，让 Prettier 插件成为默认格式化工具；
  - 搜索 `format on save` > 并勾选，这样就能使得保存时，自动整理代码格式；


