import React, { Component } from 'react';
import '../../App.css';
import { Navbar, Col } from 'reactstrap';
import '../../assert/styles/manager.scss';
import LeftMenu from '../../components/LeftMenu'
import ManageStaff from './ManageStaff';
import ManageTable from './ManageTable';
import ManageFood from './ManageFood';
import ManageOrder from './ManageOrder';
import ManageReceipt from './ManageReceipt';
import ManageImportBill from './ManageImportBill';
import StaffSalary from './StaffSalary';
import Aggregate from './aggregate/aggregate';
import Assigned from './assigned/assigned';

class ManagerHomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="risotto-container">
        <div className="form-create-bill">
          <Navbar color="light" expand="md">
            <Col>
              <h3 className="text-success" color="black">Quản Lý: {sessionStorage.getItem("name")}</h3>
            </Col>
          </Navbar>
          <LeftMenu
            items={this.getLeftItems()}
          />
        </div>
      </div >
    );
  }

  getLeftItems = () => {
    return [
      {
        name: "Thống Kê Doanh Thu",
        component: <Aggregate />
      },
      {
        name: "Quản lý nhân viên",
        component: <ManageStaff />
      },
      {
        name: "Quản lý bàn ăn",
        component: <ManageTable />
      },
      {
        name: "Quản lý món ăn",
        component: <ManageFood />
      },
      {
        name: "Quản lý phiếu nhập",
        component: <ManageImportBill />
      },
      {
        name: "Quản lý đơn hàng",
        component: <ManageOrder />
      },
      {
        name: "Quản lý hóa đơn",
        component: <ManageReceipt />
      },
      {
        name: "Phân công ca làm",
        component: <Assigned />
      },
      {
        name: "Bảng lương nhân viên",
        component: <StaffSalary />
      },
    ];
  }
}

export default ManagerHomePage;
