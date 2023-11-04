import request from "../base/http";

// 检查登录状态
async function getLoginStatus(cookie) {
  const res = await request.post(`/login/status`);

  return res.data;
}

// ****************二维码登录********************/

// 获取登录二维码
async function getLoginQrCode() {
  const res = await request.get(`/login/qr/key?timestamp=${Date.now()}`);
  const key = res.data.data.unikey;

  const res2 = await request.get(
    `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`
  );

  console.log("res", res, res2);
  return [res2.data.data.qrimg, key];
}

// 二维码检测扫码状态接口
async function checkStatus(key) {
  const res = await request.get(
    `/login/qr/check?key=${key}&timestamp=${Date.now()}`
  );

  return res.data;
}

// ***************************************************/

//********************手机验证码登录*******************/

// 发送手机验证码
async function sendPhoneVerificationCode(phone) {
  const res = await request.get(`/captcha/sent?phone=${phone}`);

  console.log("传入手机号", phone);
  return res.data;
}

// 验证手机验证码
async function verifyPhoneVerificationCode(phone, captcha) {
  const res = await request.get(
    `/captcha/verify?phone=${phone}&captcha=${captcha}`
  );

  return res.data;
}

// 手机号 + 验证码 登录

async function loginByPhoneCaptcha(phone, captcha) {
  const res = await request.get(
    `/login/cellphone?phone=${phone}&captcha=${captcha}`
  );

  return res.data;
}
// ***************************************************/

export const user = {
  checkStatus,
  getLoginStatus,
  getLoginQrCode,
  sendPhoneVerificationCode,
  verifyPhoneVerificationCode,
  loginByPhoneCaptcha,
};
