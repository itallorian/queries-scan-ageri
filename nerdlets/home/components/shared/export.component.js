import React from "react";
import { Button } from "nr1";
import { CSVLink, CSVDownload } from "react-csv";

/**
 * Componente com função de exportação
 * @ExportComponent
 */
export default class ExportComponent extends React.Component {
    render() {
        return <CSVLink data={this.props.data} filename={this.props.name}>
            <Button
                type={Button.TYPE.PRIMARY}
                iconType={Button.ICON_TYPE.INTERFACE__OPERATIONS__DOWNLOAD}
            />
        </CSVLink>
    }
}