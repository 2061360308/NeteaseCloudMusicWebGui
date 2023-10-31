<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> 网易云音乐 </q-toolbar-title>

        <div>build with Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list bordered padding class="rounded-borders text-primary">
        <q-item-label header> If you want to ... </q-item-label>
        <q-item
          to="/"
          clickable
          v-ripple
          :active="link === '/'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>搜索</q-item-section>
        </q-item>

        <q-item
          to="/playlist"
          clickable
          v-ripple
          :active="link === '/playlist'"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>发现</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'trash'"
          @click="link = 'trash'"
          active-class="my-menu-link"
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
          :active="link === 'settings'"
          @click="link = 'settings'"
          active-class="my-menu-link"
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
          default-opened
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

    <q-footer
      elevated
      reveal
      style="
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
      "
    >
      <!-- <q-toolbar>
        <q-toolbar-title>Footer</q-toolbar-title>

      </q-toolbar> -->
      <div class="play-control mobile-hide flex">
        <div class="left flex-sub">
          <div class="flex justify-start">
            <q-avatar size="70px" style="margin-right: 10px">
              <img
                src="https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
              />
            </q-avatar>
            <div style="margin: auto 0">
              <div class="title-box flex justify-start">
                <div class="title text-h6 text-weight-bold">
                  我的歌名很长很长很长很长很长很长
                </div>
              </div>
              <div class="flex justify-start">
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
        <div class="center flex-sub">
          <q-icon name="skip_previous" size="40px" color="text-primary" />
          <q-icon
            :name="isplay ? 'pause_circle_outline' : 'play_circle_outline'"
            size="60px"
            color="text-primary"
          />
          <q-icon name="skip_next" size="40px" color="text-primary" />
          <!-- <q-btn flat round glossy push icon="skip_previous" size="20px" />
          <q-btn
            flat
            round
            glossy
            push
            icon="play_circle_outline"
            size="25px"
          />
          <q-btn flat round glossy icon="skip_next" size="20px" /> -->
        </div>
        <div class="right flex-sub">
          <div class="flex justify-start">
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
            <div class="sound flex justify-start">
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

      <div class="play-control desktop-hide flex align-center">
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
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
q-footer,
.play-control.mobile-hide {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */

  .left,
  .center,
  .right {
    padding: 5px;
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

  .center {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }

  .right {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: flex-end;
    // margin-left: auto;
  }
}

.play-control.mobile-hide {
  max-width: 800px;
  width: 90%;
  height: 80px;
  // background-color: aquamarine;
}

.play-control.desktop-hide {
  height: 45px;
  .left {
    .title {
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

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
  },

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
