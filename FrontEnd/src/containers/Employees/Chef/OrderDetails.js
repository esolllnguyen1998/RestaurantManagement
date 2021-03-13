import React, { Component } from 'react';
import { Label, Button, Col, Row, FormGroup, Input } from 'reactstrap';
import { ORDER_STATUS } from './constants';
import { isEqual } from 'lodash';

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false
        }
    }

    componentDidMount() {
        this.props.requestApiOrderPendingData();
        this.props.requestApiOrderProcessingData();
    }

    componentDidUpdate(prevProps) {
        var { isLoad } = this.state;
        if (isLoad) {
            this.props.requestApiOrderPendingData();
            this.props.requestApiOrderProcessingData();
            if (!isEqual(prevProps, this.props)) {
                this.setState({ isLoad: false });
            }
        }
    }

    render() {
        var { dataPendingOrders, dataProcessingOrders } = this.props;
        return (
            < Row >
                <Col xs="6">
                    <h4>Danh Sách Món Ăn Đang Chờ Tiếp Nhận</h4>
                    {dataPendingOrders && dataPendingOrders.length > 0 ?
                        <div className="wrap-grid chef">
                            <div class="grid-order-details">
                                {this.showOrders(dataPendingOrders, true)}
                            </div>
                        </div>
                        : <></>
                    }
                </Col>
                <Col xs="6">
                    <h4>Danh Sách Món Ăn Đang Được Xử Lý</h4>
                    {dataProcessingOrders && dataProcessingOrders.length > 0 ?
                        <div className="wrap-grid chef">
                            <div class="grid-order-details">
                                {this.showOrders(dataProcessingOrders, false)}
                            </div>
                        </div>
                        : <></>
                    }
                </Col >
            </Row >
        )
    }

    showOrders = (dataOrders, isPending) => {
        var elements = [];
        for (var item of dataOrders) {
            let id = item.id;
            elements.push(
                <article>
                    <Row>
                        <FormGroup style={{ width: "15%" }}>
                            <Label>Tên Bàn:</Label>
                            <Input readonly value={item.table.name} />
                        </FormGroup>
                        <FormGroup style={{ width: "30%" }}>
                            <Label>Tên Món:</Label>
                            <Input readonly value={item.food.name} />
                        </FormGroup>
                        <FormGroup style={{ width: "15%" }}>
                            <Label>Số Lượng:</Label>
                            <Input readonly value={item.amount} />
                        </FormGroup>
                        <FormGroup style={{ width: "30%" }}>
                            {isPending ?
                                < Button onClick={() => this.onUpdateStatus(id, ORDER_STATUS.progress)} className="btn-accept" color="primary">Tiếp Nhận</Button> :
                                < Button onClick={() => this.onUpdateStatus(id, ORDER_STATUS.ready)} className="btn-accept" color="success">Hoàn Thành</Button>
                            }
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup style={{ width: "90%" }}>
                            <Label>Ghi chú:</Label>
                            <Input readonly value={item.note} />
                        </FormGroup>
                    </Row>
                </article >
            )
        }
        return elements;
    }

    onUpdateStatus = (id, status) => {
        var { requestApiPostUpdateStatus } = this.props;
        requestApiPostUpdateStatus({ id, status });
        this.setState({
            isLoad: true
        })
    }
}
export default OrderDetails;
