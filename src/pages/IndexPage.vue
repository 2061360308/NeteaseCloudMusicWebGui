<template>
  <q-page style="height: 100%">
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
      "
    >
      <div class="search-box">
        <q-input
          outlined
          v-model="search_text"
          @update="search_text_change"
          label="根据关键字搜索歌曲、歌手、专辑、MV……"
        >
          <template v-slot:append>
            <q-icon
              v-if="search_text !== ''"
              name="clear"
              @click="search_text = ''"
            />
            <q-btn round color="primary" icon="search" @click="search" />
            <!-- <q-btn color="primary" label="搜索" /> -->
          </template>
        </q-input>
      </div>
      <div class="hot-search" style="padding: 20px" v-if="!show_search_result">
        <div class="title text-weight-bold">热门搜索 ></div>
        <div class="content">
          <ol>
            <li
              v-for="item in hot_search"
              :key="item"
              clickable
              class="q-ma-sm"
              @click="search_text = item.first"
            >
              {{ item.first }}
            </li>
          </ol>
        </div>
      </div>
      <div class="search_result" v-else>
        <q-tabs
          v-model="tabName"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <!-- 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音 -->
          <q-tab name="song" label="单曲" />
          <q-tab name="album" label="专辑" />
          <q-tab name="singer" label="歌手" />
          <q-tab name="songsheet" label="歌单" />
          <q-tab name="user" label="用户" />
          <q-tab name="mv" label="MV" />
          <q-tab name="lyric" label="歌词" />
          <q-tab name="radiostation" label="电台" />
          <q-tab name="movie" label="视频" />
          <q-tab name="comprehensive" label="综合" />
          <q-tab name="voice" label="声音" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabName" animated>
          <q-tab-panel name="song">
            <q-list separator>
              <q-item v-for="item in search_result.song" :key="item.id">
                <q-item-section>
                  <q-item-label>{{ item.name }}</q-item-label>
                  <q-item-label caption>
                    {{ item.artists[0].name }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn-group rounded class="tool-button">
                    <q-btn rounded glossy icon="play_arrow" size="xs" />
                    <q-btn
                      color="primary"
                      rounded
                      glossy
                      icon="download"
                      size="xs"
                      @click="downloadSong(item.id)"
                    />
                    <q-btn rounded glossy icon="favorite_border" size="xs" />
                  </q-btn-group>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="album">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="singer">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.search-box,
.search_result,
.hot-search {
  width: 90%;
  max-width: 800px;
}

li {
  cursor: pointer;

  :hover {
    color: #409eff;
  }
}

@media (min-width: 800px) {
  .hot-search ol {
    columns: 2;
    column-gap: 20px;
  }
}
</style>

<script>
import { defineComponent } from "vue";
import { api } from "src/js/api.js";
import { exportFile } from "quasar";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      search_text: "", // 搜索框内容 搜索词
      hot_search: [], // 热门搜索词
      show_search_result: false, // 是否显示搜索结果
      tabName: "song", // 搜索结果tab
      typeId: {
        song: 1,
        album: 10,
        singer: 100,
        songsheet: 1000,
        user: 1002,
        mv: 1004,
        lyric: 1006,
        radiostation: 1009,
        movie: 1014,
        comprehensive: 1018,
        voice: 2000,
      }, // 搜索结果类型
      search_result: {}, // 搜索结果
    };
  },
  async created() {
    // 判断是否登录
    const cookie = localStorage.getItem("cookie"); // 获取cookie

    let userData = await api.getLoginStatus(cookie); // 获取登录状态
    if (userData.data.account !== null) {
      // 已登录，保存用户信息
      let app = {};
      app.USERDATA = userData.data;
      this.$q.app = app;
    }

    // 获取热门搜索词
    let hot_search = await api.getHotSearch();
    this.hot_search = hot_search;
  },
  methods: {
    // 搜索

    async search() {
      console.log("this.search_result", this.search_result);
      if (this.search_text !== "") {
        let result = await api.search(
          this.search_text,
          this.typeId[this.tabName]
        );
        this.show_search_result = true;
        this.search_result[this.tabName] = result.songs;

        console.log("this.search_result", this.search_result);
      }
    },

    async downloadSong(id) {
      console.log("downloadSong", id);

      let success;
      let information;

      [success, information] = await api.getSongUrl(id);

      console.log("information", information, "success", success);

      if (success) {
        let response = await fetch(information);
        let blob = await response.blob();
        exportFile("my-file.mp3", blob, "audio/mpeg");
        console.log("downloadSong", information);
        // this.$q.notify({
        //   message: message,
        //   color: "negative",
        //   icon: "report_problem",
        // });
      } else {
        alert(information);
        return;
      }
    },
  },
});
</script>
