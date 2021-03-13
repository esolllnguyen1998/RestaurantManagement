import React, { Component } from 'react';
import { Col, Row, Label, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { requestApiTableData } from '../../containers/Employees/Staff/redux/actions';
import { requestApiAddTable, requestApiDeleteTable, requestApiUpdateTable } from './redux/actions';
import { isEqual } from 'lodash';
import RisottoScrollTable from '../../components/RisottoScrollTable';

class ManageTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            capacity: 0,
            isUpdate: false,
            tableIds: [],
            selectedTable: null
        }
    }

    componentWillMount() {
        this.props.requestApiTableData();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.props.requestApiTableData();
            this.setState({
                name: "",
                capacity: 0,
                tableIds: []
            })
        }
    }

    render() {
        var { dataTables, requestApiAddTable } = this.props;
        var { name, capacity, selectedTable } = this.state;
        var selected = { ...selectedTable };
        return (
            <>
                <h1 className="title-alight-center">Quản Lý Bàn Ăn</h1>
                <Row>
                    <Col xs="6">
                        <Row style={{ marginBottom: "2%" }}>
                            <Col xs="6">
                                <h3 className="title-alight-center">Danh Sách Bàn Ăn</h3>
                            </Col>
                            <Col xs="4">
                                <Row>
                                    <img onClick={() => this.onDeleteTables()} className="icon-option delete" src="https://enterpriseengineeringnetwork.org/images/delete-png-1.png" />
                                </Row>
                            </Col>
                        </Row>
                        {dataTables && dataTables.length > 0 ?
                            < RisottoScrollTable content={this.renderTableLists(dataTables)} />
                            : <></>
                        }
                    </Col>
                    <Col xs="6">
                        <Row>
                            <h3 className="title-alight-center">Thêm Bàn Ăn</h3>
                            <FormGroup style={{ width: "50%" }}>
                                <Label>Tên bàn:</Label>
                                <Input onChange={(e) => this.handleChangeText(e, true, null)} type="text" />
                            </FormGroup>
                            <FormGroup style={{ width: "30%" }}>
                                <Label>Sức chứa:</Label>
                                <Input onChange={(e) => this.handleChangeText(e, false, null)} type="number" />
                            </FormGroup>
                            <FormGroup style={{ width: "30%", marginLeft: "53%" }}>
                                <Button onClick={() => requestApiAddTable({ name, capacity })} color="primary" style={{ width: "100%" }}>Thêm Bàn</Button>
                            </FormGroup>
                        </Row>
                        {selectedTable ?
                            <Row>
                                <h3 className="title-alight-center">Chỉnh Sửa Bàn Ăn</h3>
                                <FormGroup style={{ width: "50%" }}>
                                    <Label>Tên bàn:</Label>
                                    <Input onChange={(e) => this.handleChangeText(e, true, selectedTable)} type="text" value={selectedTable.name} />
                                </FormGroup>
                                <FormGroup style={{ width: "30%" }}>
                                    <Label>Sức chứa:</Label>
                                    <Input onChange={(e) => this.handleChangeText(e, false, selectedTable)} type="number" value={selectedTable.capacity} />
                                </FormGroup>
                                <FormGroup style={{ width: "30%", marginLeft: "53%" }}>
                                    <Button onClick={() => this.onUpdateTable(selectedTable)} color="success" style={{ width: "100%" }}>Chỉnh Sửa</Button>
                                </FormGroup>
                            </Row> :
                            <></>
                        }
                    </Col>
                </Row>
            </>
        )
    }

    onUpdateTable = (selectedTable) => {
        this.props.requestApiUpdateTable(selectedTable);
    }

    handleChangeText = (event, type, selectedTable) => {
        if (selectedTable) {
            if (type) {
                selectedTable.name = event.target.value;
            }
            else {
                selectedTable.capacity = event.target.value;
            }
            this.setState(selectedTable);
            return;
        }
        if (type) {
            this.setState({
                name: event.target.value
            })
        }
        else {
            this.setState({
                capacity: event.target.value
            })
        }
    }

    onDeleteTables = () => {
        var { tableIds } = this.state;
        this.props.requestApiDeleteTable(tableIds);
    }

    onSelectTabe = (id, index) => {
        var { tableIds } = this.state;
        var checker = tableIds.filter(x => x === id).length > 0;
        if (checker) {
            tableIds = tableIds.splice(index, 1);
        }
        else {
            tableIds.push(id);
        }
        this.setState(tableIds);
    }

    onEditMode = (selectedTable) => {
        this.setState({
            selectedTable
        });
    }

    renderTableLists = (dataTables) => {
        var elements = [];
        dataTables.forEach((element, index) => {
            let id = element.id;
            let stt = ++index;
            elements.push(
                <tr>
                    <td>{stt}</td>
                    <td>{element.name}</td>
                    <td>{element.capacity}</td>
                    <td>
                        <Row className="row-warp-option">
                            <Input onChange={() => this.onSelectTabe(id, index)} bsSize="sm" type="checkbox" />
                            <img onClick={() => this.onEditMode({ ...element })} className="icon-option edit" src="https://cdn.onlinewebfonts.com/svg/img_386644.png" />
                        </Row>
                    </td>
                </tr>
            )
        });
        return (
            <>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên Bàn</th>
                        <th>Sức Chứa</th>
                        <th>Thao Tác</th>
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
        requestApiTableData: () => dispatch(requestApiTableData()),
        requestApiAddTable: (payload) => dispatch(requestApiAddTable(payload)),
        requestApiDeleteTable: (payload) => dispatch(requestApiDeleteTable(payload)),
        requestApiUpdateTable: (payload) => dispatch(requestApiUpdateTable(payload)),
    }
}

const mapStateToProps = state => (
    {
        dataTables: state.dataTables,
        updateAccountData: state.dataTables,
        addTableData: state.managerReducers,
        responseDelete: state.managerReducers,
        updateTableData: state.managerReducers,
    });

export default connect(mapStateToProps, mapDispatchToProps)(ManageTable);
