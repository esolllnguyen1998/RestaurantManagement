import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { requestAssignedToStaff, requestGetAllAssignedStaff, requestRemoveAssignedToStaff } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux'


const dayOfWeek = [
    { key: 'MONDAY', value: 'Thứ 2' },
    { key: 'TUESDAY', value: 'Thứ 3' },
    { key: 'WEDNESDAY', value: 'Thứ 4' },
    { key: 'THURSDAY', value: 'Thứ 5' },
    { key: 'FRIDAY', value: 'Thứ 6' },
    { key: 'SATURDAY', value: 'Thứ 7' },
    { key: 'SUNDAY', value: 'Chủ Nhật' }
]
const session = [
    { key: 'MORNING', value: 'Ca Sáng' },
    { key: 'AFTERNOON', value: 'Ca Chiều' },
    { key: 'EVENING', value: 'Ca Tối' }
]

const check = (list, dow, s) => {
    for (const item of list) {
        if (item.session == s && item.dayOfWeek == dow)
            return item.id;
    }
    return null;
}

const AssignItem = ({ staffId, dayOfWeek, session, assigned }) => {
    const dispatch = useDispatch();
    const [clickable, setClickable] = useState(true);
    const [assignedId, setAssignedId] = useState(assigned);

    const assignedStaff = useSelector(state => state.assignedToStaffResponse);
    const deleteAssigned = useSelector(state => state.deleteAssignedToStaffResponse);

    useEffect(() => {
        setAssignedId(assigned);
    }, [assigned])

    useEffect(() => {
        if (assignedStaff.done && assignedStaff.dayOfWeek == dayOfWeek && assignedStaff.session == session) {
            setClickable(true);
            setAssignedId(assignedStaff.id);
        }
    }, [assignedStaff])
    useEffect(() => {
        if (deleteAssigned.done && deleteAssigned.dayOfWeek == dayOfWeek && deleteAssigned.session == session) {
            setClickable(true);
            setAssignedId(null);
        }
    }, [deleteAssigned])


    const onToggleAssigned = () => {
        if (!clickable) return;
        setClickable(false);

        if (assignedId) dispatch(requestRemoveAssignedToStaff({ assignedId, dayOfWeek, session, staffId }));
        else dispatch(requestAssignedToStaff({ staffId, dayOfWeek, session }));
    }

    return (
        <td onClick={onToggleAssigned}
            style={{ textAlign: 'center', cursor: 'pointer', backgroundColor: assignedId ? 'green' : '' }}>
            {assignedId ? '-' : '+'}
        </td>
    )
}


const StaffAssigned = ({ selected }) => {
    const dispatch = useDispatch();
    const listAssigned = useSelector(state => state.listAssignedOfStaffResponse);

    useEffect(() => {
        selected && dispatch(requestGetAllAssignedStaff(selected.id));
    }, [selected])

    if (!selected) {
        return (<></>);
    }
    return (
        <div style={{ marginTop: 10 }}>
            <h5>Bảng phân công ca làm {selected.name}</h5>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            {
                                dayOfWeek.map(dow => <th key={dow.key} style={{ textAlign: 'center' }}> {dow.value} </th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            session.map(session =>
                                <tr key={session.key}>
                                    <th>{session.value}</th>
                                    {
                                        dayOfWeek.map(dow =>
                                            <AssignItem key={dow.key + session.key}
                                                staffId={selected.id}
                                                dayOfWeek={dow.key}
                                                session={session.key}
                                                assigned={check(listAssigned, dow.key, session.key)}
                                            />)
                                    }
                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default StaffAssigned;
