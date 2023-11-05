<template>
  <q-page :style="backgroundStyle">
    <div class="top-menu">
      <q-btn flat dense icon="keyboard_arrow_down"></q-btn>
      <q-btn flat dense icon="open_in_full"></q-btn>
      <div></div>
      <q-btn flat dense label="默认模式"></q-btn>
    </div>
    <div
      class="center-box absolute-center"
      :class="{ desktop: $q.platform.is.desktop, normal: true }"
    >
      <div class="record">
        <img
          src="/image/dfu.png"
          alt=""
          class="contact"
          :style="contactStyle"
        />
        <div ref="picElm" class="turntable" :style="turntableStyle"></div>
      </div>
      <div class="lrc" ref="lyriclineBox">
        <div ref="spacer" class="spacer"></div>
        <div
          ref="lyricline"
          v-for="(item, index) in currentLyricList"
          :key="index"
          :class="index === currentLyricLineIndex ? 'current' : ''"
        >
          {{ item.txt }}
        </div>
        <div class="spacer"></div>
      </div>
    </div>

    <div
      class="control-footer row justify-center items-center"
      style="background-color: transparent"
    >
      <div class="progress-bar">
        <div>{{ progress }}</div>
        <div class="slider">
          <q-slider
            v-model="sliderValue"
            :step="0.01"
            :min="0"
            :max="durationNum"
            @change="changeSliderValue"
            color="green"
          />
        </div>
        <div>{{ duration }}</div>
      </div>

      <div
        class="desktop-mode-footer"
        v-if="$q.platform.is.desktop"
        :style="
          $q.platform.is.desktop ? 'max-width: 1300px;min-width: 800px;' : ''
        "
      >
        <div class="play-control row">
          <div class="left .col justify-start">
            <div class="row justify-start items-center">
              <q-avatar size="70px" style="margin-right: 10px">
                <img
                  src="https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
                />
              </q-avatar>
              <div
                style="margin: auto 0"
                class="column justify-center items-center"
              >
                <div class="title-box">
                  <div class="title text-h6 text-weight-bold">
                    我的歌名很长很长很长很长很长很长
                  </div>
                </div>
                <div class="row items-center">
                  <q-icon
                    style="margin-right: 10px"
                    name="favorite_border"
                    size="25px"
                    color="text-primary"
                  />
                  <q-icon
                    style="margin-right: 10px"
                    name="textsms"
                    size="25px"
                    color="text-primary"
                  />
                  <q-icon
                    style="margin-right: 10px"
                    name="file_download"
                    size="25px"
                    color="primary-text"
                  />
                  <q-icon
                    style="margin-right: 10px"
                    name="more_horiz"
                    size="25px"
                    color="primary-text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="center .col row justify-center items-center">
            <q-icon name="skip_previous" size="40px" />
            <q-icon
              :name="isplay ? 'pause_circle_outline' : 'play_circle_outline'"
              size="60px"
              @click="playClick"
            />
            <q-icon name="skip_next" size="40px" />
          </div>
          <div class="right .col justify-end">
            <div class="row items-center justify-end">
              <q-icon
                style="margin-right: 10px"
                name="settings_input_svideo"
                size="25px"
              />
              <q-icon
                style="margin-right: 10px"
                name="graphic_eq"
                size="25px"
              />
              <q-icon
                style="margin-right: 10px"
                name="queue_music"
                size="25px"
              />
              <div class="sound row justify-start items-center">
                <q-icon
                  style="margin-right: 5px"
                  :name="volume === 0 ? 'volume_off' : 'volume_up'"
                  size="25px"
                />
                <div class="silder" style="width: 60px">
                  <q-slider
                    v-model="volume"
                    :min="0"
                    :max="100"
                    label
                    color="teal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mobile-mode-footer" v-else>
        <div class="play-control flex align-center">
          <div class="left flex-treble">
            <div class="flex flex-wrap">
              <q-avatar style="width: 40px; height: 40px" class="basis-xs">
                <img
                  src="https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
                />
              </q-avatar>
              <div class="title text-h7 basis-xl flex align-center">
                我的歌名很长很长很长很长很长很长
              </div>
            </div>
          </div>
          <div class="right flex-sub">
            <q-icon
              name="file_download"
              size="20px"
              color="text-primary"
              style="margin: 5px"
            />
            <q-icon
              name="play_circle_outline"
              size="20px"
              color="text-primary"
              style="margin: 5px"
            />
            <q-icon name="queue_music" size="20px" color="text-primary" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
// 头部
.top-menu {
  display: grid;
  grid-template-columns: 50px 50px 1fr 100px;
  grid-gap: 5px;
  margin: 0 20px;
  padding: 30px 0;

  .q-btn {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.2);
  }
}

