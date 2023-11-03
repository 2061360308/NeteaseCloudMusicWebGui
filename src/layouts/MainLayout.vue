<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-c-ms-light text-c-mst">
      <q-toolbar class="row">
        <q-btn
          v-if="$q.platform.is.desktop"
          flat
          dense
          icon="arrow_back_ios"
          aria-label="arrow_back_ios"
          @click="toggleLeftDrawer"
        />

        <q-btn
          v-else
          flat
          dense
          icon="menu"
          aria-label="menu"
          @click="toggleLeftDrawer"
        />
        <SearchBox />

        <q-toolbar-title v-if="$q.platform.is.desktop">
          网易云音乐
        </q-toolbar-title>

        <div class="row items-center" v-if="$q.platform.is.desktop">
          <div class="row items-center">
            <!-- 头像 -->
            <AvatarBox />
            <q-icon size="25px" class="q-mx-sm" name="mail_outline"></q-icon>
            <q-icon size="25px" class="q-mx-sm" name="settings"></q-icon>
            <q-icon size="25px" class="q-mx-sm" name="color_lens"></q-icon>
          </div>
        </div>

        <div v-if="$q.platform.is.mobile" style="display: flex">
          <q-icon size="25px" class="q-mx-sm" name="mail_outline"></q-icon>
          <q-icon size="25px" class="q-mx-sm" name="settings"></q-icon>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-c-ms-dark text-c-mst q-px-md borderless"
    >
      <q-list padding class="rounded-borders">
        <q-item-label header>
          <img src="image/cx5.png" style="width: 80%" />
        </q-item-label>

        <q-item
          to="/"
          clickable
          :active="$router.currentRoute.value.path === '/'"
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>云音乐精选</q-item-section>
        </q-item>

        <q-item
          to="/playlist"
          clickable
          v-ripple
          :active="$router.currentRoute.value.path === '/playlist'"
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>发现</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="$router.currentRoute.value.path === 'trash'"
          @click="link = 'trash'"
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>

          <q-item-section>我的</q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item
          clickable
          v-ripple
          :active="$router.currentRoute.value.path === 'settings'"
          @click="link = 'settings'"
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>设置</q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="help"
          label="帮助"
          caption="获取帮助的渠道"
          :active="link === 'help'"
          @click="link = 'help'"
          active-class="my-menu-link"
        >
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="row justify-center items-center bg-c-ms-light text-c-mst">
      <!-- <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>

      </q-toolbar> -->
      <div class="desktop-mode" v-if="$q.platform.is.desktop">
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
                  <div class="title text-h6 text-weight-bold text-c-mst">
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
          <div class="center .col row justify-center">
            <q-icon name="skip_previous" size="40px" color="text-primary" />
            <q-icon
              :name="isplay ? 'pause_circle_outline' : 'play_circle_outline'"
              size="60px"
              color="text-primary"
            />
            <q-icon name="skip_next" size="40px" color="text-primary" />
          </div>
          <div class="right .col justify-end">
            <div class="row items-center justify-end">
              <q-icon
                style="margin-right: 10px"
                name="settings_input_svideo"
                size="25px"
                color="text-primary"
              />
              <q-icon
                style="margin-right: 10px"
                name="graphic_eq"
                size="25px"
                color="text-primary"
              />
              <q-icon
                style="margin-right: 10px"
                name="queue_music"
                size="25px"
                color="text-primary"
              />
              <div class="sound row justify-start items-center">
                <q-icon
                  style="margin-right: 5px"
                  :name="volume === 0 ? 'volume_off' : 'volume_up'"
                  size="25px"
                  color="text-primary"
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

      <div class="mobile-mode" v-else>
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
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.menu-active {
  background-color: $c-mp;
  color: $c-mpt;
}

footer {
  max-width: 1100px;
  min-width: 800px;
  margin: auto;
}

.desktop-mode {
  width: 100%;

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

.mobile-mode {
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
</style>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import AvatarBox from "components/AvatarBox.vue";
import SearchBox from "components/SearchBox.vue";

const linksList = [
  {
    title: "GItHub",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  data() {
    return {
      isplay: false,
      volume: 50,
    };
  },

  components: {
    EssentialLink,
    AvatarBox,
    SearchBox,
  },
  created() {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
