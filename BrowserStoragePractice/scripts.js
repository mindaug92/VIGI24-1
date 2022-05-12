let sessionCookie =
  "session=abc123; expires=" + new Date(2022, 4, 12).toUTCString();
document.cookie = sessionCookie;
let text;

isCookieValid = (cookie) => {
  return cookie !== null && cookie.substring(8, 14) === "abc123";
};

let json = [
  {
    _id: "627be345284abc71feeac651",
    index: 0,
    guid: "bbf3d560-a5c6-4150-8d90-77742aeb52b9",
    isActive: true,
    balance: "$3,441.46",
    picture: "http://placehold.it/32x32",
    age: 27,
    eyeColor: "blue",
    name: "Agnes Bray",
    gender: "female",
    company: "COMVERGES",
    email: "agnesbray@comverges.com",
    phone: "+1 (836) 510-3313",
    address: "999 Elliott Walk, Temperanceville, Indiana, 2861",
    about:
      "Cupidatat in quis nulla quis amet magna anim ullamco. Aliquip veniam dolore eu et et et est velit officia cupidatat nisi culpa ullamco. Dolore incididunt dolore eiusmod dolor consequat.\r\n",
    registered: "2014-09-08T09:55:19 -03:00",
    latitude: -86.422852,
    longitude: 23.467676,
    tags: [
      "labore",
      "labore",
      "elit",
      "voluptate",
      "adipisicing",
      "Lorem",
      "aliquip",
    ],
    friends: [
      {
        id: 0,
        name: "Gena Eaton",
      },
      {
        id: 1,
        name: "Pollard Perry",
      },
      {
        id: 2,
        name: "Deanne Horn",
      },
    ],
    greeting: "Hello, Agnes Bray! You have 8 unread messages.",
    favoriteFruit: "strawberry",
  },
];

let response = JSON.stringify(json);

console.log(JSON.parse(response));

// // async function f() {
// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(45), 1000);
// })
//   .then((res) => {
//     // "done!"
//     console.log(res); // "done!"
//     return res * 2; // "DONE!"
//   })
//   .then((res) => {
//     // "DONE!"
//     console.log(res); // "DONE!"
//     return res.toLowerCase() + "e"; // "done!e"
//   })
//   .then((res) => {
//     // "done!e"
//     console.log(res); // "done!e"
//   })
//   .catch((e) => console.warn(e));

let func = async () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1000), 1000);
  });

  let result = await promise; // wait until the promise resolves (*)
  console.log(result); // "done!"

  let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

  let result2 = await promise2;

  console.log(result2); // "done!"
};

let func2 = async () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(5000), 5000);
  });

  let result = await promise; // wait until the promise resolves (*)
  console.log(result); // "done!"
};

let func3 = async () => {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(3500), 3500);
  });

  let result = await promise; // wait until the promise resolves (*)
  console.log(result); // "done!"
};

func3();
func();
func3();
func3();
console.log("zodis");
func();
console.log("1");
func();
func2();
console.log("2");
func2();
console.log("3");
console.log("4");
func();

if (isCookieValid(document.cookie)) {
  let userLanguage = "LT";
  let storedLanguage = localStorage.getItem("language");
  if (
    storedLanguage !== null &&
    (storedLanguage === "LT" ||
      storedLanguage === "EN" ||
      storedLanguage === "RU")
  ) {
    userLanguage = storedLanguage;
  } else {
    localStorage.setItem("language", userLanguage);
  }

  switch (userLanguage) {
    case "LT":
      text = "Labas Mariau!";
      break;

    case "EN":
      text = "Hello Marius!";
      break;

    case "RU":
      text = "Privet Marius!";
      break;

    default:
      text = "Labas Mariau!";
  }

  document.getElementById("lng-en").addEventListener("click", () => {
    localStorage.setItem("language", "EN");
    window.location.reload();
  });

  document.getElementById("lng-ru").addEventListener("click", () => {
    localStorage.setItem("language", "RU");
    window.location.reload();
  });

  document.getElementById("lng-lt").addEventListener("click", () => {
    localStorage.setItem("language", "LT");
    window.location.reload();
  });
} else {
  text = "Turite prisijungti";
}

document.getElementById("title").innerText = text;
