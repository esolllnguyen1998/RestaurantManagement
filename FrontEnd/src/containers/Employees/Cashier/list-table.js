import React, { useEffect } from 'react';
import { requestApiAllTable } from './redux/actions';
import { useSelector, useDispatch} from 'react-redux';
import RisottoCard from '../../../components/RisottoCard'; 

const imageTableURL = "https://i0.wp.com/s1.uphinh.org/2020/05/17/15896858521709058.png"; 

const ListTable = ({onClick, selected}) => { 
   const dispatch = useDispatch();
   const tableListResponse = useSelector(state => state.tableListResponse);

    useEffect(() => {
        dispatch(requestApiAllTable());
    }, [selected])
 

    return (
        <div style={{height: '100%', overflowY: 'auto', padding: 10, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
            { 
                tableListResponse.sort((a,b) => {
                    a = a.name.split(" ").pop();
                    b = b.name.split(" ").pop();
                    return new Number(a) - new Number(b);
                }).map(table => 
                    <RisottoCard 
                        key={table.id}
                        onClick={() => onClick(table.id)}
                        srcImg={imageTableURL}
                        bodyCard={ table.name }
                        status={ table.status }
                    />)
            }
        </div>
    )
}


export default ListTable;