import Container from "@/components/server/Container";
import style from "./Header.module.scss";
import Link from "next/link";

const items = [
  { name: "Tabela", href: "/" },
  { name: "Mecze", href: "/games" },
];

const Header = () => (
  <header className={style.Header}>
    <Container className={style.Container}>
      <div className={style.Main}>
        <nav className={style.Nav}>
          {items.map((el) => (
            <Link key={el.name} href={el.href} className={style.Link}>
              {el.name}
            </Link>
          ))}
        </nav>
      </div>
    </Container>
  </header>
);

export default Header;