// 中间播放器 模式
.center-box.desktop.normal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}

.center-box.desktop.lyric {
  display: grid;
  grid-template-columns: 0 1fr;
  grid-gap: 5px;
}

.center-box {
  width: 60%;
  height: 70%;
  min-width: 800px;
  max-width: 1300px;
  .lrc {
    /* 或者你需要的高度 */
    position: relative;
    height: 100%;
    overflow-y: auto;
    text-align: center;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    // box-shadow: inset 0 50px 50px -50px rgba(255, 255, 255, 0.5),
    //   inset 0 -50px 50px -50px rgba(255, 255, 255, 0.5);
    .spacer {
      height: 50%;
    }

    div {
      font-size: 20px;
      opacity: 0.5;
    }

    .current {
      font-size: 27px;
      font-weight: bolder;
      opacity: 1;
    }
  }

  .lrc::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  // 唱片

  .record {
    position: relative;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .contact {
      position: absolute;
      left: 40%;
      top: -20px;
      width: 25%;
      height: 50%;
      transform-origin: left top;
      z-index: 2;
    }
    .turntable {
      margin: auto;
      width: 90%; /* 设置宽度为父元素的宽度 */
      padding-top: 100%; /* 设置 padding-top 与宽度相同 */
      background-position: center;
      background-repeat: no-repeat;
      background-size: 89%, 56%, 100%;
      z-index: 1;
    }
  }
}

