import React, { Component } from 'react';
import { Navbar, Button, FormGroup, Label, Input, Row } from 'reactstrap';
import {
    requestApiTableData, requestApiTableByIdData,
    requestApiFoodData, requestApiPostAddOrder,
    requestApiPostAddOrderDetails, requestApiOrderReadyData
} from './redux/actions';
import { requestApiPostUpdateStatus } from '../Chef/redux/actions';
import { connect } from 'react-redux';
import '../../../assert/styles/staff.scss';
import OrderDetails from './OrderDetails';
import TableDetal from './TableDetail';
import RisottoModal from '../../../components/RisottoModal'
import { ORDER_STATUS } from '../Chef/constants';
import { isEqual } from 'lodash';

class StaffHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowOrderDetails: false,
            isShowModal: false,
            isLoad: false
        }
    }

    componentDidMount() {
        this.props.requestApiTableData();
        this.props.requestApiFoodData();
        this.props.requestApiOrderReadyData();
    }

    componentDidUpdate(prevProps) {
        var { isLoad } = this.state;
        if (isLoad) {
            this.props.requestApiOrderReadyData();
            this.props.requestApiFoodData();
            if (!isEqual(prevProps, this.props)) {
                this.setState({ isLoad: false });
            }
        }
    }

    render() {
        var { isShowOrderDetails, isShowModal } = this.state;
        var { dataTable, dataTables, dataFoods, requestApiPostAddOrderDetails, dataOrderDetails, requestApiTableByIdData, dataOrderDetailReady } = this.props;
        var tableDetail = dataTables[0];
        if (dataTable != null && dataTable.id) {
            tableDetail = dataTable;
        }
        if (tableDetail) {
            return (
                <div className="risotto-container">
                    <div className="form-create-bill">
                        <Navbar color="light" expand="md">
                            <Button className="text-primary" style={{ fontWeight: "bold" }} color="black">Thông Tin Bàn</Button>
                            <Button className="text-primary" style={{ fontWeight: "bold" }} onClick={() => this.onShowModal()} color="black">Thông Tin Món ăn</Button>
                        </Navbar>
                        {
                            isShowOrderDetails ?
                                <OrderDetails
                                    dataOrderDetails={dataOrderDetails}
                                    selectedTableId={tableDetail.id}
                                    selectedTableName={tableDetail.name}
                                    requestApiPostAddOrderDetails={requestApiPostAddOrderDetails}
                                    onBackToTableDetail={() => this.onBackToTableDetail(tableDetail.id)}
                                    dataFoods={dataFoods} />
                                :
                                <TableDetal
                                    tableDetail={tableDetail}
                                    dataTables={dataTables}
                                    requestApiTableByIdData={requestApiTableByIdData}
                                    onClickShowOrderDetails={() => this.onOnShowOrderDetails(tableDetail.id)}
                                    onGoToOrderDetail={() => this.onOnShowOrderDetails(null)}
                                    selectedTableId={tableDetail.id}
                                />
                        }
                    </div>
                    <RisottoModal
                        isShow={isShowModal}
                        onHide={() => this.onShowModal()}
                        body={this.showReadyFood(dataOrderDetailReady)}
                        title="Thông Tin Món Ăn"
                    />
                </div>
            );
        }
        else {
            return <div></div>;
        }
    }

    onOnShowOrderDetails = (tableId) => {
        var { requestApiPostAddOrder } = this.props;
        if (tableId) {
            requestApiPostAddOrder(tableId)
        }

        this.setState({
            isShowOrderDetails: true
        })
    }

    showReadyFood = (dataOrderDetailReady) => {
        var elements = [];
        if (dataOrderDetailReady && dataOrderDetailReady.length > 0) {
            for (var item of dataOrderDetailReady) {
                let id = item.id;
                elements.push(
                    <Row>
                        <FormGroup style={{ width: "30%" }}>
                            <Label>Tên Món Ăn</Label>
                            <Input readOnly value={item.food.name}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "20%" }}>
                            <Label>Tên Bàn</Label>
                            <Input readOnly value={item.table.name}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "20%" }}>
                            <Label>Status</Label>
                            <Input readOnly value={item.status}></Input>
                        </FormGroup>
                        <FormGroup style={{ width: "20%" }}>
                            <Button onClick={() => this.updateStatus(id)} color="success" style={{ width: "100%", marginTop: "35px" }}>Cập Nhật</Button>
                        </FormGroup>
                    </Row>
                )
            }
        }
        return elements;
    }

    updateStatus = (id) => {
        var status = ORDER_STATUS.finish;
        this.props.requestApiPostUpdateStatus({ id, status })
        this.setState({ isLoad: true });
    }

    onBackToTableDetail = (tableId) => {
        var { requestApiTableByIdData, requestApiTableData } = this.props;
        requestApiTableByIdData(tableId);
        requestApiTableData();
        this.setState({
            isShowOrderDetails: false
        })
    }

    onShowModal = () => {
        var { isShowModal } = this.state;
        this.setState({
            isShowModal: !isShowModal
        })
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiTableData: () => dispatch(requestApiTableData()),
        requestApiFoodData: () => dispatch(requestApiFoodData()),
        requestApiTableByIdData: (payload) => dispatch(requestApiTableByIdData(payload)),
        requestApiPostAddOrder: (payload) => dispatch(requestApiPostAddOrder(payload)),
        requestApiPostAddOrderDetails: (payload) => dispatch(requestApiPostAddOrderDetails(payload)),
        requestApiOrderReadyData: () => dispatch(requestApiOrderReadyData()),
        requestApiPostUpdateStatus: (payload) => dispatch(requestApiPostUpdateStatus(payload)),
    }
}

const mapStateToProps = state => (
    {
        dataTables: state.dataTables,
        dataTable: state.dataTable,
        dataFoods: state.dataFoods,
        dataOrderBasic: state.dataOrderBasic,
        dataOrderDetails: state.dataOrderDetails,
        dataOrderDetailReady: state.dataOrderDetailReady,
        dataUpdateOrders: state.dataUpdateOrders,
    });

export default connect(mapStateToProps, mapDispatchToProps)(StaffHomePage);
