import React from "react";
const today = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "short",
});
export default function Header({children}) {
  return (
    <header>
      <h1>{children}</h1>
      <p>{today}</p>
    </header>
  );
}