.control-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  .desktop-mode-footer {
    width: 100%;
    min-width: 800px;

    padding: auto;
    .play-control {
      display: flex;

      .left,
      .center,
      .right {
        padding: 5px;
        width: 33%;
      }

      .left {
        .title-box {
          width: 150px;
          overflow: hidden;
          white-space: nowrap;
        }
        .title {
          display: inline-block;
          white-space: nowrap;
          animation: move-right 8s linear infinite normal;
        }

        @keyframes move-right {
          0% {
            transform: translate(100%, 0);
          }
          100% {
            transform: translate(calc(-200% + 180px), 0);
          }
        }
      }

      // .right {
      display: flex;
      align-items: center; /* 垂直居中 */
    }

    .play-control {
      width: 100%;
      height: 80px;
      // background-color: aquamarine;
    }
  }

  .mobile-mode-footer {
    .play-control {
      height: 45px;
      .left {
        .title {
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .progress-bar {
    width: 100%;
    font-size: 15px;
    // background-color: antiquewhite;
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    grid-gap: 5px;
    padding: 0 10px;

    .slider {
      height: 15px;
    }
  }
}
</style>

<script>
import { defineComponent } from "vue";
// import { exportFile } from "quasar";

import ColorThief from "colorthief";
// import { text } from "body-parser";

export default defineComponent({
  name: "IndexPage",
  async created() {
    if (this.$globalData.isLogin === null) {
      await this.checkLoginStatus();
    }

    this.initPlayList();
  },
  data() {
    return {
      currentPic: "",
      gradientColor: "$c-ms", // 根据封面动态计算出的渐变色
      contactRotate: -60,
      volume: 50,
    };
  },
  computed: {
    isplay() {
      return this.$musicPlayer.musicPlayer.playing();
    },
    progress() {
      return this.formatSeconds(this.$musicPlayer.progress);
    },
    progressNum() {
      return this.$musicPlayer.progress;
    },
    // 监听播放进度并计算进度条的值
    sliderValue: {
      get() {
        return this.$musicPlayer.progress;
      },
      set(value) {
        this.$musicPlayer.seek(value);
      },
    },
    duration() {
      return this.formatSeconds(this.$musicPlayer.duration);
    },
    durationNum() {
      return this.$musicPlayer.duration;
    },
    currentLyricLineIndex() {
      return this.$musicPlayer.currentLyricLineIndex;
    },
    playIndex() {
      return this.$musicPlayer.playIndex;
    },
    playList() {
      return this.$musicPlayer.playList;
    },
    currentLyricList() {
      if (this.$musicPlayer.lyricController !== null) {
        return this.$musicPlayer.lyricController.lines;
      } else {
        return [];
      }
    },
    // 背景动态样式
    backgroundStyle() {
      return `background:${this.gradientColor}`;
    },
    // 唱片触头动态样式
    contactStyle() {
      let contactRotate = 0;
      if (this.isplay) {
        contactRotate = -30;
      } else {
        contactRotate = -60;
      }

      let style = `
      transform: rotate(${contactRotate}deg)
      `;

      return style;
    },
    // 唱片动态样式
    turntableStyle() {
      let animation = "";
      if (this.isplay) {
        animation = "animation: spin 20s linear infinite;";
      } else {
        animation = "";
      }
      return `
        background-image:  url('/image/h1w.png'),url('${this.currentPic}'),url('/image/h1v.png');${animation}
      `;
    },
  },
  watch: {
    // 监听播放的歌曲切换
    playIndex: {
      handler: "updateNewSongStyle",
      immediate: false,
    },
    // 监听当前歌词行数变化
    currentLyricLineIndex: {
      handler: "scrollLyric",
      immediate: false,
    },
  },
  methods: {
    async checkLoginStatus() {
      // 根据cookie检测是否登录
      // 判断是否登录
      const cookie = localStorage.getItem("cookie"); // 获取cookie

      // console.log("cookie", cookie);

      document.cookie = cookie; // 设置cookie

      if (cookie === null) {
        this.$globalData.isLogin = false;
        return;
      }

      // let userData = await api.getLoginStatus(cookie); // 获取登录状态
      let loginState = await this.$api.user.getLoginStatus(cookie);

      // 未登录
      /**
       * Object { code: 800, message: "二维码不存在或已过期", cookie: "..." }
       */

      if (loginState.code === 800) {
        alert(
          "您未登录，或许会频繁收到<服务器繁忙>的错误\n提示，这是因为未登录的原因，登录后即可解决。"
        );
        return;
      }

      if (loginState.data.code === 200) {
        this.$globalData.userData = loginState.data;
        this.$globalData.isLogin = true;
      }
    },
    formatSeconds(value) {
      console.log("formatSeconds", value);
      let secondTime = parseInt(value);
      let minuteTime = 0;
      let hourTime = 0;
      if (secondTime >= 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime >= 60) {
          hourTime = parseInt(minuteTime / 60);
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      // 补0
      hourTime = hourTime < 10 ? "0" + hourTime : hourTime;
      minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
      secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
      if (hourTime === "00") {
        let res = minuteTime + ":" + secondTime;
        return res;
      } else {
        let res = hourTime + ":" + minuteTime + ":" + secondTime;
        return res;
      }
    },
    async getBase64(imageUrl) {
      // 输入图片url，返回base64
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // oFileReader.onloadend = (e) => {
      //   const base64 = e.target.result;
      //   this.base64 = base64;
      // };
      // await oFileReader.readAsDataURL(blob);

      const base64 = await new Promise((resolve, reject) => {
        const oFileReader = new FileReader();
        oFileReader.onloadend = (e) => {
          resolve(e.target.result);
        };
        oFileReader.onerror = reject;
        oFileReader.readAsDataURL(blob);
      });
      return base64;
    },
    playClick() {
      console.log("playClick", this.$musicPlayer.playState);

      if (this.$musicPlayer.musicPlayer.state() === "unloaded") {
        this.$musicPlayer.begin();
      } else if (this.$musicPlayer.musicPlayer.playing()) {
        this.$musicPlayer.pause();
      } else {
        this.$musicPlayer.continue();
      }

      // if (this.currentLyricControl) {
      //   this.currentLyricControl.togglePlay();
      // }

      this.$musicPlayer.playState = !this.$musicPlayer.playState;
    },
    changeSliderValue(value) {
      console.log("changeSliderValue", value);
    },
    async initPlayList() {
      // 初始化播放列表

      let recommend = [];

      if (this.$globalData.isLogin) {
        recommend = await this.$api.song.recommend();
      } else {
        recommend = await this.$api.song.recommendNotLogin();
        this.$q.notify({
          message: "您未登录，播放列表为默认推荐歌曲",
          color: "warning",
          icon: "warning",
        });
      }

      this.$musicPlayer.playList.push(...recommend);
      this.$musicPlayer.playNew();
    },
    async updateNewSongStyle() {
      /*
      切换歌曲后，跟新歌曲的样式 (封面，渐变色)
      */

      const self = this;

      // 避免跨域问题 先获取网络图片的 base64
      let currentPic = this.playList[this.playIndex].al.picUrl;
      const picBase64 = await this.getBase64(currentPic);

      // 更改当前封面
      this.currentPic = picBase64;

      // 根据封面计算渐变色
      let colorthiefImg = new Image();
      colorthiefImg.src = picBase64;

      colorthiefImg.onload = function () {
        let colorThief = new ColorThief();
        let colors = colorThief.getPalette(colorthiefImg, 3);
        self.gradientColor = `linear-gradient(rgb(${colors[0].join(
          ","
        )}), rgb(${colors[1].join(",")}), rgb(${colors[2].join(",")}))`;
      };
    },
    scrollLyric() {
      // 更新歌词
      this.$refs.lyriclineBox.scrollTo({
        top:
          this.$refs.lyricline[this.currentLyricLineIndex].offsetTop -
          this.$refs.spacer.offsetHeight,
        left: 0,
        behavior: "smooth",
      });
    },
  },
});
</script>
