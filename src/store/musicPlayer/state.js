import { ref } from "vue";

export default function (api) {
  return {
    playList: ref([]), // 播放列表
    playIndex: ref(null), // 播放索引
    playState: ref(false), // 播放状态
    currentUrl: ref(null), // 当前播放的url
    musicPlayer: {
      playing: () => {
        return false;
      },
      stop: () => {},
    }, // 播放器
    lyric: null, // 当前歌词文本
    /**
     * 开始的时候会调用一次停止。所以初始化一个空值的stop方法
     */
    lyricController: ref({ stop: () => {} }), // 当前歌词控制器
    currentLyricLineIndex: ref(0), // 当前歌词行数
    duration: ref(0), // 歌曲总时长
    progress: ref(0), // 当前播放时间
    name: ref(""), // 当前歌曲名称
    volume: 50, // 音量
    scheduleInterval: null, // 获取播放进度的定时器
  };
}
