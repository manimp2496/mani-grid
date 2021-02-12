import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//import 'primereact/resources/themes/fluent-light/theme.css'
import 'primereact/resources/themes/arya-green/theme.css';
import './../css/Common.css';


const datatablearr = [
    {
        "id": 0,
        "location": "Colorado",
        "PRA": 624596,
        "prec": 33.48,
        "CPVA": 52049666,
        "CPVAprecent": 33.33,
        "CMA": 195,
        "RA": 3203,
        "MShareByR": 33.33,
        "CDDA": 220
    },
    {
        "id": 1,
        "location": "Florida",
        "PRA": 600628,
        "prec": 32.19,
        "CPVA": 52049666,
        "CPVAprecent": 33.33,
        "CMA": 195,
        "RA": 3203,
        "MShareByR": 33.33,
        "CDDA": 220
    },
    {
        "id": 2,
        "location": "Mississippi",
        "PRA": 640596,
        "prec": 34.33,
        "CPVA": 51385666,
        "CPVAprecent": 33.33,
        "CMA": 198,
        "RA": 3114,
        "MShareByR": 33.33,
        "CDDA": 792
    }
]
const branchdataarr = [
    {
        "id": 0,
        "location": "Branch 1",
        "PRA": 878269,
        "prec": 34.96,
        "CPVA": 73189083,
        "CPVAprecent": 33.33,
        "CMA": 287,
        "RA": 3060,
        "MShareByR": 33.33,
        "CDDA": 1148
    },
    {
        "id": 1,
        "location": "Branch 2",
        "PRA": 822775,
        "prec": 33.33,
        "CPVA": 68564583,
        "CPVAprecent": 33.33,
        "CMA": 257,
        "RA": 3201,
        "MShareByR": 33.33,
        "CDDA": 1028
    },
    {
        "id": 2,
        "location": "Branch 3",
        "PRA": 817009,
        "prec": 32.52,
        "CPVA": 68084083,
        "CPVAprecent": 33.33,
        "CMA": 252,
        "RA": 3242,
        "MShareByR": 33.33,
        "CDDA": 1008
    }
]



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datatablearr: datatablearr,
            branchdataarr: branchdataarr,
            dropdowntype: "10",
            dropdownvalue: [
                {
                    code: 10,
                    value: "Location"
                },
                {
                    code: 20,
                    value: "Branch"
                }
            ],
            pravalue: "",
            prapercent: "",
            cpvavalue: "",
            cpvapercent: "",
            cmatotal: "",
            racannuvalue: "",
            msbrvalue: "",
            comddvalue: "",
            datacombovalue: "US"

        }
    }
    actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };
    numFormatter = (num) => {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
        } else if (num < 900) {
            return num; // if value < 1000, nothing to do
        }
    }
    confirmDeleteProduct = (rowData) => {
        let datatablearr = [];
        let branchdataarr = [];
        if (this.state.dropdowntype == 10) {
            datatablearr = this.state.datatablearr.filter(item => item.id != rowData.id);
            this.setState({ datatablearr });
        }
        else {
            branchdataarr = this.state.branchdataarr.filter(item => item.id != rowData.id);
            this.setState({ branchdataarr });
        }

    };

    selectDropDown = (evt) => {
        const val = evt.target.value;
        this.setState({ dropdowntype: val });
        if (val == 10) {
            this.setState({ datacombovalue: "US" });
        }
        else {
            this.setState({ datacombovalue: "Branch Name" });
        }
    };

    filterdata = (evt) => {
        debugger;
        console.log(evt);
    }
    formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    bodyElem = (rowData) => {
        var val = this.formatCurrency(rowData.PRA);
        var percent = rowData.prec;
        return <span className="">{val}<span className="per-class">({percent}%)</span></span>
    }

    bodyElem1 = (rowData) => {
        var val = this.formatCurrency(rowData.CPVA);
        var percent = rowData.CPVAprecent;
        return <span className="">{val}<span className="per-class">({percent}%)</span></span>
    }
    bodyElem2 = (rowData) => {
        return rowData.CMA;
    }
    bodyElem3 = (rowData) => {
        return this.formatCurrency(rowData.RA);
    }
    bodyElem4 = (rowData) => {
        return `${rowData.MShareByR}%`;
    }
    bodyElem5 = (rowData) => {
        return rowData.CDDA;
    }
    praTotal = () => {
        let total = 0;
        let percent = 0;
        var arr = [];
        if (this.state.dropdowntype == 10) {
            arr = this.state.datatablearr;
        }
        else {
            arr = this.state.branchdataarr;
        }
        for (let datatablearr of arr) {
            total += datatablearr.PRA;
            percent += datatablearr.prec;
        }
        var numval = this.numFormatter(total);
        if (numval == 0) {
            return <span className="">{this.formatCurrency(numval)}<span className="footper">({percent.toFixed(0)}%)</span></span>
        }
        return <span className="">${this.formatCurrency(numval)}<span className="footper">({percent.toFixed(0)}%)</span></span>
    }
    cpvTotal = () => {
        let total = 0;
        let percent = 0;
        var arr = [];
        if (this.state.dropdowntype == 10) {
            arr = this.state.datatablearr;
        }
        else {
            arr = this.state.branchdataarr;
        }
        for (let datatablearr of arr) {
            total += datatablearr.CPVA;
            percent += datatablearr.CPVAprecent;
        }
        var numval = this.numFormatter(total);
        if (numval == 0) {
            return <span className="">{this.formatCurrency(numval)}<span className="footper">({percent.toFixed(0)}%)</span></span>
        }
        return <span className="">${this.formatCurrency(numval)}<span className="footper">({percent.toFixed(0)}%)</span></span>
    }
    cmaTotal = () => {
        let total = 0;
        var arr = [];
        if (this.state.dropdowntype == 10) {
            arr = this.state.datatablearr;
        }
        else {
            arr = this.state.branchdataarr;
        }
        for (let datatablearr of arr) {
            total += datatablearr.CMA;
        }
        return total;
    }
    cddaTotal = () => {
        let total = 0;
        var arr = [];
        if (this.state.dropdowntype == 10) {
            arr = this.state.datatablearr;
        }
        else {
            arr = this.state.branchdataarr;
        }
        for (let datatablearr of arr) {
            total += datatablearr.CDDA;
        }
        return total;
    }
    shareTotal = () => {
        let total = 0;
        var arr = [];
        if (this.state.dropdowntype == 10) {
            arr = this.state.datatablearr;
        }
        else {
            arr = this.state.branchdataarr;
        }
        for (let datatablearr of arr) {
            total += datatablearr.MShareByR;
        }
        return `${Math.round(total)}%`;
    }
    RATotal = () => {
        let total = 0;
        var arr = [];
        if (this.state.dropdowntype == 10) {
            arr = this.state.datatablearr;
        }
        else {
            arr = this.state.branchdataarr;
        }
        for (let datatablearr of arr) {
            total += datatablearr.RA;
        }
        var numval = this.numFormatter(total);
        if (numval == 0) {
            return `${'$' + numval}`;
        }
        return `$${this.formatCurrency(numval)}`;
    }

    render() {
        let footerGroup = <ColumnGroup>
            <Row>
                <Column footer="" />
                <Column footer={this.praTotal.bind(this)} className="footclr" />
                <Column footer={this.cpvTotal.bind(this)} className="footclr" />
                <Column footer={this.cmaTotal.bind(this)} className="footclr" />
                <Column footer={this.RATotal.bind(this)} className="footclr" />
                <Column footer={this.shareTotal.bind(this)} className="footclr" />
                <Column footer={this.cddaTotal.bind(this)} className="footclr" />
                <Column footer="" />
            </Row>
        </ColumnGroup>;
        return (
            <div className="container-fluid">
                <div className="row colrow">
                    <div className="col-md-6">
                        {/*<h5 className="head-5">Primary View</h5> <span className="spanspace"> | </span>*/}
                        <select name="dropdown" id="dropdown" className="sel-drp" value={this.state.dropdowntype} onChange={this.selectDropDown}>
                            {this.state.dropdownvalue.map(item =>
                                <option value={item.code} key={item.code}>{item.value}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">
                    </div>
                </div> 
                <div className="row">
                    <div className="col-md-12 colrow">
                        <div className="card">
                            <DataTable value={this.state.dropdowntype == 10 ? this.state.datatablearr : this.state.branchdataarr} paginator rows={10} paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" rows={10}
                                emptyMessage="No data found." footerColumnGroup={footerGroup} removableSort className="p-datatable-gridlines">
                                <Column field="location" header="Location" className="div-clr" sortable></Column>
                                <Column field="PRA" header="Potential Revenue" body={this.bodyElem.bind(this)} sortable></Column>
                                <Column field="CPVA" header="Competitor Processing Volume" body={this.bodyElem1.bind(this)} sortable></Column>
                                <Column field="CMA" header="Competitor Merchant" body={this.bodyElem2.bind(this)} sortable></Column>
                                <Column field="RA" header="Revenue/Account" body={this.bodyElem3.bind(this)} sortable></Column>
                                <Column field="MShareByR" header="Market Share" body={this.bodyElem4.bind(this)} sortable></Column>
                                <Column field="CDDA" header="Commercial DDA's" body={this.bodyElem5.bind(this)} sortable ></Column>
                                <Column header="Action" body={this.actionBodyTemplate} ></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default App;