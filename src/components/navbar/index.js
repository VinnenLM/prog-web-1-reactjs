import EstiloNavBar from './navbar.module.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function NavBar() {
    const dispatch = useDispatch();
    return (

        <header className={EstiloNavBar.header}>
            <div className={EstiloNavBar.header__menu}>
                <div className={EstiloNavBar.logo}>
                    <img src={Logo} alt="Logo QI Labs" />
                    <span>QI Labs</span>
                </div>
                <div className={EstiloNavBar.opcoes}>
                    {
                        useSelector(state => state.usuarioLogado) <= 0 ?
                            <>
                                <Link to="/cadastro" className={`${EstiloNavBar.cadastro} cadastro`}>Cadastre-se</Link>
                                <Link to="/login" className={EstiloNavBar.entrar}>Entrar</Link>
                            </>
                            :
                            <>
                                <Link to="/home" className={EstiloNavBar.minhasColecoes}>Minhas Coleções</Link>
                                <Link to="/login" onClick={() => { dispatch({ type: 'LOGOUT' }) }} className={EstiloNavBar.sair}>Sair</Link>
                            </>
                    }
                </div>
            </div>
        </header >
    );
}

export default NavBar;