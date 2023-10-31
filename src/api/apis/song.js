// song接口

import request from "../base/http";

async function getDetail(id) {
  const res = await request.get(
    `/playlist/track/all?id=${id}&limit=600&offset=0`
  );
  return res.data.songs;
}

async function getUrl(id) {
  const res = await request.get(
    `/song/url/v1?id=${id}&level=exhigh&realIP=116.25.146.177`
  );

  if (res.data.code === -460) {
    return [false, res.data.message];
  }

  return [true, res.data.data[0].url];
}

export const song = { getDetail, getUrl };
