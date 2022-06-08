import EstiloNavBar from './navbar.module.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <header className={EstiloNavBar.header}>
            <div className={EstiloNavBar.header__menu}>
                <div className={EstiloNavBar.logo}>
                    <img src={Logo} alt="Logo QI Labs" />
                    <span>QI Labs</span>
                </div>
                <div className={EstiloNavBar.opcoes}>
                    <Link to="/cadastro">Cadastre-se</Link>
                    <Link to="/login" className={EstiloNavBar.entrar}>Entrar</Link>
                </div>
            </div>
        </header>
    );
}

export default NavBar;