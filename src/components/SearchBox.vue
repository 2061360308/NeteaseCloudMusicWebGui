<template>
  <div class="desktop-mode" v-if="$q.platform.is.desktop">
    <!-- <div class="search-box">
      <q-input
        borderless
        outlined
        square
        :input-class="['text-h6']"
        v-model="search_text"
        :placeholder="default_search_word"
        @update="search_text_change"
        @keyup.enter="search_commit"
      >
        <template v-slot:prepend>
          <q-icon size="40px" name="search" />
        </template>
        <template v-slot:append>
          <q-icon
            v-if="search_text !== ''"
            name="clear"
            @click="search_text = ''"
          />
        </template>
      </q-input>
    </div> -->
    <div class="search-box" style="display: flex">
      <q-icon
        class="col-1"
        style="flex-grow: 0; flex-basis: 35px"
        size="35px"
        name="search"
      />
      <input
        v-model="search_text"
        class="col-auto"
        style="flex-grow: 2; flex-basis: auto"
        type="text"
        :placeholder="default_search_word"
        @update="search_text_change"
        @keyup.enter="search_commit"
        @focus="search_focus"
      />
      <q-icon
        class="col-1"
        size="30px"
        v-if="search_text !== ''"
        style="flex-grow: 0"
        name="clear"
        @click="search_text = ''"
      />
    </div>
  </div>

  <div class="mobile-mode" v-else>
    <div class="search-box" style="display: flex">
      <q-icon
        class="col-1"
        style="flex-grow: 0; flex-basis: 35px"
        size="35px"
        name="search"
      />
      <input
        v-model="search_text"
        class="col-auto"
        style="flex-grow: 2; flex-basis: auto"
        type="text"
        :placeholder="default_search_word"
        @update="search_text_change"
        @keyup.enter="search_commit"
        @focus="search_focus"
      />
      <q-icon
        class="col-1"
        size="30px"
        v-if="search_text !== ''"
        style="flex-grow: 0"
        name="clear"
        @click="search_text = ''"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBox",
  data() {
    return {
      search_text: "", // 搜索框内容 搜索词
      hot_search: [], // 热门搜索词
      default_search_word: "", // 默认搜索词
      // Your data here
    };
  },
  async created() {
    let res = await this.$api.other.getDefaultSearch();
    this.default_search_word = res.data.showKeyword;
  },
  methods: {
    // Your methods here
    // 搜索
    async search_commit() {
      console.log("this.search_result", this.search_result);
      if (this.search_text === "") {
        this.search_text = this.default_search_word;
      }
      let result = await this.$api.other.search(
        this.search_text,
        this.typeId[this.tabName]
      );
      this.show_search_result = true;
      this.search_result[this.tabName] = result.songs;

      console.log("this.search_result", this.search_result);
    },
    search_focus() {
      // 点击进入搜索页
      if (this.$router.currentRoute.value.path !== "/search_detail") {
        this.$router.push("search_detail");
      }
    },
  },
  computed: {
    // Your computed properties here
  },
  mounted() {
    // Your mounted hook code here
  },
});
</script>

<style lang="scss" scoped>
.desktop-mode {
  .search-box {
    // background-color: aqua;
    width: 350px;
    height: 40px;

    padding-left: 10px;
    padding-right: 10px;

    border: 1px solid $c-mst;
    border-radius: 10px;

    input {
      border: none;
      outline: none;
    }

    input :focus {
      border: none;
      outline: none;
    }
  }
}

.mobile-mode {
  margin: 0;
  padding: 2;

  width: 100%;
  margin-left: 15px;

  .search-box {
    // background-color: aqua;

    padding-left: 10px;
    padding-right: 10px;

    border: 1px solid $c-mst;
    border-radius: 60px;

    input {
      border: none;
      outline: none;
    }

    input :focus {
      border: none;
      outline: none;
    }
  }
}
/* Your CSS code here */
</style>
