import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestGetAllStaff } from './redux/actions'

const StaffItem = ({ staff, onClick, selected }) => {

    return (
        <div onClick={() => selected != staff.id && onClick(staff)}
            style={{
                padding: 5, border: '1px solid #000', fontSize: 13,
                margin: 5, cursor: 'pointer',
                backgroundColor: selected == staff.id ? 'rgb(241, 112, 112)' : '#fff'
            }}>
            <div>{staff.name}</div>
            <div>{staff.phone}</div>
            <div>{staff.position}</div>
        </div>
    )
}



const StaffList = ({ onSelected }) => {
    const dispatch = useDispatch();
    const staffList = useSelector(state => state.listStaffResponse);
    const [selected, setSelected] = useState();

    useEffect(() => {
        dispatch(requestGetAllStaff());
    }, [])

    const onSelectStaff = (staff) => {
        onSelected(staff);
        setSelected(staff.id);
    }


    return (
        <div>
            <h2 style={{ textAlign: "left" }}>Danh sách nhân viên</h2>
            <div style={{
                height: 200, border: '1px solid #000', overflowY: 'auto',
                display: 'grid', gridTemplateColumns: 'auto auto auto auto auto',
                paddingBottom: '0%'
            }}>
                {
                    staffList.map(staff =>
                        <StaffItem key={staff.id}
                            staff={staff}
                            onClick={onSelectStaff}
                            selected={selected} />)
                }
            </div>
        </div>
    )
}

export default StaffList;
