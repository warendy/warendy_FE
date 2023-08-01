import React from "react";
import Main from "./main/main";
import { worker } from "../mocks/handlers";

if (worker) {
  worker.start();
}

export default function Index() {
  return (
    <>
      <Main />
    </>
  );
}
