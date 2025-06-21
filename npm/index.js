// src/router.ts
var router = {
  get now() {
    return location.pathname;
  },
  goto(route) {
    history.pushState({}, "", route);
  },
  match(route) {
    const names = [];
    const regex = new RegExp("^" + route.replace(/:([^/]+)/g, (_, k) => (names.push(k), "([^/]+)")) + "$");
    const result = location.pathname.match(regex);
    const entries = result && names.map((k, i) => [k, result[i + 1]]);
    const params = entries ? Object.fromEntries(entries) : {};
    return { routed: !!result, params };
  }
};

// src/index.ts
(function(history2) {
  const originalPushState = history2.pushState;
  history2.pushState = function(...args) {
    const result = originalPushState.apply(this, args);
    window.dispatchEvent(new Event("pushstate"));
    return result;
  };
})(window.history);
var metatags = Array.from(document.querySelectorAll("meta")).map((node) => node.outerHTML);
document["metatags"] = [...new Set(metatags)].reduce((last, next) => last + next, "");
document["old"] = document.title;
function initial(e) {
  document.querySelectorAll("slot[src]").forEach((x) => eachSlot(x));
}
window.addEventListener("DOMContentLoaded", initial);
window.addEventListener("pushstate", initial);
window.addEventListener("popstate", initial);
function eachSlot(slot) {
  const src = slot.getAttribute("src");
  const done = slot.getAttribute("done");
  const route = slot.getAttribute("route") || "";
  const regexMT = /<title>.+?<\/title>|<meta .+?\/>|<meta .+?>/g;
  const { routed } = router.match(route);
  if (!src)
    return;
  if (done)
    switchRoute();
  else
    fetch(src).then((x) => x.text()).then(setLoadHTML);
  function setLoadHTML(html) {
    const div = document.createElement("div");
    const shadow = div.attachShadow({ mode: "open" });
    const metatags2 = Array.from(html.matchAll(regexMT)).filter((value) => !!value && !!value[0]).reduce((last, next) => last + next[0], "");
    slot.innerHTML = "";
    slot.hidden = !routed;
    slot.setAttribute("done", "true");
    slot.setAttribute("metatags", metatags2);
    slot["metatags"] = metatags2;
    slot.append(div);
    shadow.innerHTML = html;
  }
  function switchRoute() {
    slot.hidden = !routed;
    if (slot.hidden)
      return;
    var oldHead = document.head.innerHTML;
    var newHead = oldHead.replace(regexMT, "");
    if (slot["metatags"] && !slot.hidden)
      newHead += slot["metatags"];
    if (!document.head.innerHTML.includes("<title>"))
      newHead += `<title>${document["old"]}</title>`;
    const metaregex = /<meta name=['"](.+?)['"].+?\/*>/g;
    const oldMetatags = document["metatags"];
    for (const found of oldMetatags.matchAll(metaregex)) {
      const [full, name] = found;
      const pattern = `<meta name=['"]${name}['"].+?\\/*>`;
      const checked = new RegExp(pattern, "g");
      const already = document.head.innerHTML.match(checked);
      if (already)
        continue;
      newHead += full;
    }
    console.log({ newHead, newMetas: slot["metatags"] });
    document.head.innerHTML = newHead;
  }
}
