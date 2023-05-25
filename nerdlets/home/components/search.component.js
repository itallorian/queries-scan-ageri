import React from 'react';
import SearchService from '../services/search.service';

/**
 * Componente de pesquisa
 * @SearchComponent
 */
export default class SearchComponent extends React.Component {
    /**
     * Construtor da classe
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = { Autocomplete: [] };
    }

    /** Função executada quando o componente é criado */
    componentDidMount() {
        SearchService.GetMetricAutocomplete(this.props.accountId).then(metrics => this.setState({ Autocomplete: metrics }));
    }

    /**
     * Renderizador
     * @returns JSX
     */
    render() {
        return <>
            <label for="browser">Termo de pesquisa:</label>
            <input style={{padding: '8px 18px', marginTop: '10px'}} list="browsers" name="browser" id="browser" onChange={(e) => this.props.onChange(e.target.value)} />
            <datalist id="browsers">
                {this.state.Autocomplete.map(item => <option key={item} value={item}>{item}</option>)}
            </datalist>
        </>;
    }
}