import Image from "next/image";
import styles from "./page.module.css";
import Home from "@/pages/Home";

export default function App() {
  return (
    <main className={styles.main}>
      <Home/>
    </main>
  );
}
