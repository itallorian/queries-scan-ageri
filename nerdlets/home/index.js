import React from 'react';
import { Tabs, TabsItem, Button, PlatformStateContext, nerdlet } from 'nr1';
import SearchComponent from './components/search.component';
import AlertsComponents from './components/alerts.component';
import DashboardComponents from './components/dashboards.components';
import Logo from './assets/ageri.svg';

nerdlet.setConfig({
    accountPicker: true,
    timePicker: false
});

/**
 * Ponto de partida do projeto
 * @HomeNerdlet
 */
export default class HomeNerdlet extends React.Component {

  /**
   * Construtor da classe
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    /** Estados iniciais */
    this.state = { searchTerm: "0", accountId: 0 }
  }

  /**
   * Renderizador
   * @returns JSX
   */
  render() {
    const forceUpdate = () => {
      localStorage.setItem("ajflkasSA09fdkl", "8ads09ASLKAD_2");
      localStorage.removeItem('anr18DAKdanas_afdds231');
      localStorage.removeItem('sadkflsafjdsk_afdds231');

      setTimeout(() => {
        manipuleTab();
      }, 100);
    }

    const manipuleTab = () => {
      const alertsTab = document.getElementById("tab-tab-1-id-0"), dashsTab = document.getElementById("tab-tab-2-id-0");
      if (alertsTab.getAttribute("aria-selected") === "true") dashsTab.click();
      alertsTab.click();
    }

    return (
      <PlatformStateContext.Consumer>
        {(platformState) => {
          if (platformState.accountId > 0) {
            return (
              <main id='cost-reduction-main'>
                <div style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'end' }} >
                    <Button onClick={() => forceUpdate()} type={Button.TYPE.PRIMARY}>
                      Reload
                    </Button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href='https://ageri.com.br' target='_blank' id='logo-ageri'><img width="200" src={Logo} /></a>
                  </div>
                  <SearchComponent forceUpdate={this.state.forceUpdate} accountId={platformState.accountId} onChange={(value) => this.setState({ searchTerm: value })} />
                </div>
                <div id='cost-reduction-grid-main' style={{ padding: '10px' }}>
                  <Tabs defaultValue="tab-3">
                    <TabsItem className="tab-nr1-ageri" value="tab-1" label="Alertas">
                      <AlertsComponents searchTerm={this.state.searchTerm}  accountId={platformState.accountId} />
                    </TabsItem>
                    <TabsItem className="tab-nr1-ageri" value="tab-2" label="Dashboards">
                      <DashboardComponents searchTerm={this.state.searchTerm} accountId={platformState.accountId} />
                    </TabsItem>
                  </Tabs>
                </div>
                <span>&copy; Developed by Ageri, Ítallo Rian.</span>
              </main>
            )
          }
        }}
      </PlatformStateContext.Consumer>
    )
  }
}
