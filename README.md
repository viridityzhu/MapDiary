# MapDiary

## How to build & run in Docker

1. install node v14

```sh
nvm install 14
npm install -g npm@6
nvm use 14
```

2. Clone this repo

```sh
git clone https://github.com/viridityzhu/MapDiary.git
cd MapDiary
```

3. Install all packages and dependencies

```sh
npm install
```
> The terminal may flash with some warning messages regarding the middleware configuration. This is due to some minor issue in create-react-app v5.0.0 and hopefully fixed in v5.0.1, but it does not affect anything.

4. Initialize MongoDB (TBC)

5. Compile

```sh
npm run build
```

6. Start the project in the live browser

```sh
npm run start
```

## Introduction

Map Diary --- Diary your Map, Record your Life!

A light-weight web/mobile app to write diaries, record the best moments, and use a personal map to track where they happens!

## Branches Management

### Production Branch

* **Master branch**

### Development Branch

* **Dev-v1.0.0**

### Other Branches

* **Feature Branches**
* **Release Branches**
* **Hotfix Branches**



## Account & Password







<hr>

### List of Features

| Function                      | Description                                                  | Fullfil Priority |
| ----------------------------- | ------------------------------------------------------------ | ---------------- |
| Login/Logout                  | Basic function, login and logout                             | High             |
| Map and Marker                | A map on which users can pin markers and view corresponding documents. Specifically: 1. Existing markers can be rendered on the map. 2. When users click on "Create a diary" button, and then choose a place on the map by clicking, a temporary marker data will be appended into the database, with a "newMarker" attribute as true, and be rendered on the map. 3. Only the newest marker's "newMarker" attribute as true. 4. When the user clicks on a new place, the current "newMarker" mark will be deleted; when the user clicks "Save" button, the current "newMarker" mark will be added in the database. 5. The Map page can be closed. | High             |
| Edit and Publish Documents    | This will provide a compete editor similar as blog apps, which allows users to organize texts with different formats, and also insert multimedias, such as pictures and videos. | High             |
| View Public Map               | 1. Allow users to set their personal map or documents as "Public". 2. Provide a "Public Map" page, on which users can view others' maps. 3. On the "Public Map" page, the pins are set as different colors, to dinstinguish different users' pins. 4. On the "Public Map", only proper number of pins are visible, which will provide good visual effects. | High             |
| View Others' Personal Map     | Users can also view others' personal map if they provide the specific user ID. | Medium           |
| Search Documents or Locations | Provide search function that allows users to 1. search their own or others' documents with keywords; 2. search places and show documents pinned at there. | Relatively Low   |
| Mobile App                    | Develop a mobile version of this product.                    | Low              |
| Customized Document Template  | Allow users to create or even share their own customized document templates. | Low              |
| Color Themes                  | Provide several color themes of the website.                 | Low              |

### Project Schedule

| Task | Complete Time | Assigned |
| -------- | ------------- | -------- |
| Prototype UI Design | Already | Zhang Lin and Zhu Jiayin |
| Front-end Architechture | 15th Mar | Zhang Lin and Zhu Jiayin |
| Back-end Architecture Design | 20th Mar | Zhang Lin and Zhu Jiayin |
| Function: Login/Logout        | 25th Mar                 | Zhang Lin     |
| Function: Map and Marker      | 25th Mar | Zhu Jiayin |
| Function: Edit and Publish Documents | 1st Apr | Zhu Jiayin |
| Function: View Public Map     | 1st Apr | Zhang Lin |
| Function: View Others' Personal Map | 6th Apr | Zhu Jiayin |
| Function: Search Documents or Locations | 6th Apr | Zhang Lin |
| Adjust Final Styles of the Website | 12th Apr | Zhang Lin and Zhu Jiayin |
| Mobile App                    | 18th Apr         | Zhang Lin and Zhu Jiayin |
| Function: Customized Document Template | 23rd Apr | Zhang Lin     |
| Function: Color Themes        | 23rd Apr         | Zhu Jiayin    |

