document.getElementById("create").onclick = async function () {

  const yourName = document.getElementById("yourName").value.trim();
  const theirName = document.getElementById("theirName").value.trim();
  const message = document.getElementById("message").value.trim();

  const photoInput = document.getElementById("photos");
  const files = Array.from(photoInput.files);

  const reasons = document.querySelectorAll(".reason");

  if (!yourName || !theirName) {
    alert("Yo 😭 at least enter both names first!");
    return;
  }

  if (files.length > 5) {
    alert("Whoa 😭 You can only choose 5 photos!");
    return;
  }

  let reasonHTML = "";

  reasons.forEach(function(reason) {
    if (reason.value.trim() !== "") {
      reasonHTML += `<p>❤️ ${reason.value}</p>`;
    }
  });

  const photoURLs = await Promise.all(
    files.map(function(file) {
      return new Promise(function(resolve) {

        const reader = new FileReader();

        reader.onload = function(event) {
          resolve(event.target.result);
        };

        reader.readAsDataURL(file);

      });
    })
  );

  let photoHTML = "";

  photoURLs.forEach(function(url) {
    photoHTML += `
      <img src="${url}" class="user-photo">
    `;
  });

  document.querySelector(".app").innerHTML = `

    <div class="proposal">

      <h1>Hey ${theirName}... 👀❤️</h1>

      <p class="message">
        ${message || "I have something I really wanna ask you..."}
      </p>

      <h2>Will you be my girlfriend? ❤️</h2>

      <div class="buttons">
        <button id="yes">YES ❤️</button>
        <button id="no">NO 😭</button>
      </div>

    </div>
  `;

  const yes = document.getElementById("yes");
  const no = document.getElementById("no");

  let size = 1;

  no.onclick = function() {

    size += 0.5;

    yes.style.transform = "scale(" + size + ")";
    no.style.transform = "scale(" + (1 / size) + ")";

    if (size >= 3.5) {
      no.style.display = "none";
    }

  };

  yes.onclick = function() {

    document.querySelector(".proposal").innerHTML = `

      <div class="celebration">

        <h1>Congratulations, ${theirName}! 🎉❤️</h1>

        <h2>
          You are officially ${yourName}'s girlfriend! 🥹❤️
        </h2>

        <p class="message">
          ${message || "Here's to something beautiful together. ❤️"}
        </p>

        <h2>Our memories 📸</h2>

        <div class="gallery">
          ${photoHTML}
        </div>

        <h2>Why I love you ❤️</h2>

        <div class="reasons">
          ${reasonHTML}
        </div>

        <p class="from">
          — ${yourName} ❤️
        </p>

      </div>

    `;

  };

};
