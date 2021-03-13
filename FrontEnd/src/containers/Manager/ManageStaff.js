import React, { Component } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../assert/styles/manager.scss';
import moment from 'moment';
import { POSITIONS } from './constants';
import { isEqual, cloneDeep } from 'lodash';
import RisottoModal from '../../components/RisottoModal';
import {
    requestApiUpdateStaff,
    requestApiAddStaff, requestApiDeleteStaff,
    requestApiUpdateAccount, requestApiGetAllStaff
} from './redux/actions';
import { connect } from 'react-redux';

class ManageStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: null,
            newDataStaff: {
                position: POSITIONS[0].eng
            },
            isDisable: true,
            isAccountDisable: true,
            isShowModal: false,
            isShowConfirmModal: false,
            password: "",
            checker: false,
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllStaff();
    }

    componentDidUpdate(prevProps) {
        var { checker, selectedStaff } = this.state;
        var { dataStaffs } = this.props;

        if (checker) {
            this.props.requestApiGetAllStaff()
            if (!isEqual(prevProps.dataStaffs, dataStaffs)) {
                this.setState({
                    checker: false
                })
            }
        }

        if (dataStaffs && dataStaffs.length > 0 && selectedStaff == null) {
            selectedStaff = { ...dataStaffs[0] };
            this.setState({ selectedStaff });
        }
    }

    render() {
        var { dataStaffs } = this.props;
        var { isShowModal, isShowConfirmModal, selectedStaff } = this.state;
        var cloneDataStaffs = cloneDeep(dataStaffs);

        return (
            <>
                <RisottoModal
                    isShow={isShowModal}
                    title="Thêm Nhân viên"
                    onHide={() => this.onShowOrCloseModalAddStaff()}
                    body={this.renderAddStaffBodymodal()}
                />
                <RisottoModal
                    isShow={isShowConfirmModal}
                    title="Bạn có chắc là mún xóa hông ?"
                    onHide={() => this.onShowModalConfrim()}
                    body={this.renderBodyDeleteModal()}
                    size="xs"
                />
                < Row >
                    <Col xs="6">
                        <Row>
                            <Col xs="6">
                                <h3>Danh sách nhân viên</h3>
                            </Col>
                            <Col style={{ textAlign: "right" }} xs="6">
                                <Button onClick={() => this.onShowOrCloseModalAddStaff()} color="primary">Thêm Nhân Viên</Button>
                            </Col>
                        </Row>
                        <div className="wrap-grid manage-staff">
                            <Row>
                                {cloneDataStaffs && selectedStaff && cloneDataStaffs.length > 0 ?
                                    this.renderStaffsInformation(cloneDataStaffs, selectedStaff) :
                                    <></>
                                }
                            </Row>
                        </div>
                    </Col>
                    <Col xs="6">
                        {
                            selectedStaff && selectedStaff.account ?
                                this.renderStaffDetailInformation(selectedStaff) :
                                <></>
                        }
                    </Col>
                </Row>
            </>
        )
    }

    renderStaffsInformation = (dataStaffs, selectedStaff) => {
        var elements = [];
        for (var item of dataStaffs) {
            let dataStaff = item;
            if (selectedStaff.id == dataStaff.id) {
                elements.push(
                    <div className="card staff-infor active">
                        {this.renderCardBody(item)}
                    </div>
                )
                continue;
            }
            elements.push(
                <div onClick={() => this.onSelectStaff(dataStaff)} className="card staff-infor">
                    {this.renderCardBody(item)}
                </div>
            )
        }
        return elements;
    }

    onShowOrCloseModalAddStaff = () => {
        var { isShowModal } = this.state;
        this.setState({ isShowModal: !isShowModal });
    }

    onAddNewStaff = () => {
        var { newDataStaff } = this.state;
        var { requestApiAddStaff } = this.props;
        this.setState({
            newDataStaff: {
                position: POSITIONS[0].eng
            },
            checker: true,
            isShowModal: false
        });
        requestApiAddStaff({
            name: newDataStaff.name,
            phone: newDataStaff.phone,
            salary: newDataStaff.salary,
            allowance: newDataStaff.allowance,
            position: newDataStaff.position
        });
    }

    renderAddStaffBodymodal = () => {
        var { newDataStaff } = this.state;

        return (
            <>
                <Row style={{ width: "125%" }}>
                    <FormGroup className="form-group-staff">
                        <Label>Họ và tên: </Label>
                        <Input required onChange={(e) => this.handleChangeAdd(e, 1)} value={newDataStaff.name} />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Số điện thoại: </Label>
                        <Input required onChange={(e) => this.handleChangeAdd(e, 2)} value={newDataStaff.phone} />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Chức vụ: </Label>
                        <Input onChange={(e) => this.handleChangeAdd(e, 3)} type="select">
                            {this.renderSelectRole(POSITIONS[0])}
                        </Input>
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Ngày vào làm: </Label>
                        <Input readOnly type="date" value={moment().format('YYYY-MM-DD')} />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Mức lương: </Label>
                        <Input required onChange={(e) => this.handleChangeAdd(e, 4)} value={newDataStaff.salary} type="number" />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Phụ Cấp: </Label>
                        <Input required onChange={(e) => this.handleChangeAdd(e, 5)} value={newDataStaff.allowance} type="number" />
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup className="form-group-staff btn-add-staff">
                        <Button onClick={() => this.onAddNewStaff()} className="btn-add-saff" color="success">Thêm Mới</Button>
                    </FormGroup>
                </Row>
            </>
        )
    }

    handleChangeAdd(event, type) {
        var { newDataStaff } = this.state;
        switch (type) {
            case 1:
                newDataStaff.name = event.target.value;
                break;
            case 2:
                newDataStaff.phone = event.target.value;
                break;
            case 3:
                newDataStaff.position = event.target.value;
                break;
            case 4:
                newDataStaff.salary = event.target.value;
                break;
            case 5:
                newDataStaff.allowance = event.target.value;
                break;
        }
        this.setState(newDataStaff)
    }

    renderStaffDetailInformation = (selectedStaff) => {
        var { isDisable, isAccountDisable } = this.state;
        return (
            <>
                <h2>Thông tin chi tiết nhân viên</h2>
                <Row>
                    <FormGroup className="form-group-staff">
                        <Label>Họ và tên: </Label>
                        <Input onChange={(e) => this.handleChange(e, 1)} type="text" disabled={isDisable} value={selectedStaff.name} />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Số điện thoại: </Label>
                        <Input onChange={(e) => this.handleChange(e, 2)} disabled={isDisable} value={selectedStaff.phone} />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Chức vụ: </Label>
                        <Input onChange={(e) => this.handleChange(e, 3)} type="select" disabled={isDisable} >
                            {this.renderSelectRole(selectedStaff.position)}
                        </Input>
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Ngày vào làm: </Label>
                        <Input disabled placeholder={moment(selectedStaff.joinDate).format("DD-MM-YYYY HH:mm:ss")} />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Mức lương: </Label>
                        <Input type="number" onChange={(e) => this.handleChange(e, 4)} disabled={isDisable} value={selectedStaff.salary} />
                    </FormGroup>
                    <FormGroup className="form-group-staff">
                        <Label>Phụ Cấp: </Label>
                        <Input type="number" onChange={(e) => this.handleChange(e, 5)} disabled={isDisable} value={selectedStaff.allowance} />
                    </FormGroup>
                </Row>
                <Row>
                    {
                        !isDisable ?
                            <FormGroup className="form-group-staff">
                                <Button onClick={() => this.onUpdateStaffInfo(true)} className="button-edit-delete" color="success">Lưu Chỉnh Sửa</Button>
                            </FormGroup> :
                            <FormGroup className="form-group-staff">
                                <Button onClick={() => this.onUpdateStaffInfo(false)} className="button-edit-delete" color="success">Chỉnh Sửa Nhân Viên</Button>
                            </FormGroup>
                    }
                    <FormGroup className="form-group-staff">
                        <Button onClick={() => this.onShowModalConfrim()} className="button-edit-delete" color="danger">Xóa Nhân Viên</Button>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup className="form-group-staff">
                        <Label>Tài khoản đăng nhập: </Label>
                        <Input onChange={(e) => this.handleChange(e, 6)} disabled={isAccountDisable} value={selectedStaff.account.username} />
                    </FormGroup>
                    {!isAccountDisable ?
                        <FormGroup className="form-group-staff">
                            <Label>Mật khẩu: </Label>
                            <Input onChange={(e) => this.handleChange(e, 7)} type="password" />
                        </FormGroup> :
                        <></>
                    }
                </Row>
                <Row>
                    {
                        isAccountDisable ?
                            <FormGroup className="form-group-staff">
                                <Button onClick={() => this.onEditAcount(false, false)} className="button-edit-delete" color="success">Chỉnh Sửa Tài Khoản</Button>
                            </FormGroup> :
                            <>
                                <FormGroup className="form-group-staff">
                                    <Button onClick={() => this.onEditAcount(true, true)} className="button-edit-delete" color="success">Xác Nhận</Button>
                                </FormGroup>
                                <FormGroup className="form-group-staff">
                                    <Button onClick={() => this.onEditAcount(true, false)} className="button-edit-delete" color="danger">Hủy Bỏ</Button>
                                </FormGroup>
                            </>
                    }
                </Row>
            </>
        )
    }

    onEditAcount = (isDisable, isEdit) => {
        if (isEdit) {
            var { requestApiUpdateAccount } = this.props;
            var { selectedStaff, password } = this.state;

            requestApiUpdateAccount(
                {
                    id: selectedStaff.account.id,
                    username: selectedStaff.account.username,
                    password
                }
            )
        }
        this.setState({
            isAccountDisable: isDisable,
            checker: true,
        })
    }

    onShowModalConfrim = () => {
        var { isShowConfirmModal } = this.state;
        this.setState({
            isShowConfirmModal: !isShowConfirmModal
        })
    }

    renderBodyDeleteModal = () => {
        var { selectedStaff } = this.state;
        return (
            <Row>
                <FormGroup className="form-group-staff">
                    <Button onClick={() => this.onDeleteStaff(selectedStaff.id)} className="button-confirm-delete" color="success">Đồng Ý</Button>
                </FormGroup>
                <FormGroup className="form-group-staff">
                    <Button onClick={() => this.onShowModalConfrim()} className="button-confirm-delete" color="danger">Từ Chối</Button>
                </FormGroup>
            </Row>

        )
    }

    onDeleteStaff = (id) => {
        this.props.requestApiDeleteStaff(id);
        this.setState({
            isShowConfirmModal: false,
            checker: true,
        })
    }

    handleChange(event, type) {
        var { selectedStaff, password } = this.state;

        switch (type) {
            case 1:
                selectedStaff.name = event.target.value;
                break;
            case 2:
                selectedStaff.phone = event.target.value;
                break;
            case 3:
                selectedStaff.position = event.target.value;
                break;
            case 4:
                selectedStaff.salary = event.target.value;
                break;
            case 5:
                selectedStaff.allowance = event.target.value;
                break;
            case 6:
                selectedStaff.account.username = event.target.value;
                break;
            case 7:
                password = event.target.value;
                break;
        }
        this.setState({ selectedStaff, password })
    }

    renderSelectRole = (position) => {
        var options = [];
        for (let item of POSITIONS) {
            if (position == item.eng) {
                options.push(
                    <option selected value={item.eng}>{item.viet}</option>
                )
            }
            options.push(
                <option value={item.eng}>{item.viet}</option>
            )
        }
        return options;
    }

    onUpdateStaffInfo = (isUpdate) => {
        var { requestApiUpdateStaff } = this.props;
        var { isDisable, selectedStaff } = this.state;
        this.setState({
            isDisable: !isDisable,
        })

        if (isUpdate) {
            this.setState({ checker: true })
            requestApiUpdateStaff(selectedStaff);
        }
    }

    renderCardBody = (item) => {
        return (
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.position}</h6>
                <div className="card-text">Lương: {item.salary}</div>
                <div className="card-text">SĐT: {item.phone}</div>
            </div>
        )
    }

    onSelectStaff = (dataStaff) => {
        this.setState(
            {
                selectedStaff: dataStaff,
                isDisable: true
            }
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllStaff: () => dispatch(requestApiGetAllStaff()),
        requestApiUpdateStaff: (payload) => dispatch(requestApiUpdateStaff(payload)),
        requestApiAddStaff: (payload) => dispatch(requestApiAddStaff(payload)),
        requestApiDeleteStaff: (payload) => dispatch(requestApiDeleteStaff(payload)),
        requestApiUpdateAccount: (payload) => dispatch(requestApiUpdateAccount(payload)),
    }
}

const mapStateToProps = state => (
    {
        dataUpdateStaff: state.managerReducers,
        managerReducers: state.managerReducers,
        deleteMessage: state.managerReducers,
        updateAccountData: state.managerReducers,
        dataStaffs: state.managerAllStaffReducers,
    });

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
