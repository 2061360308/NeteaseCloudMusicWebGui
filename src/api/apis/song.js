// song接口

import request from "../base/http";

async function getDetail(id) {
  const res = await request.get(
    `/playlist/track/all?id=${id}&limit=600&offset=0`
  );
  return res.data.songs;
}

async function url(id) {
  const res = await request.get(
    `/song/url/v1?id=${id}&level=exhigh&realIP=116.25.146.177`
  );

  if (res.data.code === -460) {
    return [false, res.data.message];
  }

  return res.data.data[0].url;
}

async function recommend() {
  const res = await request.get(`/recommend/songs`);

  // console.log(res.data);
  return res.data.data.dailySongs;
}

async function recommendNotLogin() {
  const res1 = await request.get(`/personalized?limit=1`);

  let playlistId = res1.data.result[0].id;

  const res2 = await request.get(`/playlist/track/all?id=${playlistId}`);

  console.log(res2.data.songs);

  // console.log(res.data);
  return res2.data.songs;
}

async function lyric(id) {
  const res = await request.get(`/lyric?id=${id}`);

  if (res.data.uncollected) {
    return "[00:00.00]暂无歌词";
  }
  return res.data.lrc.lyric;
}

export const song = { getDetail, url, recommend, recommendNotLogin, lyric };
