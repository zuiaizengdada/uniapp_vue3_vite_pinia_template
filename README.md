# 项目目录结构说明

## 概述

此项目是uniapp+vue3+vite+pinia+tailwindcss+mock技术栈组成的模板，可用于APP、小程序、h5项目的快速搭建。

## 目录结构

```
UNI_TEMPLATE
├── .hbuilderx
├── .husky
├── .vscode
├── dist
├── node_modules
├── src
│   ├── apis
│   ├── common
│   ├── components
│   ├── hooks
│   ├── locale
│   ├── pages
│   ├── static
│   ├── store
│   ├── types
│   ├── utils
│   ├── App.vue
│   └── main.ts
├── manifest.json
├── pages.json
├── uni.scss
├── .editorconfig
├── .env
├── .env.beta
├── .env.development
├── .env.production
├── .env.test
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── commitlint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 详细说明

### 根目录

| 文件/目录              | 说明                                                 |
| ---------------------- | ---------------------------------------------------- |
| `.hbuilderx`           | HBuilderX 编辑器相关配置。                           |
| `.husky`               | Git hooks 相关配置，用于自动执行脚本来规范代码提交。 |
| `.vscode`              | VS Code 编辑器的工作区配置文件。                     |
| `dist`                 | 项目构建后的文件。                                   |
| `node_modules`         | 项目的依赖包。                                       |
| `.editorconfig`        | 定义代码格式的配置文件，统一不同编辑器的编码风格。   |
| `.env*`                | 环境变量配置文件，分别对应不同的环境。               |
| `.eslintrc.js`         | ESLint 的配置文件，用于定义代码规范和检查规则。      |
| `.gitignore`           | 指定不需要纳入版本控制的文件和目录。                 |
| `.prettierignore`      | 指定不需要 Prettier 格式化的文件和目录。             |
| `.prettierrc`          | Prettier 的配置文件，用于定义代码格式化规则。        |
| `commitlint.config.js` | Commitlint 的配置文件，用于规范 Git 提交信息。       |
| `index.html`           | 项目的 HTML 入口文件。                               |
| `package.json`         | 项目配置文件，记录项目的依赖和配置信息。             |
| `pnpm-lock.yaml`       | PNPM 包管理器的锁定文件，记录项目依赖的具体版本。    |
| `README.md`            | 项目的说明文档，介绍项目的基本信息和使用方法。       |
| `tailwind.config.js`   | Tailwind CSS 的配置文件。                            |
| `tsconfig.json`        | TypeScript 的配置文件。                              |
| `vite.config.ts`       | Vite 的配置文件，用于配置构建和开发服务器。          |

### `src` 目录

| 目录/文件    | 说明                                                  |
| ------------ | ----------------------------------------------------- |
| `apis`       | 存放与后台交互的 API 请求函数。                       |
| `common`     | 存放公共的工具函数、常量等。                          |
| `components` | 存放通用的 Vue 组件，这些组件可以在多个地方重用。     |
| `hooks`      | 存放自定义的 Vue Composition API 函数，便于逻辑复用。 |
| `locale`     | 存放国际化相关的文件。                                |
| `pages`      | 存放页面级别的组件，每个文件夹代表一个页面。          |
| `static`     | 存放静态资源文件，如图片、样式等。                    |
| `store`      | 存放状态管理相关的文件（如 Vuex）。                   |
| `types`      | 存放 TypeScript 类型声明文件。                        |
| `utils`      | 存放工具函数和辅助类。                                |
| `App.vue`    | 项目根组件。                                          |
| `main.ts`    | 项目入口文件，初始化并挂载 Vue 应用。                 |

### 详细目录说明

#### 📁 `.hbuilderx`

HBuilderX 编辑器相关配置文件。

#### 📁 `.husky`

Git hooks 相关配置，用于在代码提交前后自动执行一些脚本，确保代码质量和规范。

#### 📁 `.vscode`

VS Code 编辑器的工作区配置文件，包括调试、代码片段等设置。

#### 📁 `dist`

项目构建后的文件存放目录，通常用于生产环境部署。

#### 📁 `node_modules`

存放通过 npm 或 pnpm 安装的项目依赖包。

#### 📁 `src`

项目的源代码目录，是开发的主要目录，包括以下子目录和文件：

- **apis**: 用于定义与后台交互的 API 请求函数，所有的网络请求都应该集中在这里管理。
- **common**: 存放项目中使用的公共工具函数和常量等，便于在多个模块中重用。
- **components**: 存放通用的 Vue 组件，这些组件可以在多个地方重用。
- **hooks**: 存放自定义的 Vue Composition API 函数，便于逻辑复用。
- **locale**: 存放国际化相关的文件，用于支持多语言功能。
- **pages**: 存放页面级别的 Vue 组件，每个文件夹代表一个页面。
- **static**: 存放静态资源文件，如图片、样式等。
- **store**: 存放状态管理相关的文件（如 Vuex）。
- **types**: 存放 TypeScript 类型声明文件。
- **utils**: 存放工具函数和辅助类。
- **App.vue**: 项目根组件，所有页面和组件的入口。
- **main.ts**: 项目入口文件，初始化并挂载 Vue 应用。

### 其他配置文件

#### 🌐 `.env*`

环境变量配置文件，根据不同环境分别命名，例如 `.env.development`、`.env.production` 等。

#### 🚨 `.eslintrc.js`

ESLint 配置文件，用于定义代码规范和检查规则，确保代码风格一致。

#### 📜 `.gitignore`

指定哪些文件和目录不需要纳入版本控制，例如 `node_modules`、构建后的文件等。

#### 🎨 `.prettier*`

Prettier 配置文件，用于定义代码格式化规则，确保代码风格统一。

#### 🔗 `commitlint.config.js`

Commitlint 配置文件，用于规范 Git 提交信息，确保提交信息清晰明了。

#### 📄 `index.html`

项目的 HTML 入口文件，Vite 会自动注入构建后的资源。

#### 📦 `package.json`

项目配置文件，记录项目的依赖、脚本和配置信息。

#### 🔒 `pnpm-lock.yaml`

PNPM 包管理器的锁定文件，记录项目依赖的具体版本，确保每次安装的依赖一致。

#### 📘 `README.md`

项目的说明文档，介绍项目的基本信息、安装和使用方法等。

#### 🛠 `tailwind.config.js`

Tailwind CSS 的配置文件，用于自定义 Tailwind 的默认配置。

#### 🔧 `tsconfig.json`

TypeScript 的配置文件，用于配置 TypeScript 编译选项。

#### ⚙️ `vite.config.ts`

Vite 的配置文件，用于配置项目的构建和开发服务器。

## 特别说明

项目中可全局开启/关闭`mock`数据，在`.env`文件中设置`VITE_MOCK`的值，true是开启，false是关闭。

```ts
VITE_MOCK = true
```

也可以针对某个单独的接口开启或者关闭`mock`，例如

```ts
function getBookData(): Promise<Data<Book>> {
  return apiService.get('/book', {}, { mock: true })
}
```

本项目已经开启了`easycom`自动导入组件，在`components`文件夹中建立同名文件夹和文件，无须手动导入即可在`vue`文件中直接使用。

```
├── components
│   ├──TestComponent
        ├──TestComponent
