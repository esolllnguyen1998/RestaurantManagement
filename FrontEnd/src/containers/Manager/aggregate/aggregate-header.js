import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { requestApiAggregateAllTime } from './redux/actions'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const AggregateHeader = (props) => {

    const dispatch = useDispatch();
    const aggregateAllTime = useSelector(state => state.aggregateAllTimeResponse);

    useEffect(() => {
        dispatch(requestApiAggregateAllTime());
    }, []) 

    return (
        <Row style={{fontSize: 13}}>
            <Col style={{display: 'flex', justifyContent:'center', color: 'white', fontWeight: 'bold'}}>
                <Card> 
                    <CardBody style={{backgroundColor: 'orange', padding: '5px 15px', textAlign: 'center', border: '1px solid #000000'}}>
                        <CardTitle>Tổng doanh thu</CardTitle>
                        <CardSubtitle>{aggregateAllTime.totalReceipt?.toLocaleString()}</CardSubtitle> 
                    </CardBody>
                </Card>
            </Col>
            <Col style={{display: 'flex', justifyContent:'center', color: 'white', fontWeight: 'bold'}}>
                <Card> 
                    <CardBody style={{ backgroundColor: 'green', padding: '5px 15px', textAlign: 'center', border: '1px solid #000000'}}>
                        <CardTitle>Tổng nhập hàng</CardTitle>
                        <CardSubtitle>{aggregateAllTime.totalImport?.toLocaleString()}</CardSubtitle> 
                    </CardBody>
                </Card>
            </Col>
            <Col  style={{display: 'flex', justifyContent:'center',color: 'white', fontWeight: 'bold'}}>
                <Card> 
                    <CardBody style={{backgroundColor: 'red', padding: '5px 15px', textAlign: 'center', border: '1px solid #000000'}}>
                        <CardTitle>Tổng trả lương</CardTitle>
                        <CardSubtitle>{aggregateAllTime.totalSalary?.toLocaleString()}</CardSubtitle> 
                    </CardBody>
                </Card>
            </Col>
            <Col style={{display: 'flex', justifyContent:'center', color: 'white', fontWeight: 'bold'}}>
                <Card> 
                    <CardBody style={{backgroundColor: 'teal', padding: '5px 15px', textAlign: 'center', border: '1px solid #000000'}}>
                        <CardTitle>Tổng lợi nhuận</CardTitle>
                        <CardSubtitle>{aggregateAllTime.totalProfit?.toLocaleString()}</CardSubtitle>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default AggregateHeader;