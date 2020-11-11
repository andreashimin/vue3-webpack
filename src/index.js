import helloWorld from "./libs/helloWorld";
import addImage from "./libs/image";

import "./index.css";

console.log(process.env.NODE_ENV);
document.getElementById("app").append(helloWorld());
document.getElementById("app").append(addImage());
