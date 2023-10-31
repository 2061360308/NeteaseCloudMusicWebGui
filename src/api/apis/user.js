import request from "../base/http";

async function checkStatus(key) {
  const res = await request.get(
    `/login/qr/check?key=${key}&timestamp=${Date.now()}`
  );

  return res.data;
}

async function getLoginStatus(cookie = "") {
  const res = await request.post("/login/status?timestamp=${Date.now()}", {
    timestamp: Date.now(),
    cookie: cookie,
  });

  return res.data;
}

async function getLoginQrCode() {
  const res = request.get(`/login/qr/key?timestamp=${Date.now()}`);
  const key = res.data.data.unikey;

  const res2 = request.get(
    `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`
  );
  return res2.data.data.qrimg, key;
}

// ****************未完成方法*************************/
async function waiteScanCode(key, expired, login_success) {
  let timer;

  timer = setInterval(async () => {
    const statusRes = await checkStatus(key);
    if (statusRes.code === 800) {
      expired(); // 执行过期回调
      clearInterval(timer);
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      login_success(); // 执行成功回调
      await getLoginStatus(statusRes.cookie);
      localStorage.setItem("cookie", statusRes.cookie);
    }
  }, 3000);
}
// ***************************************************/

export const user = { checkStatus, getLoginStatus, getLoginQrCode };
