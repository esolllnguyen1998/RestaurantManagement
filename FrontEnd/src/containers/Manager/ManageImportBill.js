import React, { Component } from 'react';
import { connect } from 'react-redux';
import RisottoScrollTable from '../../components/RisottoScrollTable';
import { requestApiGetImportBillByDate } from './redux/actions';
import { isEqual } from 'lodash';
import { DatePicker, Row, Col, Modal } from 'antd';
import 'antd/dist/antd.css';
import { MinusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { FormGroup, Label } from 'reactstrap';

class ManageImportBill extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateFrom: null,
            dateTo: null,
            visible: false,
            selectedDescription: ""
        }
    }

    componentWillMount() {
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {

        }
    }

    render() {
        return (
            <>
                {this.renderModalBody()}
                <Row>
                    <Col span={16}>
                        <h1 className="h1-margin-left">Quản Lý Danh Sách Phiếu Nhập</h1>
                    </Col>
                    <Col span={6} className="wrap-date-picker">
                        <Row>
                            <DatePicker
                                onChange={(date) => this.onChange(date, true)}
                                className="date-picker" size="large"
                                disabledDate={d => d.isAfter(Date.now())}
                            />
                            <MinusOutlined style={{ marginTop: "5%", padding: "0px 3px 0px 4px" }} />
                            <DatePicker
                                disabledDate={d => d.isAfter(Date.now())}
                                onChange={(date) => this.onChange(date, false)}
                                className="date-picker" size="large" />
                        </Row>
                    </Col>
                </Row>
                <RisottoScrollTable
                    customClass="import-bill-manage"
                    content={this.renderContentTable()} />
            </>
        )
    }

    onChange = (date, isDateFrom) => {
        var { dateFrom, dateTo } = this.state;
        if (date) {
            if (isDateFrom) {
                dateFrom = date.toDate().getTime();
                this.setState({ dateFrom });
            }
            else {
                dateTo = date.toDate().getTime();
                this.setState({ dateTo });
            }
            if (dateFrom, dateTo) {
                if (dateFrom > dateTo) {
                    toast.error("Ngày sau không thể nhỏ hơn ngày trước.", "Thông báo", { displayDuration: 3000 });
                    return;
                }
                this.props.requestApiGetImportBillByDate({ dateFrom: dateFrom, dateTo: dateTo })
            }
        }
    }

    renderModalBody = () => {
        var { selectedDescription } = this.state;
        return (
            <Modal
                title="Thông Tin Món ăn Chi Tiết"
                visible={this.state.visible}
                onCancel={this.hideModal}
                cancelText="Cancel"
            >
                <FormGroup>
                    <Label>{selectedDescription}</Label>
                </FormGroup>
            </Modal>
        )
    }
    showModal = (description) => {
        this.setState({
            visible: true,
            selectedDescription: description
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };


    renderContentTable = () => {
        var { dataImportBills } = this.props;
        var elements = [];
        if (dataImportBills && dataImportBills.content && dataImportBills.content.length > 0) {
            dataImportBills.content.forEach((element, index) => {
                let stt = ++index;
                elements.push(
                    <tr>
                        <td>{stt}</td>
                        <td>{element.food.name}</td>
                        <td>{element.totalCost}</td>
                        <td>
                            <img
                                onClick={() => this.showModal(element.description)}
                                className="icon-option details"
                                src="https://img.pngio.com/icon-detail-icon-png-and-vector-for-free-download-pngtree-detail-png-512_512.png" />
                        </td>
                    </tr>
                )
            });
            return (
                <>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Món Ăn</th>
                            <th>Tổng Tiền</th>
                            <th>Chi Tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </>
            )
        }
        else {
            return <></>;
        }
    }
}
const mapDispatchToProps = dispatch => {
    return {
        requestApiGetImportBillByDate: (payload) => dispatch(requestApiGetImportBillByDate(payload)),
    }
}

const mapStateToProps = state => (
    {
        dataImportBills: state.managerImportBillReducers,
    });

export default connect(mapStateToProps, mapDispatchToProps)(ManageImportBill);
