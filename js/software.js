const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch('../data/software.json')
  .then(res => res.json())
  .then(data => {

    const soft = data.software.find(s => s.id === id);

    document.getElementById("title").textContent = soft.name;

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

  });