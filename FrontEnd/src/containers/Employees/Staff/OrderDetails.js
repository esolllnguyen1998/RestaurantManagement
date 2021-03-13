import React, { Component } from 'react';
import { Form, FormGroup, Label, Row, Input, Col, Button } from 'reactstrap';

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: [],
            amount: 0,
            note: "",
            isOrder: false
        }
    }

    render() {
        var { dataFoods, onBackToTableDetail, selectedTableName, dataOrderDetails } = this.props;
        var { orderDetails, isOrder } = this.state;
        if (dataOrderDetails && isOrder && dataOrderDetails.length > 0) {
            onBackToTableDetail();
        }
        return (
            < Row >
                <Col className="wrap-grid foods" xs="7">
                    <div class="grid">
                        {this.showListfoodsRender(dataFoods)}
                    </div>
                </Col>
                <Col xs="5">
                    <Row>
                        <Col xs="1">
                            <img onClick={onBackToTableDetail} className="button-back" src="https://img.icons8.com/fluent/48/000000/circled-left-2.png" />
                        </Col>
                        <Col>
                            <h2>Thông Tin Đặt Món Chi Tiết {selectedTableName}</h2>
                        </Col>
                    </Row>
                    {orderDetails != null && orderDetails.length != 0 ?
                        <Form>
                            <div className="wrap-grid order">
                                <div class="grid-order-detail">
                                    {this.showListOrderDetails(orderDetails)}
                                </div>
                            </div>
                            <Button onClick={() => this.onOrder(orderDetails)} className="btn-submit-order" type="button" color="success">Xác Nhận</Button>
                        </Form>
                        : <div></div>
                    }
                </Col >
            </Row >
        )
    }

    onSelectfood = (foodName, foodPrice, foodId) => {
        var flag = true;
        var { orderDetails } = this.state;
        if (orderDetails.length > 0) {
            for (let item of orderDetails) {
                if (item.foodName == foodName && foodPrice == item.foodPrice) {
                    flag = false;
                }
            }
        }
        if (flag) {
            var orderDetail = {
                foodName,
                foodPrice,
                amount: 1,
                note: "",
                foodId
            };
            orderDetails.push(orderDetail);

            this.setState(
                orderDetails
            )
        }
    }

    onDeleteOrderDetail = (index) => {
        var { orderDetails } = this.state;
        orderDetails.splice(index, 1);
        this.setState(
            orderDetails
        )
    }

    onSaveNote = (e, i) => {
        var { orderDetails } = this.state;
        orderDetails[i].note = e.target.value;
        this.setState(
            {
                orderDetails
            }
        )
    }

    onSaveAmout = (e, i) => {
        var { orderDetails } = this.state;
        orderDetails[i].amount = e.target.value;
        this.setState(
            {
                orderDetails
            }
        )
    }

    onOrder = (orderDetails) => {
        var { selectedTableId, requestApiPostAddOrderDetails } = this.props;
        var paramaters = [];
        for (let item of orderDetails) {
            paramaters.push({
                tableId: selectedTableId,
                foodId: item.foodId,
                amount: item.amount,
                note: item.note
            })
        }
        requestApiPostAddOrderDetails(paramaters);
        this.setState(
            {
                isOrder: true
            }
        )
    }

    showListOrderDetails = (orderDetails) => {
        var articles = [];
        if (orderDetails != null && orderDetails.length > 0) {
            for (let i = 0; i < orderDetails.length; i++) {
                articles.push(<article>
                    <img onClick={() => this.onDeleteOrderDetail(i)} className="btn-close-order" src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" />
                    <Row>
                        <FormGroup style={{ width: "45%" }}>
                            <Label>Tên Món Ăn</Label>
                            <Input readOnly value={orderDetails[i].foodName}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "30%" }}>
                            <Label>Giá Tiền</Label>
                            <Input readOnly value={orderDetails[i].foodPrice}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "15%" }}>
                            <Label>Số Lượng</Label>
                            <Input required onChange={(e) => this.onSaveAmout(e, i)} type="number" ></Input>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup style={{ width: "95%" }}>
                            <Label>Ghi Chú</Label>
                            <Input onChange={(e) => this.onSaveNote(e, i)} type="textarea"></Input>
                        </FormGroup>
                    </Row>
                </article>
                )
            }
        }
        return articles;
    }

    showListfoodsRender = (listFoods) => {
        var indents = [];
        if (listFoods != null && listFoods.length > 0) {
            for (let item of listFoods) {
                let foodName = item.name;
                let foodPrice = item.price;
                let foodId = item.id;
                indents.push(
                    <article>
                        <img onClick={() => this.onSelectfood(foodName, foodPrice, foodId)} src={item.image} alt="Food photo" />
                        <div class="text">
                            <h5>{item.name}</h5>
                            <p>{item.price}</p>
                        </div>
                    </article>
                )
            }
        }
        return indents;
    }
}

export default OrderDetails;
