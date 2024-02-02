import LinkC from "@/components/server/LinkC";
import Container from "@/components/server/Container";
import { TextSpan } from "@/components/server/TextC";
import style from "./Header.module.scss";

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
            <LinkC key={el.name} href={el.href} className={style.Link}>
              <TextSpan theme={["white", "large"]}>{el.name}</TextSpan>
            </LinkC>
          ))}
        </nav>
      </div>
    </Container>
  </header>
);

export default Header;
