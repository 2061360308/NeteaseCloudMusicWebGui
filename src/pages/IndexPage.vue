<template>
  <q-page style="height: 100%">
    <div style="height: 100%">
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
        "
      >
        <div class="search-box" style="width: 800px">
          <q-input
            outlined
            v-model="search_text"
            label="根据关键字搜索歌曲、歌手、专辑、MV……"
          >
            <template v-slot:append>
              <q-icon
                v-if="search_text !== ''"
                name="clear"
                @click="search_text = ''"
              />
              <q-btn round color="primary" icon="search" />
              <!-- <q-btn color="primary" label="搜索" /> -->
            </template>
          </q-input>
        </div>
        <div class="hot-search" style="width: 800px; padding: 20px">
          <div class="title text-weight-bold">热门搜索 ></div>
          <div class="content">
            <ol style="column-count: 2">
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
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      search_text: "",
      hot_search: [
        { first: "他只是经过", second: 1, third: null, iconType: 1 },
        { first: "会不会", second: 1, third: null, iconType: 1 },
        { first: "永不失联的爱", second: 1, third: null, iconType: 1 },
        { first: "不曾遗忘的符号", second: 1, third: null, iconType: 1 },
        { first: "薛之谦", second: 1, third: null, iconType: 1 },
        { first: "日不落", second: 1, third: null, iconType: 1 },
        { first: "Dear John", second: 1, third: null, iconType: 1 },
        { first: "为你我受冷风吹", second: 1, third: null, iconType: 1 },
        { first: "魏大勋新歌", second: 1, third: null, iconType: 1 },
        { first: "起风了", second: 1, third: null, iconType: 1 },
      ],
    };
  },
});
</script>
