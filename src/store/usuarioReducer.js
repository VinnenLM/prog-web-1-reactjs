const INITIAL_STATE = {
    usuarioEmail: '',
    usuarioLogado: 0,
    idColecao: '',
    idCartao: '',
    nomeColecao: ''
}

function usuarioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail }
        case 'LOGOUT':
            return { ...state, usuarioLogado: 0, usuarioEmail: null }
        case 'IDCOLECAO':
            return { ...state, idColecao: action.idColecao }
        case 'IDCARTAO':
            return { ...state, idCartao: action.idCartao, nomeColecao: action.nomeColecao }
        default:
            return state;
    }
}

export default usuarioReducer;