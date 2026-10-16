import wixData from 'wix-data';

$w.onReady(function () {
  wixData.query("Cases").limit(100).find()
    .then(function (res) {
      var items = res.items.map(function (it) {
        return {
          title: it.title || "",
          categoria: it.categoria || "",
          cliente: it.cliente || "",
          local: it.local || "",
          ano: it.ano || "",
          capa: imgUrl(it.capa),
          video: (typeof it.video === "string" ? it.video : "")
        };
      });
      var el = $w("#html1");
      el.onMessage(function (e) {
        if (e.data === "ready") el.postMessage({ type: "cases", items: items });
      });
      el.postMessage({ type: "cases", items: items });
    });
});

function imgUrl(v) {
  if (!v || typeof v !== "string") return "";
  if (v.indexOf("wix:image://") === 0) {
    var m = v.replace("wix:image://v1/", "").split("#")[0];
    return "https://static.wixstatic.com/media/" + m.split("/")[0];
  }
  return v;
}
