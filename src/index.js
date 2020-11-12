import hello from "./libs/helloWorld";
import image from "./libs/image";

document.getElementById("app").appendChild(hello());
document.getElementById("app").appendChild(image());

const hi = () => {
  console.log("hello world");
};

setTimeout(() => {
  hi();
}, 1000);
