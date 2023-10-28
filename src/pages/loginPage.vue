<template>
  <q-page style="height: 100%">
    <div class="fixed-center">
      <!-- <button @click="scanQRCode">扫码登录</button> -->
      <div>
        <img src="src/assets/qrcode.png" />
        <!-- <img :src="qrCodeUrl" alt="二维码" /> -->
        <p>请使用手机扫描二维码登录</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      showQRCode: ref(true),
      qrCodeUrl: "",
    };
  },
  methods: {},
});
</script>
