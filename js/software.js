// DOMが完全に読み込まれてから実行
window.addEventListener('DOMContentLoaded', () => {

  // URLからidを取得
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  console.log("id:", id); // デバッグ用

  // JSON読み込み
  fetch('../data/software.json')
    .then(res => res.json())
    .then(data => {

      // idに一致するソフトを探す
      const soft = data.software.find(s => s.id === id);
      console.log("soft:", soft); // デバッグ用

      // 見つからなかった場合は警告
      if (!soft) {
        document.body.innerHTML = "データが見つからん。社長がサボってる。";
        return;
      }

      // タイトル表示
      document.getElementById("title").textContent = soft.name;

      // バージョン一覧生成
      const versions = document.getElementById("versions");
      soft.versions.forEach(v => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
          <span>v${v.version} ${v.latest ? "(latest)" : ""}</span>
          <a href="../files/${v.file}">Download</a>
          <span>${v.date}</span>
        `;

        versions.appendChild(div);
      });

    })
    .catch(err => {
      console.error("JSON読み込みエラー:", err);
      document.body.innerHTML = "データが読み込めん。";
    });

});
