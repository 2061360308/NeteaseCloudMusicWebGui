<template>
  <q-layout view="lHh lpR fFf">
    <q-page-container
      :style="$q.platform.is.desktop ? 'min-width: 800px;' : ''"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.q-footer,
.q-header,
.q-page-container {
  margin: auto;
}
</style>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PlayLayout",

  data() {
    return {
      volume: 50,
      progressNum: 0,
    };
  },
  computed: {

  },

  components: {},
  created() {},

  setup() {
    return {};
  },
  methods: {
    
  },
});
</script>
