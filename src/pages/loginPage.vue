<template>
  <q-page style="height: 100%">
    <div class="absolute-center">
      <div class="cf">
        <img
          class="fl gt-xs"
          src="src/assets/qrcode.png"
          style="width: 125px; height: 220px; margin-right: 20px"
        />
        <!-- <img :src="qrCodeUrl" alt="二维码" /> -->
        <div class="fr">
          <div>
            <p class="text-weight-bold text-h5" style="text-align: center">
              扫码登录
            </p>
            <img src="src/assets/example.png" alt="二维码" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import { getQRCode } from "src/api/login";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      showQRCode: true,
      qrCodeUrl: "",
    };
  },
});
</script>