## 时间规划

- [ ] 三月初完成前端                     
- [ ] 后端、数据库
- [ ] 移动端适配

## UI设计

### 页面1：主页面

1. 中间为地图，上面有图钉📌。点击地图放置图钉，确认进入**页面2: 编辑页面**
2. 左边栏显示图钉内容概览，类似博客主页那种，包括：标题、时间、摘要、封面图等。可以点击展开，让它占据页面主要部分；也可以点击全屏，跳转到**页面3:全文显示页面**
    1. 摘要：用户可以自定义摘要，如果不自定义的话，则截取正文前100字
    2. 封面图：用户可以自定义，否则默认为正文第一张图，或者没有
3. 右边有一个【可爱】的滚动显示的东西（叫啥来着）--- 轮播图，鼠标放在上面可以滑动滚轮或者单击来切换前一个/后一个图钉📌。滑动时显示时间线
4. 右上角是功能区，可以登陆、设置等等，分别跳转到**页面4: 登录页面**、**页面5: 设置页面**
5. 【美好愿想】搜索框在左上角

### 页面2: 编辑页面

一个完整的文档编辑器。Markdown编辑和类知乎的普通编辑器最好都要支持👍

编辑完毕，点击发布，回到**页面1：主页面**

### 页面3: 全文显示页面

利用组件化似乎还挺好实现的。

点击返回，回到**页面1：主页面**

### 页面4: 登录页面

登录成功，进入**页面1：主页面**

### 页面5: 设置页面

设置用户昵称、头像，页面主题等等。

点击确认，生效并返回**页面1：主页面**

## 业务逻辑（……我好像在UI里面写了）

每个用户拥有一张自己的地图（世界地图or新加坡地图？），他可以在地图上自由打图钉、写笔记。爱旅游的人可以满地图打图钉、记旅游日记，平常人也可以记录自己的日常，只是跟一般的博客平台相比，这是以一张私人地图为载体的。

绝对不是商业化的，要干净、用户导向。所以跟旅游笔记分享平台比（如大众点评、携程？），这个平台凸显的是用户私人地图，而不是公开景点的评价。但跟一般的博客平台比（如简书、小红书？），要突出 Map 这个功能点。

功能点：
1. 用户可以注册、登录、设置
2. 地图可以打图钉，查看对应的文档
   打图钉功能实现：
   1).地图渲染已存在的图钉
   2).点击 'create a diary',鼠标此时在地图上点击，在图钉数据尾部添加一条图钉数据,并标记为newMarker，并渲染
   3).每次添加图钉会自动删除标记为newMarker的图钉数据
   4).关闭页面

3. 编辑和发布文档：完整的博客功能，也就是说可以组织不同格式的文本，还可以插入图片、视频之类的多媒体
4. 查看聚合地图，不同地理坐标，其他人记录了些什么呢？（如果用户笔记权限设为公开的话）如果选择「查看他人的图钉」，则在地图上显示其他人的图钉，可以用另一种颜色标识
5. 移动端适配问题：霖哥说有点难度
6. 【暂时放在后面】搜索功能：搜索图钉or搜索地点。如果搜索地点的话，可能需要用到谷歌的付费API

## 技术选型

Node.js + npm + react，会用到react脚手架、[Leaflet库](https://github.com/Leaflet/Leaflet)等等。
Update:使用react-leaflet代替leaflet.
leaflet采用命令式编程，更适合原生JS
leaflet-react为函数式编程，能够将UI结构封装成组件，提供对DOM元素进行操作的接口

再找找看有没有直接实现文本编辑器的框架或者库之类的🤔
Update:Editor.md

Reference：

[Leaflet -- JavaScript library for mobile-friendly interactive maps](https://github.com/Leaflet/Leaflet)

[Leaflet.label -- plugin for adding labels to markers & shapes on leaflet powered maps.](https://github.com/Leaflet/Leaflet.label)

