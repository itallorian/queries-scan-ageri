import React from "react";
import { Spinner } from 'nr1';
import DashboardService from "../services/dashboard.service";

export default class DashboardComponents extends React.Component {
    /**
     * Construtor da classe
     * @param {*} props
     */
    constructor(props) {
        super(props);

        /** Estados iniciais */
        this.state = { Dashboards: { details: [], totalWidgets: 0 }, Loading: true, lastSearchTerm: "" }
    }

    componentDidMount() {
        /** Preenche a variavel estado de alertas*/
        const setDashs = () => {
            let details = JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('sadkflsafjdsk_afdds231'))))).details;
            let totalWidgets = 0;

            details.forEach(element => {
                element.widgets.forEach(a => {
                    a.widgets.forEach(s => {
                        if (s.rawConfiguration.nrqlQueries != undefined && s.rawConfiguration.nrqlQueries.length > 0) {
                            element.totalWidgets = s.rawConfiguration.nrqlQueries.length;
                            totalWidgets += s.rawConfiguration.nrqlQueries.length;
                        }
                    })
                })
            });

            details = details.sort((a, b) => b.widgets.length - a.widgets.length);
            this.setState({ Dashboards: { details, totalWidgets }, Loading: false })
        };

        /** Obtem os dashboards/widgets */
        let forceUpdate = localStorage.getItem("ajflkasSA09fdkl") === "8ads09ASLKAD_1" || localStorage.getItem("ajflkasSA09fdkl") === "8ads09ASLKAD_2";
        if (localStorage.getItem('sadkflsafjdsk_afdds231') === null || forceUpdate) DashboardService.GetAll(forceUpdate, this.props.accountId).then((update) => { if (update) setDashs() });
        else setDashs();
    }

    componentDidUpdate() {
        if (localStorage.getItem('sadkflsafjdsk_afdds231') !== null && this.props.searchTerm !== this.state.lastSearchTerm) {
            let details = JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('sadkflsafjdsk_afdds231'))))).details;
            let totalWidgets = 0;

            if (this.props.searchTerm !== "0" && this.props.searchTerm !== "") {
                let newDetail = [];
                details.forEach(item => {
                    item.widgets.forEach(w => {
                        w.widgets.forEach(y => {
                            if (y.rawConfiguration.nrqlQueries != undefined) {

                                y.rawConfiguration.nrqlQueries = y.rawConfiguration.nrqlQueries.filter(z => z.query.toLowerCase().trim().includes(this.props.searchTerm.toLowerCase().trim()));
                                if (y.rawConfiguration.nrqlQueries.length > 0) {
                                    let add = true;
                                    newDetail.forEach(cItem => { if (cItem === item) add = false })
                                    if (add) newDetail.push(item);

                                }
                            }
                        });
                    });
                });

                details = newDetail;
            }

            details.forEach(element => {
                element.totalWidgets = 0;
                element.widgets.forEach(a => {
                    a.widgets.forEach(s => {
                        if (s.rawConfiguration.nrqlQueries != undefined && s.rawConfiguration.nrqlQueries.length > 0) {
                            element.totalWidgets += s.rawConfiguration.nrqlQueries.length > 0 ? 1 : 0;
                            totalWidgets += s.rawConfiguration.nrqlQueries.length > 0 ? 1 : 0;
                        }
                    })
                })
            });
            details = details.sort((a, b) => b.widgets.length - a.widgets.length);
            this.setState({ Dashboards: { details, totalWidgets }, lastSearchTerm: this.props.searchTerm });
        }
    }

    render() {
        return this.state.Loading === true ? <Spinner type={Spinner.TYPE.DOT} /> : <>
            {/* Informações */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '30px 10px', fontWeight: 'bold', fontSize: '15px' }}>
                <span style={{ background: "#dad9d9", border: '1px solid rgba(155, 155, 155, 0.2)', borderRadius: '5px', padding: '18px 12px' }}>Dashboards: {this.state.Dashboards.details.length}</span>
                <span style={{ background: "#dad9d9", border: '1px solid rgba(155, 155, 155, 0.2)', borderRadius: '5px', padding: '18px 12px' }}>Widgets/Charts: {this.state.Dashboards.totalWidgets}</span>
            </div>

            {this.state.Dashboards.details.map((item, index) => <div key={index} style={{ marginBottom: '15px', background: "radial-gradient(#ffffff, #dad9d9)", border: '1px solid rgba(155, 155, 155, 0.2)', borderRadius: '5px', padding: '10px', maxHeight: '500px', overflowX: 'hidden', overflowY: 'auto' }}>
                <h4 style={{ padding: '10px 0' }}>{item.dashboard} <span style={{ fontSize: '10px', margin: '0 10px' }}><a href={item.link} target='_blank'></a></span></h4>
                <span>Widgets/Charts: {item.totalWidgets}</span>
                {item.widgets.map(w => <div key={w.guid} style={{ margin: '15px 0' }}>
                    {w.widgets.map(x => <div key={x.id}>
                        {x.rawConfiguration.nrqlQueries != undefined && x.rawConfiguration.nrqlQueries.length > 0 ? <>
                            <div style={{ margin: '20px 0', background: 'rgba(255, 255, 255, 0.7)', padding: '10px', border: '1px solid #eae8e8', borderRadius: '5px' }}>
                                <span style={{ fontSize: '14px', padding: '10px 0' }}><span style={{ fontWeight: 'bold' }}>Nome:</span> {x.title !== "" ? x.title : "Sem nome"} <a href={w.link} target='_blank'></a></span>
                                <p style={{ padding: '10px 0', fontWeight: '700' }}>Queries:</p>
                                {x.rawConfiguration.nrqlQueries != undefined ? x.rawConfiguration.nrqlQueries.map((y, yIndex) => <p key={yIndex} style={{ padding: '5px 5px 20px 5px' }}>
                                    {y.query}
                                </p>) : <></>}
                            </div>
                        </> : <></>}
                    </div>)}
                </div>)}

            </div>)}
        </>
    }
}