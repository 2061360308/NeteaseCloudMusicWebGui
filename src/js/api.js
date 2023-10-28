import axios from "axios";

const API = "http://43.134.189.57:3000";

let USERDATA = false;

async function checkStatus(key) {
  const res = await axios({
    url: API + `/login/qr/check?key=${key}&timestamp=${Date.now()}`,
  });
  return res.data;
}

async function getLoginStatus(cookie = "") {
  const res = await axios({
    url: API + `/login/status?timestamp=${Date.now()}`,
    method: "post",
    data: {
      cookie,
    },
  });

  return res.data;

  console.log(JSON.stringify(res.data, null, 2));
  //   document.querySelector('#info').innerText = JSON.stringify(res.data, null, 2)
}

async function getQrCode() {
  let timestamp = Date.now();
  const res = await axios({
    url: API + `/login/qr/key?timestamp=${Date.now()}`,
  });
  const key = res.data.data.unikey;
  const res2 = await axios({
    url: API + `/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
  });
  return res2.data.data.qrimg, key;
}

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

async function ckecklogin() {
  const cookie = localStorage.getItem("cookie");

  let userData = await getLoginStatus(cookie);
  if (userData.data.account !== null) {
    alert("已登录");
    USERDATA = userData.data;

    console.log("state", userData.data);

    getPlaylist(userData.data.account.id);

    showPlaylist();
    return;
  }
}

async function getSongDetail(id) {
  const res = await axios({
    url: API + `/playlist/track/all?id=${id}&limit=600&offset=0`,
  });
  return res.data.songs;
}

async function showPlaylist() {
  let playlist = await getPlaylist(USERDATA.account.id);

  // let html = ''
  // playlist.forEach(item => {
  //     html += `<li>${item.name}</li>`
  // });
  // document.querySelector('#playlist').innerHTML = html

  let playlist_ = [];

  await playlist.forEach((item, index) => {
    id = item.id;

    let children = [];

    getSongDetail(id).then((songs) => {
      songs.forEach((song) => {
        children.push({ name: song.name, id: song.id });
      });
      playlist_.push({ name: item.name, songs: children });
    });

    //     .then(songs => {
    //         playlist_[index].children.push({label: songs.name, id: songs.id})
    //         // playlist[index].num = function get(){return songs.length}
    //     })

    // playlist_.push({name: item.name, children: []})
  });

  console.log("playlist_", playlist_);

  app.playlist = playlist;

  // playlist.forEach((item, index) => {

  //     console.log(Array(item), Array(item)['songs'])
  //     item.songs.forEach(song => {
  //         playlist_[index].children.push({label: song.name, id: song.id})
  //     })
  // });

  app.playlist_ = playlist_;

  console.log(app.playlist_);
}

async function getPlaylist(uid) {
  const res = await axios({
    url: API + `/user/playlist?uid=${uid}`,
  });
  return res.data.playlist;
  console.log(JSON.stringify(res.data, null, 2));
  //   document.querySelector('#info').innerText = JSON.stringify(res.data, null, 2)
}

async function getHotSearch(id) {
  const res = await axios({
    url: API + `/search/hot`,
  });

  return res.data.result.hots;
}

async function searchSuggest(keywords) {
  const res = await axios({
    url: API + `/search/suggest?keywords=${keywords}`,
  });

  return res.data.result;
}

async function search(keywords, typeId) {
  const res = await axios({
    url: API + `/search?keywords=${keywords}type=${typeId}`,
  });

  console.log(res.data.result);

  return res.data.result;
}

async function getSongUrl(id) {
  const res = await axios({
    url: API + `/song/url/v1?id=${id}&level=exhigh`,
  });

  console.log(API + `/song/url/v1?id=${id}&level=exhigh`);

  console.log(res);

  if (res.data.code === -460) {
    return [false, res.data.message];
  }

  return [true, res.data.data[0].url];
}

export const api = {
  getPlaylist,
  getSongDetail,
  showPlaylist,
  ckecklogin,
  getQrCode,
  waiteScanCode,
  getLoginStatus,
  getHotSearch,
  searchSuggest,
  search,
  getSongUrl,
};
