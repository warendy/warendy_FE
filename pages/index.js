import React from "react";
import Main from "./main/main";
<<<<<<< HEAD
=======
import { worker } from "../mocks/handlers";
if (worker) {
  worker.start();
}
>>>>>>> kakaoMap

export default function Index() {
  return (
    <>
      <Main />
    </>
  );
}
