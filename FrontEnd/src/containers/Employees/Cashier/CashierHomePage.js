import React, {useState} from 'react';
import { Navbar, Col, Row } from 'reactstrap';
import ListTable from './list-table'
import BillTable from './bill-table';

const CashierHomePage = (props) => {
    const [selectedTable, setSelectedTable] = useState(undefined);

    const onClickTable = (tableId) => {
        setSelectedTable(tableId);
    }
    const onPaymentTable = (tableId) => {
        setSelectedTable(null);
    }

    
    return (
        <div className="risotto-container">
            <div className="form-create-bill">
                <Navbar color="light" expand="md">
                    <h3 className="text-success" color="black">Thu Ngân: {sessionStorage.getItem("name")}</h3> 
                </Navbar>

                <Row style={{height: 'calc(100% - 57px)'}}>
                    <Col xs="7" style={{height: '100%', position: 'relative'}}>
                        <ListTable onClick={onClickTable} selected={selectedTable}/>
                    </Col>
                    <Col xs="5">
                        <BillTable tableId={selectedTable} onPayment={onPaymentTable}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CashierHomePage;