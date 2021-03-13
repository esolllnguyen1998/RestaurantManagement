import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Label } from 'reactstrap';

export default class RisottoCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card className="card-risotto">
                <CardImg onClick={this.props.onClick} className={"image-table " + this.props.status.toLowerCase()} src={this.props.srcImg} />
                <CardBody>
                    <CardTitle className="card-title-name-table">{this.props.bodyCard}</CardTitle>
                </CardBody>
            </Card>
        );
    }
}
