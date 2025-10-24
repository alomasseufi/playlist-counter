document.getElementById("generateBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value.trim();
  if (!url) return alert("Cole o link da playlist.");

  if (!url.includes("spotify.com/playlist/")) {
    alert("Por enquanto apenas playlists do Spotify são suportadas.");
    return;
  }

  const results = document.getElementById("results");
  results.classList.add("hidden");

  const res = await fetch("/api/spotify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playlistUrl: url }),
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error || "Erro.");

  document.getElementById("total").textContent =
    `Total de músicas: ${data.totalTracks}`;
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.list.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.track} (${item.count}x)`;
    list.appendChild(li);
  });
  results.classList.remove("hidden");
});
