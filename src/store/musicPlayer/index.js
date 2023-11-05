import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";
import { defineStore } from "pinia";
import Lyric from "lyric-parser";
import { Howl, Howler } from "howler";

import { api } from "../../api/api";

export default defineStore("musicPlayer", {
  namespaced: true,
  state,
  getters,
  mutations,
  actions: {
    async playNew() {
      console.log("playNew");

      if (this.playIndex === null) {
        this.playIndex = 0;
      } else {
        if (this.playIndex < this.playList.length - 1) {
          this.playIndex++;
        } else {
          this.playIndex = 0;
        }
      }

      this.__playNew();
    },
    async __playNew(immediate) {
      if (this.musicPlayer) {
        this.musicPlayer.stop();
      }

      // 获取歌曲id
      const id = this.playList[this.playIndex].id;

      // 获取播放地址
      const url = await api.song.url(id);
      console.log("url", url);
      this.currentUrl = url;

      // 获取歌词
      this.lyric = await api.song.lyric(id);
      this.lyricController = new Lyric(this.lyric, this.lyricControllerHandle);

      this.musicPlayer = new Howl({
        src: [url],
        html5: true,
        onload: () => {
          // 音频文件已加载，获取歌曲时长
          this.duration = this.musicPlayer.duration();
        },
        onend: () => {
          // 清除获取播放进度的定时器
          if (this.scheduleInterval) {
            clearInterval(this.scheduleInterval);
          }
          // 播放下一首
          this.next();
        },
      });

      // 设置定时器获取播放进度
      this.scheduleInterval = setInterval(() => {
        this.progress = this.musicPlayer.seek();
      }, 1000); // 每秒更新一次

      if (immediate) {
        this.begin();
      }
    },
    async next() {
      if (this.playIndex < this.playList.length - 1) {
        this.playIndex++;
      } else {
        this.playIndex = 0;
        return;
      }

      this.__playNew(true);
    },
    begin() {
      this.musicPlayer.play();
      this.lyricController.play();
    },

    continue() {
      this.musicPlayer.play();
      this.lyricController.togglePlay();
      this.playState = true;
    },

    pause() {
      this.musicPlayer.pause();
      this.lyricController.togglePlay();
      this.playState = false;
    },
    stop() {
      this.musicPlayer.stop();
      this.playState = false;
    },
    lyricControllerHandle({ lineNum, txt }) {
      console.log(lineNum, txt);
      this.currentLyricLineIndex = lineNum;
    },
    seek(time) {
      this.musicPlayer.seek(time);
      this.lyricController.seek(time * 1000);
    },
  },
});
