import React, { Component } from 'react';
import { Col, Row, Label, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import RisottoScrollTable from '../../components/RisottoScrollTable';
import { requestApiFoodData } from '../Employees/Staff/redux/actions';
import RisottoModal from '../../components/RisottoModal';
import { requestApiAddFood, requestApiDeleteFood } from './redux/actions';
import { isEqual } from 'lodash';

class ManageFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDialog: false,
            isShowEditDialog: false,
            imageInformation: {},
            fileUrl: null,
            selectedData: null,
            foodIds: []
        }
    }

    componentWillMount() {
        this.props.requestApiFoodData();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.props.requestApiFoodData();
            this.setState({ foodIds: [] });
        }
    }

    render() {
        var { dataFoods } = this.props;

        return (
            <>
                <Row>
                    <Col xs="9">
                        <h1 style={{ marginLeft: "30vh" }}>Quản Lý Món Ăn</h1>
                    </Col>
                    <Col xs="1">
                        <img
                            onClick={() => this.onDeleteFoods()}
                            className="icon-option delete"
                            src="https://enterpriseengineeringnetwork.org/images/delete-png-1.png" />
                    </Col>
                </Row>
                {this.renderModalImage()}
                {this.renderModalEdit()}
                {
                    dataFoods && dataFoods.length > 0 ?
                        <RisottoScrollTable
                            content={this.renderContentTable(dataFoods)}
                            customClass="food-manage" /> :
                        <></>
                }
                <h3 className="title-alight-center">Thêm Món Ăn</h3>
                <div className="wrap-add-food">
                    <Row>
                        <FormGroup style={{ width: "40%" }}>
                            <Label>Tên Món Ăn</Label>
                            <Input type="text" />
                        </FormGroup>
                        <FormGroup style={{ width: "20%" }}>
                            <Label>Giá Tiền</Label>
                            <Input type="number" />
                        </FormGroup>
                        <FormGroup style={{ width: "40%" }}>
                            <Label>Hình Ảnh</Label>
                            <Input onChange={(e) => this.onSaveFileUrl(e)} type="file" />
                        </FormGroup>
                        <FormGroup style={{ width: "20%" }}>
                            <br></br>
                            <Button onClick={() => this.onAddFood()} style={{ width: "100%" }} color="success">Thêm Món Ăn</Button>
                        </FormGroup>
                    </Row>
                </div>
            </>
        )
    }

    onSaveFileUrl = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                fileUrl: reader.result
            });
        }
    }

    onAddFood = () => {
        var { fileUrl } = this.state;
        this.props.requestApiAddFood(fileUrl)
    }

    renderContentTable = (dataFoods) => {
        var elements = [];
        dataFoods.forEach((element, index) => {
            let stt = ++index;
            elements.push(
                <tr>
                    <td>{stt}</td>
                    <td>{element.name}</td>
                    <td>{element.price}</td>
                    <td>
                        <img
                            onClick={() => this.onShowImageFood(element.name, element.image)}
                            className="icon-option image"
                            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" />
                    </td>
                    <td>
                        <Row className="row-warp-option">
                            <Input onChange={() => this.onSelectFood(element.id, index)} bsSize="sm" type="checkbox" />
                            <img onClick={() => this.onShowEditFood(element.id, dataFoods)} className="icon-option edit-food" src="https://cdn.onlinewebfonts.com/svg/img_386644.png" />
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
                        <th>Tên Món Ăn</th>
                        <th>Giá Tiền</th>
                        <th>Hình Ảnh</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </>
        )
    }

    renderModalImage = () => {
        var { imageInformation, isShowDialog } = this.state;
        if (isShowDialog) {
            var body = (
                <img className="img-food" src={imageInformation.url} />
            )
            return <RisottoModal
                isShow={isShowDialog}
                title={imageInformation.name}
                body={body}
                onHide={() => this.onShowImageFood(null, null)} />
        }
    }

    renderModalEdit = () => {
        var { isShowEditDialog, selectedData } = this.state;
        if (isShowEditDialog) {
            var body = (
                <Row>
                    <FormGroup style={{ width: "40%" }}>
                        <Label>Tên Món Ăn</Label>
                        <Input type="text" value={selectedData.name} />
                    </FormGroup>
                    <FormGroup style={{ width: "20%" }}>
                        <Label>Giá Tiền</Label>
                        <Input type="number" value={selectedData.price} />
                    </FormGroup>
                    <FormGroup style={{ width: "40%" }}>
                        <Label>Hình Ảnh</Label>
                        <img className="img-edit-food" src={selectedData.image} />
                    </FormGroup>
                    <FormGroup style={{ width: "20%" }}>
                        <br></br>
                        <Button style={{ width: "100%" }} color="success">Xác Nhận</Button>
                    </FormGroup>
                </Row>
            )
            return <RisottoModal
                isShow={isShowEditDialog}
                title="Chỉnh Sửa Thông Tin Món Ăn"
                body={body}
                onHide={() => this.onHideEditFood()} />
        }
    }

    onSelectFood = (id, index) => {
        var { foodIds } = this.state;
        var checker = foodIds.filter(x => x === id).length > 0;
        if (checker) {
            foodIds = foodIds.splice(index, 1);
        }
        else {
            foodIds.push(id);
        }
        this.setState(foodIds);
    }

    onDeleteFoods = () => {
        var { foodIds } = this.state;
        this.props.requestApiDeleteFood(foodIds);
    }

    onHideEditFood = () => {
        var { isShowEditDialog } = this.state;
        this.setState({
            isShowEditDialog: !isShowEditDialog,
        });
    }

    onShowEditFood = (id, dataFoods) => {
        var { isShowEditDialog } = this.state;
        var selectedData = dataFoods.filter(x => x.id == id)[0];
        this.setState({
            isShowEditDialog: !isShowEditDialog,
            selectedData
        });
    }

    onShowImageFood = (name, url) => {
        var { imageInformation, isShowDialog } = this.state;
        imageInformation.url = url;
        imageInformation.name = name;
        this.setState({
            isShowDialog: !isShowDialog,
            imageInformation
        })
    }
}
const mapDispatchToProps = dispatch => {
    return {
        requestApiFoodData: () => dispatch(requestApiFoodData()),
        requestApiAddFood: (payload) => dispatch(requestApiAddFood(payload)),
        requestApiDeleteFood: (payload) => dispatch(requestApiDeleteFood(payload)),
    }
}

const mapStateToProps = state => (
    {
        dataFoods: state.dataFoods,
        deleteFoodData: state.managerReducers
    });

export default connect(mapStateToProps, mapDispatchToProps)(ManageFood);
