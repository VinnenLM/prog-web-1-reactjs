const INITIAL_STATE = {
    usuarioEmail: '',
    usuarioLogado: 0,
    id: ''
}

function usuarioReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'LOGIN':
            return {...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail}
        case 'LOGOUT':
            return {...state, usuarioLogado: 0, usuarioEmail: null}
        case 'EDITAR':
            return {...state, id: action.id}
        default:
            return state;
    }
}

export default usuarioReducer;