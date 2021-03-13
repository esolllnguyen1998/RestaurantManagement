import React, {useState} from 'react'
import StaffAssigned from './staff-assigned'
import StaffList from './staff-list'



const Assigned = (props) => {

    const [selected, setSelected] = useState();

    const onSelectedStaff = (staff) => {
        setSelected(staff);
    }

    return (
        <>
            <StaffList onSelected={onSelectedStaff}/>
            <StaffAssigned selected={selected} />
        </>
    )
}


export default Assigned;