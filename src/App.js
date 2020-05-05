import React, { Component } from "react";
import { Card, CardBody, Row } from "reactstrap";

class First extends Component {
    constructor(){
        super()
        this.state = {
            formData: {
                totalSources: null,
                totalSourcePercentage: null,
            },
            rows: [{ source: "", value: null, percentage: null }],
        };
    }
    
    handleChange = async (e, index, row) => {
        if (row === 1) {
            const rows = [...this.state.rows];
            rows[index][e.target.name] = e.target.value;
            let sumValue = 0,
            sumPercentage = 0;
            for (let i = 0; i < rows.length; i++) {
                sumValue += parseInt(rows[i]["value"]);
                sumPercentage += parseInt(rows[i]["percentage"]);
            }
            await this.setState({
                rows,
                formData: {
                    ...this.state.formData,
                    totalSources: sumValue,
                    totalSourcePercentage: sumPercentage,
                },
            });
            return;
        }
    };

    addMoreFields = rowsNum => {
        if (rowsNum === 1) {
            const rows = [...this.state.rows];
            rows.push({ source: "", value: null, percentage: null });
            this.setState({ rows });
            return;
        }
    };
    
    render() {
        return (
            <Card>
                <CardBody className="cardBodyWrapper">
                    <div className="profit-form"
                        style={{ display: "inline-block", padding: "15px", backgroundColor: "#e7e7ed", width: "100%", float: "left", marginBottom: "20px" }} >
                        <Row className="customFlexRow">
                            <div className="customFlexColumn col-md-8 sources-font">Sources</div>
                            <div className="customFlexColumn col-md-2 sources-font">Value</div>
                            <div className="customFlexColumn col-md-2 sources-font  ">%</div>
                        </Row>
                    </div>
                    { this.state.rows.map((el, index) => {
                        // eslint-disable-next-line
                        let row = 1;
                        return (
                            <div key={`${el}-${index}`}>
                                <div className="row sources">
                                    <div className="col-md-6">
                                        <input type="text" name="source" onChange={e => this.handleChange(e, index, (row = 1))} />
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" name="value" onChange={e => this.handleChange(e, index, (row = 1))} />
                                    </div>
                                    <div className="col-md-3">
                                        <input type="text" name="percentage" onChange={e => this.handleChange(e, index, (row = 1))} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <p className="sources-p" onClick={() => this.addMoreFields(1)}>+ Type in additional sources</p>
                    <Row className="customFlexRow m-bottom">
                        <div className="customFlexColumn col-md-8 sources-font">Total Sources</div>
                        <div className="customFlexColumn col-md-2 sources-font">
                            { this.state.formData.totalSources ? `$${this.state.formData.totalSources}` : "$" }
                        </div>
                        <div className="customFlexColumn col-md-2 sources-font">
                            {this.state.formData.totalSourcePercentage ? `${this.state.formData.totalSourcePercentage}%` : "%" }
                        </div>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default First;
