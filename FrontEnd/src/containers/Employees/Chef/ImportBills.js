import React, { Component } from 'react';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';

export default class ImportBills extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowImportBill: false,
            foodName: "",
            totalCost: 0,
            description: "",
            id: ""
        }
    }

    render() {
        var { dataFoods, onGoToImportBillsAndBack } = this.props;
        var { isShowImportBill } = this.state;

        return (
            <Row>
                <Col xs="6">
                    <img onClick={onGoToImportBillsAndBack} className="btn-back" src="https://image.flaticon.com/icons/svg/93/93634.svg" />
                    <div className="wrap-grid chef">
                        <div class="grid-food-details">
                            {this.showListfoodsRender(dataFoods)}
                        </div>
                    </div>
                </Col>
                <Col xs="6">
                    <h4 >Phiếu Nhập Hàng</h4>
                    {isShowImportBill ?
                        this.showImportBill() :
                        <></>
                    }
                </Col>
            </Row>
        )
    }

    showImportBill = () => {
        var { foodName } = this.state;
        return (
            <Row>
                <FormGroup>
                    <Label>Tên Món Ăn:</Label>
                    <Input readOnly value={foodName}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Chi Phí:</Label>
                    <Input onChange={(e) => this.onSaveCost(e)} type="number"></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Chi Tiết:</Label>
                    <Input onChange={(e) => this.onSaveDetails(e)} type="textarea"></Input>
                </FormGroup>
                <FormGroup>
                    <Button onClick={() => this.onImportBill()} className="btn-access-import-bill" color="primary">Nhập Hàng</Button>
                </FormGroup>
            </Row>
        )
    }

    onImportBill = () => {
        var { id, description, totalCost } = this.state;
        this.props.requestApiPostImportBill({ foodId: id, totalCost, description })
    }

    onShowImportBill = (foodName, id) => {
        this.setState({
            isShowImportBill: true,
            foodName,
            id
        })
    }

    onSaveDetails = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onSaveCost = (e) => {
        this.setState({
            totalCost: e.target.value
        })
    }

    showListfoodsRender = (listFoods) => {
        var indents = [];
        if (listFoods != null && listFoods.length > 0) {
            for (let item of listFoods) {
                let foodName = item.name;
                let id = item.id;
                indents.push(
                    <article>
                        <img onClick={() => this.onShowImportBill(foodName, id)} src={item.image} alt="Food photo" />
                        <div class="text">
                            <h5>{item.name}</h5>
                        </div>
                    </article>
                )
            }
        }
        return indents;
    }
}
