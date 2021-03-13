import React, { Component } from 'react';
import { Form, FormGroup, Label, Row, Input, Button, Col } from 'reactstrap';
import { TABLE_STATUS } from './constants';
import moment from 'moment';
import RisottoCard from '../../../components/RisottoCard';

class CreateBill extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var { tableDetail, dataTables } = this.props;
        return (
            <Row>
                <Col xs="7">
                    <div className="wrap-table-list ">
                        {this.listTablesRender(dataTables)}
                    </div>
                </Col>
                <Col xs="5">
                    {tableDetail ?
                        this.renderTableDetails(tableDetail)
                        : <></>
                    }
                </Col>
            </Row>
        );
    }

    listTablesRender = (tables) => {
        var indents = [];
        for (var i = 0; i < tables.length; i++) {
            let id = tables[i].id;
            if (tables[i].status == TABLE_STATUS.ready) {
                indents.push(
                    <RisottoCard
                        onClick={() => this.onFetchTableDetailById(id)}
                        srcImg="https://i0.wp.com/s1.uphinh.org/2020/05/17/15896858521709058.png"
                        bodyCard={tables[i].name}
                        status={TABLE_STATUS.ready} />
                );
            }
            else {
                indents.push(
                    <RisottoCard
                        onClick={() => this.onFetchTableDetailById(id)}
                        srcImg="https://i0.wp.com/s1.uphinh.org/2020/05/17/15896858521709058.png"
                        bodyCard={tables[i].name}
                        status={TABLE_STATUS.busy} />
                );
            }
        }
        return indents;
    }

    onFetchTableDetailById = (tableId) => {
        var { requestApiTableByIdData } = this.props;
        requestApiTableByIdData(tableId);
    }

    renderTableDetails = (tableDetail) => {
        var { onClickShowOrderDetails, onGoToOrderDetail } = this.props;
        var totalPrice = this.mathTotalPrice(tableDetail);
        return (
            <Form className="form-table-detail">
                <h2>Thông Tin Chi Tiết {tableDetail.name}</h2>
                <Row>
                    <FormGroup style={{ width: "45%" }}>
                        <Label>Sức chứa:</Label>
                        <Input readOnly value={tableDetail.capacity}></Input>
                    </FormGroup>
                    <FormGroup style={{ width: "45%" }}>
                        <Label>Tình trạng:</Label>
                        <Input readOnly value={tableDetail.status}></Input>
                    </FormGroup>
                </Row>
                {tableDetail.status == TABLE_STATUS.busy && tableDetail.lastOrder != null ?
                    <Row>
                        <FormGroup style={{ width: "45%" }}>
                            <Label>Nhân viên: </Label>
                            <Input readOnly value={tableDetail.lastOrder.staff.name}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "45%" }}>
                            <Label>Khách vào bàn lúc: </Label>
                            <Input readOnly value={moment(tableDetail.lastOrder.createAt).format("DD-MM-YYYY HH:mm:ss")}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "35%" }}>
                            <Label>Thông tin món ăn: </Label>
                        </FormGroup>
                        <FormGroup style={{ width: "60%" }}>
                            <Button onClick={onGoToOrderDetail} className="btn-add-food" color="success">+ Thêm Món</Button>
                        </FormGroup>
                        <FormGroup style={{ width: "95%" }}>
                            {this.renderFoodDetailOfTable(tableDetail.lastOrder.orderDetails)}
                        </FormGroup>
                        <FormGroup>
                            <h3>Tổng tiền: {totalPrice}</h3>
                        </FormGroup>
                    </Row>
                    :
                    <FormGroup >
                        <Button onClick={onClickShowOrderDetails} color="success">+ Tạo Order</Button>
                    </FormGroup>
                }
            </Form>
        )
    }

    mathTotalPrice = (tableDetail) => {
        var totalPrice = 0;
        if (tableDetail && tableDetail.lastOrder && tableDetail.lastOrder.orderDetails.length > 0) {
            var orderDetails = tableDetail.lastOrder.orderDetails;
            orderDetails.forEach(orderDetail => {
                totalPrice += orderDetail.price * orderDetail.amount;
            });
        }
        return totalPrice;
    }

    renderFoodDetailOfTable = (orderDetails) => {
        var orderDetailElement = [];
        for (var orderDetail of orderDetails) {
            orderDetailElement.push(
                <article>
                    <Row>
                        <FormGroup style={{ width: "35%" }}>
                            <Label>Tên Món Ăn</Label>
                            <Input readOnly value={orderDetail.food.name}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "20%" }}>
                            <Label>Giá Tiền</Label>
                            <Input readOnly value={orderDetail.price}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "15%" }}>
                            <Label>Số Lượng</Label>
                            <Input readOnly type="number" value={orderDetail.amount}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "18%" }}>
                            <Label>Trạng Thái</Label>
                            <Input readOnly value={orderDetail.status}></Input>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup style={{ width: "30%" }}>
                            <Label>Khách gọi món lúc</Label>
                            <Input readOnly type="text" value={moment(orderDetail.orderAt).format("HH:mm:ss")}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "63%" }}>
                            <Label>Ghi Chú</Label>
                            <Input readOnly type="text" value={orderDetail.note}></Input>
                        </FormGroup>
                    </Row>
                </article>
            );
        }
        return (
            <div className="wrap-grid table">
                <div class="grid-order-detail">
                    {orderDetailElement}
                </div>
            </div>
        )
    }
}

export default CreateBill;
