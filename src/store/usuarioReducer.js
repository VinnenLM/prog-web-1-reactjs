const INITIAL_STATE = {
    usuarioEmail: '',
    usuarioUid: '',
    usuarioLogado: 0,
}

function usuarioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, usuarioUid: action.usuarioUid }
        case 'LOGOUT':
            return { ...state, usuarioLogado: 0, usuarioEmail: '', usuarioUid: '' }
        default:
            return state;
    }
}

export default usuarioReducer;
