import { useEffect, useState } from "react";
import Link from "./components/link";
import { windowGlobal } from "@/consts/window-global";

export default function Navigation() {
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [windowGlobal?.location?.pathname]);

  return (
    <header className="max-w-7xl mx-auto flex justify-center py-7 border-b-2 bg-white fixed w-full top-0 left-1/2 transform -translate-x-1/2">
      <Link href="/sum-records" activeLink={activeLink}>
        SUM RECORDS
      </Link>
      <Link href="/check-reports-consistency" activeLink={activeLink}>
        CHECK REPORTS CONSISTENCY
      </Link>
    </header>
  );
}
