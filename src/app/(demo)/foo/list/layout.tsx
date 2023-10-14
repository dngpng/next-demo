import React from "react";

export default function FooLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  console.log("====>", modal);

  return (
    <>
      {children}
      {modal}
    </>
  );
}
