import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { requestApiAggregateByTime } from './redux/actions' 
import { Row, Col, Button } from 'reactstrap';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'

const AggregateType = {
    DAY : {
        title: 'Thống kê doanh thu 7 ngày qua',
        path: 'last7day'
    },
    MONTH : {
        title: 'Thống kê doanh thu 7 tháng qua',
        path: 'last7month'
    },
    YEAR : {
        title: 'Thống kê doanh thu 7 năm qua',
        path: 'last7year'
    }
}
const DataFormater = (number) => {
    if(number > 1000000000){
      return (number/1000000000).toString() + 'B';
    }else if(number > 1000000){
      return (number/1000000).toString() + 'M';
    }else if(number > 1000){
      return (number/1000).toString() + 'K';
    }else{
      return number.toString();
    }
  }
  
 

const AggregateChart = (props) => {
    const [chartCurrent, setChartCurrent] = useState(AggregateType.DAY); 
    const dispatch = useDispatch();
    const aggregateByTime = useSelector(state => state.aggregateByTimeResponse);

    useEffect(() => {
        dispatch(requestApiAggregateByTime(chartCurrent.path));
    }, [chartCurrent])
    

    return (
        <div style={{marginTop: 25}}>
            <Row>
                <h5 style={{textAlign: 'center', width: '100%', color: 'teal'}}>{chartCurrent.title}</h5>
            </Row>

            <Row style={{padding: 10}}>
                <ResponsiveContainer  width="100%" height={300}>
                    {
                        <LineChart data={aggregateByTime}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="label" />
                            <YAxis tickFormatter={DataFormater}/>
                            <Tooltip formatter={data => data.toLocaleString()}/>
                            <Legend />
                            <Line type="monotone" dataKey="totalReceipt" name="Doanh thu" stroke="orange" />
                            {
                                chartCurrent !== AggregateType.DAY && 
                                <Line type="monotone" dataKey="totalImport" name="Nhập hàng"stroke="green" />
                            }
                            {
                                chartCurrent !== AggregateType.DAY && 
                                <Line type="monotone" dataKey="totalSalary" name="Trả lương"stroke="red" /> 
                            }
                            {
                                chartCurrent !== AggregateType.DAY && 
                                <Line type="monotone" dataKey="totalProfit" name="Lợi nhuận"stroke="teal" />
                            }
                        </LineChart>
                    }
                </ResponsiveContainer>
            </Row>

            <Row style={{marginTop: 25}}>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{backgroundColor: (chartCurrent.path === AggregateType.DAY.path)? 'seagreen': 'grey'}} 
                        onClick={() => { setChartCurrent(AggregateType.DAY)  }}>
                        7 ngày qua
                    </Button>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Button  style={{backgroundColor: (chartCurrent.path === AggregateType.MONTH.path)? 'seagreen': 'grey'}}
                        onClick={() => {setChartCurrent(AggregateType.MONTH) }}>
                        7 tháng qua
                    </Button>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Button  style={{backgroundColor: (chartCurrent.path === AggregateType.YEAR.path)? 'seagreen': 'grey'}}
                        onClick={() => { setChartCurrent(AggregateType.YEAR) }}>
                        7 năm qua
                    </Button>
                </Col>
            </Row>
        </div>    
    )
}

export default AggregateChart;