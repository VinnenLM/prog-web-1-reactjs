import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { auth } from "../../config/firebase";
import EstiloNavBar from "./navbar.module.css";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logado = useSelector((state) => state.usuarioLogado > 0);

  const sair = async (evt) => {
    evt.preventDefault();
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <header className={EstiloNavBar.header}>
      <div className={EstiloNavBar.header__menu}>
        <div className={EstiloNavBar.logo}>
          <Link to={logado ? "/home" : "/"}>
            <img src={Logo} className={EstiloNavBar.imgLogo} alt="Logo Mind Booster" />
            <span>Mind Booster</span>
          </Link>
        </div>
        <div className={EstiloNavBar.opcoes}>
          <Link to="/home" className={EstiloNavBar.minhasColecoes}>
            {logado ? "Minhas Coleções" : "Coleções"}
          </Link>
          <Link to="/jogo" className={EstiloNavBar.minhasColecoes}>
            Jogar
          </Link>
          {logado ? (
            <Link to="/" onClick={sair} className={EstiloNavBar.sair}>
              Sair
            </Link>
          ) : (
            <>
              <Link to="/cadastro" className={`${EstiloNavBar.cadastro} cadastro`}>
                Cadastre-se
              </Link>
              <Link to="/login" className={EstiloNavBar.entrar}>
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