```

```html
<template>
  <TestComponent />
</template>
```

本项目安装了[unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)插件，无须手动导入`vue`以及`pinia`和`uniapp`的api即可直接在`setup`中使用。

这是[unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)插件的`vite`配置：

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  //...其他配置
  plugins: [
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'uni-app',
        {
          '@/utils/modules/pinia-auto-refs': ['useStore']
        }
      ],
      dts: 'src/types/auto-import.d.ts'
    })
  ]
})
```

`vue`页面使用示例：

```html
<script setup lang="ts">
  // import { ref,watch } form 'vue'
  const count = ref<number>(0)
  watch(count, (val) => {
    if (val > 3) {
      console.log('val的值大于3')
    }
  })
</script>
```

创建`pinia`的`store`文件时，导出必须使用`default`默认导出，否则`useStore`无法识别到相应的`store`文件。

```ts
const userStore = defineStore('user', () => {
  const userName = ref<string>('zyq')

  return {
    userName
  }
})

// 使用defaule默认导出
export default userStore
```

使用`useStore`可以自动识别`pinia`的`store`文件类型以及将结构导出的变量变成响应式

```html
<script setup lang="ts">
  const { userName } = useStore('user')
</script>

<template>
  <view>{{ userName }}</view>
</template>
```

关于git提交，使用`git add .`后，可以使用`pnpm commit`命令，选择对应的提交类型并输入对应的提交内容后，再`git push`到远程分支。PS：如果直接使用`vscode`的提交，格式要满足`[提交类型]: [提交内容]`，例如`feat: 登录功能完成`。
