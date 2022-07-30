import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <>
      <Header title={title} />
      <div className={`max-w-7xl mx-auto  ${className}`}>{children}</div>
      <Footer />
    </>
  );
}
