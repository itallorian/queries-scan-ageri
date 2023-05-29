import React from 'react';
import { Grid, GridItem, Spinner } from 'nr1';
import AlertService from '../services/alerts.service';
import ExportComponent from './shared/export.component';

/**
 * Componente de alertas
 * @AlertsComponents
 */
export default class AlertsComponents extends React.Component {
    /**
     * Construtor da classe
     * @param {*} props
     */
    constructor(props) {
        super(props);

        /** Estados iniciais */
        this.state = { Alerts: [], Loading: true, lastSearchTerm: "", csv: [] }
    }

    /** Função executada quando o componente é criado */
    componentDidMount() {
        /** Preenche a variavel estado de alertas*/
        const setAlerts = () => {
            let alerts = JSON.parse(atob(localStorage.getItem('anr18DAKdanas_afdds231'))).details;
            let csv = [["name", "enabled", "query", "permalink"]];

            alerts.forEach(alert => {
                let row = [alert.entity.name.toString(), alert.enabled === true ? "yes" : "no", alert.nrql.query.toString(), alert.entity.permalink.toString()];
                csv.push(row);
            });

            this.setState({ Alerts: alerts, Loading: false, csv: csv })
        };

        /** Obtem os alertas */
        let forceUpdate = localStorage.getItem("ajflkasSA09fdkl") === "8ads09ASLKAD_2" || localStorage.getItem("ajflkasSA09fdkl") === "8ads09ASLKAD_1";
        if (localStorage.getItem('anr18DAKdanas_afdds231') === null || forceUpdate) AlertService.GetAll(forceUpdate, this.props.accountId).then((update) => { if (update) setAlerts() });
        else setAlerts();
    }

    /** Função executada quando o componente é atualizado */
    componentDidUpdate() {
        /** Filtra os alertas de acordo com o termo de pesquisa */
        if (localStorage.getItem('anr18DAKdanas_afdds231') !== null && this.props.searchTerm !== this.state.lastSearchTerm) {
            let alerts = JSON.parse(atob(localStorage.getItem('anr18DAKdanas_afdds231'))).details;
            alerts = this.props.searchTerm === "0" || this.props.searchTerm === "" ? alerts : alerts.filter(item => item.nrql.query.toLowerCase().trim().includes(this.props.searchTerm.toLowerCase().trim()));

            let csv = [["name", "enabled", "query", "permalink"]];

            alerts.forEach(alert => {
                let row = [alert.entity.name.toString(), alert.enabled === true ? "yes" : "no", alert.nrql.query.toString(), alert.entity.permalink.toString()];
                csv.push(row);
            });

            this.setState({ Alerts: alerts, lastSearchTerm: this.props.searchTerm, csv: csv })
        }
    }

    /**
     * Renderizador
     * @returns JSX
     */
    render() {

        return this.state.Loading === true ? <Spinner type={Spinner.TYPE.DOT} /> : <>
            {/* Informações */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '30px 10px', fontWeight: 'bold', fontSize: '15px' }}>
                <span style={{ background: "#dad9d9", border: '1px solid rgba(155, 155, 155, 0.2)', borderRadius: '5px', padding: '18px 12px' }}>Ativos: {this.state.Alerts.length > 0 ? this.state.Alerts.filter(item => item.enabled === true).length : 0}</span>
                <span style={{ background: "#dad9d9", border: '1px solid rgba(155, 155, 155, 0.2)', borderRadius: '5px', padding: '18px 12px' }}>Inativos: {this.state.Alerts.length > 0 ? this.state.Alerts.filter(item => item.enabled === false).length : 0}</span>
                <span style={{ background: "#dad9d9", border: '1px solid rgba(155, 155, 155, 0.2)', borderRadius: '5px', padding: '18px 12px' }}>Total: {this.state.Alerts.length}</span>
            </div>
            {/* Alertas com query */}
            {this.state.Alerts.length > 0 ? <>
                <div style={{ display: 'flex', justifyContent: 'end', padding: '10px' }}><ExportComponent data={this.state.csv} name={`alerts-${this.props.accountId}.csv`} /></div>
                <div style={{ background: "radial-gradient(#ffffff, #dad9d9)", border: '1px solid rgba(155, 155, 155, 0.2)', borderRadius: '5px', padding: '10px' }}>
                    <Grid>
                        {this.state.Alerts.map((item, index) => <GridItem columnSpan={6}>
                            <div key={index} style={{ minHeight: '100px', display: 'flex', 'justifyContent': 'center', flexDirection: 'column', margin: '20px 0', background: 'rgba(255, 255, 255, 0.7)', padding: '10px', border: '1px solid #eae8e8', borderRadius: '5px' }}>
                                <h4 style={{ padding: '10px 0' }}>{decodeURIComponent(escape(item.entity.name))} <span style={{ fontSize: '10px', margin: '0 10px' }}><a href={item.entity.permalink} target='_blank'></a></span></h4>
                                <span style={{ margin: '5px 0', fontSize: '12px', padding: '10px 5px', overflowWrap: 'break-word' }}>{decodeURIComponent(escape(item.nrql.query))}</span>
                            </div>
                        </GridItem>)}
                    </Grid>
                </div>
            </> : <></>}
        </>
    }
}