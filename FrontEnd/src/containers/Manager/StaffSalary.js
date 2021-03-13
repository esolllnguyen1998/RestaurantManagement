import React, { Component } from 'react'
import StaffList from './assigned/staff-list';
import { DatePicker, Row, Col } from 'antd';
import RisottoScrollTable from '../../components/RisottoScrollTable';
import { requestApiGetPayRollById, requestApiAddPayRoll } from './redux/actions';
import { connect } from 'react-redux';
import { Label, FormGroup, Button } from 'reactstrap';
import { isEqual } from 'lodash';

class StaffSalary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: null,
            month: 0,
            year: 0,
            checker: true
        }
    }

    componentDidUpdate(prevProps) {
        var { selectedStaff, checker } = this.state;
        if (checker) {
            if (selectedStaff && selectedStaff.id) {
                this.props.requestApiGetPayRollById(selectedStaff.id)
                if (!isEqual(prevProps, this.props)) {
                    this.setState({
                        checker: false
                    })
                }
            }
        }
    }

    render() {
        var { selectedStaff } = this.state;
        var { dataPayRoll } = this.props
        return (
            <>
                <StaffList onSelected={this.onSelectedStaff} />
                {selectedStaff ?
                    <Row>
                        <Col span={16}>
                            <h2 style={{ textAlign: "left" }}>Lịch Sử Trả Lương Của: {selectedStaff.name}</h2>
                            <RisottoScrollTable
                                customClass="staff-salary"
                                content={this.renderContentTable(dataPayRoll)} />
                        </Col>
                        <Col span={8}>
                            <Row style={{ margin: "0px 0px 0px 45px" }}>
                                <h2 style={{ fontWeight: "bold", color: "#5DADE2", textAlign: "left" }}>Phiếu Tính Lương</h2>
                                <FormGroup>
                                    <Label>Họ và tên: {selectedStaff.name}</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Số điện thoại: {selectedStaff.phone}</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Chức vụ: {selectedStaff.position}</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Mức lương: {selectedStaff.salary}</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Phụ cấp: {selectedStaff.allowance}</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Tổng cộng: {selectedStaff.salary + selectedStaff.allowance}</Label>
                                </FormGroup>
                                <DatePicker
                                    size="large"
                                    renderExtraFooter={() => 'extra footer'}
                                    picker="month"
                                    onChange={(date) => this.onChange(date)} />
                                <Button onClick={() => this.onAddPayRoll(selectedStaff.id)} style={{ width: "40%", marginLeft: "2%" }} color="primary">Xác Nhận</Button>
                            </Row>
                        </Col>
                    </Row> :
                    <></>
                }
            </>
        )
    }

    onChange = (date) => {
        if (date) {
            this.setState({
                month: date.toDate().getMonth() + 1,
                year: date.toDate().getFullYear(),
            })
        }
    }

    onAddPayRoll = (id) => {
        var { month, year } = this.state;
        this.setState({
            checker: true
        })
        this.props.requestApiAddPayRoll({
            staffId: id,
            month, year
        })
    }

    onSelectedStaff = (staff) => {
        this.props.requestApiGetPayRollById(staff.id)
        this.setState({ selectedStaff: staff })
    }

    renderContentTable = (dataPayRoll) => {
        var elements = [];
        if (dataPayRoll && dataPayRoll.length > 0) {
            dataPayRoll.forEach(element => {
                elements.push(
                    <tr>
                        <td>{element.month}</td>
                        <td>{element.year}</td>
                        <td>{element.salary}</td>
                        <td>{element.allowance}</td>
                        <td>{element.total}</td>
                    </tr>
                )
            });
        }
        return (
            <>
                <thead>
                    <tr>
                        <th>Tháng</th>
                        <th>Năm</th>
                        <th>Mức Lương</th>
                        <th>Phụ Cấp</th>
                        <th>Tổng Lương</th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetPayRollById: (payload) => dispatch(requestApiGetPayRollById(payload)),
        requestApiAddPayRoll: (payload) => dispatch(requestApiAddPayRoll(payload)),
    }
}

const mapStateToProps = state => (
    {
        dataPayRoll: state.managerPayRollIdReducers,
        dataAddPayRoll: state.managerAddPayRollIdReducers,
    });

export default connect(mapStateToProps, mapDispatchToProps)(StaffSalary);


