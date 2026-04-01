// やる気のやつ
if (document.getElementById("motivation")) {
  const m = Math.floor(Math.random() * 50);
  document.getElementById("motivation").textContent =
    "現在のやる気：" + m + "%";
}

// ぐべらべ
function useless() {
  alert("いうことの聞けない奴はクビだ!");
}

// downloadページ真面目な(倒置法)
if (document.getElementById("list")) {
  fetch('../data/software.json')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");

      data.software.forEach(soft => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
          <span>${soft.name}</span>
          <a href="software.html?id=${soft.id}">開く</a>
        `;

        list.appendChild(div);
      });
    });
}