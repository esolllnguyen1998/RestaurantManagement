import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../assert/styles/chef.scss';
import { requestApiOrderPendingData, requestApiOrderProcessingData, requestApiPostUpdateStatus, requestApiPostImportBill } from './redux/actions';
import { requestApiFoodData } from '../Staff/redux/actions';
import OrderDetails from './OrderDetails';
import { Navbar, Button, Col } from 'reactstrap';
import ImportBills from './ImportBills';

class ChefHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            isShowImportBill: false
        }
    }

    componentWillMount() {
        this.props.requestApiOrderPendingData();
        this.props.requestApiOrderProcessingData();
        this.props.requestApiFoodData();
    }

    render() {
        var { dataPendingOrders, dataProcessingOrders,
            requestApiPostUpdateStatus, requestApiOrderPendingData,
            requestApiOrderProcessingData, dataUpdateOrders, dataFoods,
            requestApiPostImportBill } = this.props;
        var { isShowImportBill } = this.state;

        return (
            <div className="risotto-container">
                <div className="form-create-bill">
                    <Navbar color="light" expand="md">
                        <Col>
                            <h3 className="text-success" color="black">Đầu Bếp: {sessionStorage.getItem("name")}</h3>
                        </Col>
                        <Col xs="3" className="col-wrap-btn">
                            <Button onClick={() => this.onGoToImportBillsAndBack()} className="text-primary btn-import-bill" color="black">Nhập Hàng</Button>
                        </Col>
                    </Navbar>
                    {isShowImportBill ?
                        <ImportBills
                            dataFoods={dataFoods}
                            onGoToImportBillsAndBack={() => this.onGoToImportBillsAndBack()}
                            requestApiPostImportBill={requestApiPostImportBill} /> :
                        < OrderDetails dataPendingOrders={dataPendingOrders}
                            dataProcessingOrders={dataProcessingOrders}
                            requestApiPostUpdateStatus={requestApiPostUpdateStatus}
                            requestApiOrderPendingData={requestApiOrderPendingData}
                            requestApiOrderProcessingData={requestApiOrderProcessingData}
                            dataUpdateOrders={dataUpdateOrders} />
                    }
                </div>
            </div>
        )
    }

    onGoToImportBillsAndBack = () => {
        var { isShowImportBill } = this.state;
        this.setState({
            isShowImportBill: !isShowImportBill
        })
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiOrderPendingData: () => dispatch(requestApiOrderPendingData()),
        requestApiFoodData: () => dispatch(requestApiFoodData()),
        requestApiOrderProcessingData: () => dispatch(requestApiOrderProcessingData()),
        requestApiPostUpdateStatus: (payload) => dispatch(requestApiPostUpdateStatus(payload)),
        requestApiPostImportBill: (payload) => dispatch(requestApiPostImportBill(payload))
    }
}

const mapStateToProps = state => (
    {
        dataPendingOrders: state.dataPendingOrders,
        dataProcessingOrders: state.dataProcessingOrders,
        dataUpdateOrders: state.dataUpdateOrders,
        dataFoods: state.dataFoods,
        dataImportBill: state.dataImportBill,
    });

export default connect(mapStateToProps, mapDispatchToProps)(ChefHomePage);
