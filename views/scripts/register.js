const loginBtn = document.querySelector(".btn-submit");

const inpUsername = document.querySelector(".inp-username");

const inpPassword = document.querySelector(".inp-password");

const paragraphUserExist = document.querySelector(".user-exist");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://127.0.0.1:3000/register", {
    method: "POST",
    // cache: false,
    body: JSON.stringify({
      username: inpUsername.value,
      password: inpPassword.value,
    }),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => {
      console.log(res.url);
      if (res.redirected) {
        window.location.href = res.url;
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        paragraphUserExist.textContent = `Username ${data.username} already taken`;
        console.log(data);
      }
    });
});

//ARROWS

const beforeArrow = document.querySelector(".before-arrow");
const thingsYouCanDo = document.querySelector(".things-you-can-do");

beforeArrow.addEventListener("click", () => {
  thingsYouCanDo.classList.toggle("get-container-to-left");
  beforeArrow.classList.toggle("turn-next-arrow");
});

console.log(beforeArrow);
