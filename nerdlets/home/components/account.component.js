import React from "react";
import AccountService from "../services/account.service";

/**
 * Componente de seleção da conta (Filtro)
 * @AccountComponent
 */
export default class AccountComponent extends React.Component {
    /**
     * Construtor da classe
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = { accounts: [] };
    }

    /** Função executada quando o componente é criado */
    componentDidMount() {
        AccountService.GetAll().then(accounts => this.setState({ accounts }));
    }

    /**
     * Renderizador
     * @returns JSX
     */
    render() {
        return <div style={{ padding: '5px 15px' }} >
            <select onChange={(e) => this.props.onChange(e.target.value)} style={{padding: '5px 15px'}} >
                <option value={0}> Todas as contas</option>
                {this.state.accounts.map(account => <option key={account.value} value={account.value}>{account.label}</option>)}
            </select>
        </div>
    }
}