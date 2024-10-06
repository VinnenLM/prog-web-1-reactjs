import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import EstiloNavBar from "./navbar.module.css";

function NavBar() {
  const dispatch = useDispatch();
  return (
    <header className={EstiloNavBar.header}>
      <div className={EstiloNavBar.header__menu}>
        <div className={EstiloNavBar.logo}>
          {useSelector((state) => state.usuarioLogado) <= 0 ? (
            <img
              src={Logo}
              className={EstiloNavBar.imgLogo}
              alt="Logo QI Labs"
            />
          ) : (
            <Link to="/home">
              <img
                src={Logo}
                className={EstiloNavBar.imgLogo}
                alt="Logo QI Labs"
              />
              <span>QI Labs</span>
            </Link>
          )}
        </div>
        <div className={EstiloNavBar.opcoes}>
          {useSelector((state) => state.usuarioLogado) <= 0 ? (
            <>
              <Link
                to="/cadastro"
                className={`${EstiloNavBar.cadastro} cadastro`}
              >
                Cadastre-se
              </Link>
              <Link to="/login" className={EstiloNavBar.entrar}>
                Entrar
              </Link>
            </>
          ) : (
            <>
              <Link to="/home" className={EstiloNavBar.minhasColecoes}>
                Minhas Coleções
              </Link>
              <Link
                to="/login"
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                }}
                className={EstiloNavBar.sair}
              >
                Sair
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
