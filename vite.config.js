import dotenv from "dotenv";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ mode }) => {
  if (mode === "development") {
    dotenv.config();
  }
};
