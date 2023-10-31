// 零散接口

import request from "../base/http";

// ******************搜索*************************/
async function getHotSearch(id) {
  const res = await request.get(`/search/hot`, { withCredentials: true });

  return res.data.result.hots;
}

async function search(keywords, typeId) {
  const res = await request.get(`/search?keywords=${keywords}type=${typeId}`);

  return res.data.result;
}
// ***************************************************/

export const other = { getHotSearch, search };
