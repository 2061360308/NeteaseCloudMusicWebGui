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
      this.stop();

      // 获取歌曲id
      const id = this.playList[this.playIndex].id;
      // 获取歌曲名称

      this.name = this.playList[this.playIndex].name;

      // 获取播放地址
      const url = await api.song.url(id);
      this.currentUrl = url;

      // 获取歌词
      this.lyric = await api.song.lyric(id);
      this.lyricController = new Lyric(this.lyric, this.lyricControllerHandle);

      this.musicPlayer = new Howl({
        src: [url],
        html5: true,
        volume: this.volume / 100, // 音量
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

    // 创建新歌后 开始播放
    begin() {
      this.musicPlayer.play();
      this.lyricController.play();
      this.playState = true;
    },
    // 继续播放 从暂停状态切换到播放状态
    continue() {
      this.musicPlayer.play();
      this.lyricController.togglePlay();
      this.playState = true;
    },
    // 暂停播放
    pause() {
      this.musicPlayer.pause();
      this.lyricController.togglePlay();
      this.playState = false;
    },
    // 停止播放
    stop() {
      this.musicPlayer.stop();
      this.lyricController.stop();
      this.playState = false;
    },
    // 歌词控制器回调函数
    lyricControllerHandle({ lineNum, txt }) {
      this.currentLyricLineIndex = lineNum;
    },
    // 跳转到指定时间
    seek(time) {
      this.musicPlayer.seek(time);
      this.lyricController.seek(time * 1000);
    },
    // 设置音量
    setVolume(volume) {
      this.musicPlayer.volume(volume / 100);
    },
    // 切换歌曲
    switchSongTo(index) {
      this.playIndex = index;

      console.log("切换前的播放状态", this.playState);
      this.__playNew(this.playState);
    },
    // 上一曲
    prev() {
      if (this.playIndex > 0) {
        this.playIndex--;
      } else {
        this.playIndex = this.playList.length - 1;
        return;
      }

      this.switchSongTo(this.playIndex);
    },
    // 下一曲
    next() {
      if (this.playIndex < this.playList.length - 1) {
        this.playIndex++;
      } else {
        this.playIndex = 0;
        return;
      }

      this.switchSongTo(this.playIndex);
    },
  },
});
