// DOMのよみこみ
window.addEventListener('DOMContentLoaded', () => {
console.log("software.js読み込み完了");
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  console.log("id:", id);

  console.log("software.js読み込み完了json前");
  fetch('../data/software.json')
    .then(res => res.json())
    .then(data => {

      const soft = data.software.find(s => s.id === id);
      console.log("soft:", soft); 

      if (!soft) {
        document.body.innerHTML = "データが見つかりません。社長(または副社長)がさぼっています";
        return;
      }

      document.getElementById("title").textContent = soft.name;

      const latestButton = document.getElementById("download-latest");
      if (latestButton) {
        const latest = soft.versions.find(v => v.latest);
        if (latest) {
          latestButton.addEventListener('click', () => {
            window.location.href = `../files/${latest.file}`;
          });
        } else {
          latestButton.style.display = 'none';
        }
      }
      // ここからchaTGPt
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
