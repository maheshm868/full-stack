import { DefaultButton, Dropdown } from "@fluentui/react";
import React, { useState } from "react";
import { CustomDialog } from "./CustomDialog";
import { useBoolean } from "@fluentui/react-hooks";

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

const defaultEmployee = { FirstName: '', LastName: '', Gender: '', Salary: 0, Email: '', Counrty: '' };

export const Form = (props) => {

    const [emp, setEmp] = useState(props.empToBeEdited);
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
    const [dObj, setDobj] = useState({ title: '', subText: '' });

    const setInputFieldValues = (e) => {

        const { name, value } = e.target;
        const newData = {
            ...emp,
            [name]: name?.toLowerCase() === "salary" ? parseInt(value) : value
        }
        setEmp(newData);
    }

    const postData = (endpoint) => {
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(emp)
        };

        fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(e => {
                props.setEmpCallBack(emp);
                showDialog('Message', 'Successfully saved item');
                setEmp(defaultEmployee);
            })
            .catch(error => {
                console.error('error', error)
            });
    }

    const showDialog = (title, subText) => {
        setDobj({ title, subText });
        toggleHideDialog();
    }

    const closeModal = () => {
        const btn = document.getElementById("closeModal");
        btn.click();
    }

    const closeDialogAndModal = () => {
        toggleHideDialog();
        closeModal();
    }

    return <div className='formContainer'>
        <CustomDialog
            hideDialog={hideDialog}
            toggleHideDialog={toggleHideDialog}
            title={dObj.title}
            subText={dObj.subText}
            closeBtnHandler={closeDialogAndModal}
        />
        <div>
            <label htmlFor="FirstName">First Name</label>
            <input type="text" placeholder="First Name" name="FirstName" onChange={setInputFieldValues} value={emp?.FirstName ? emp.FirstName : ''} />
        </div>

        <div>
            <label htmlFor="LastName">Last Name</label>
            <input type="text" placeholder="Last Name" name="LastName" onChange={setInputFieldValues} value={emp?.LastName ? emp.LastName : ''} />
        </div>

        <div>
            <label htmlFor="Gender" onChange={(e, v) => console.log(e, v)} onSelect={(e, v) => console.log(e, v)}>Gender</label>
            <Dropdown
                onChange={(_, value) => setEmp({ ...emp, Gender: value.key })}
                options={[
                    { key: 'Female', text: "Female" },
                    { key: 'Male', text: 'Male' },
                    { key: 'Other', text: 'Other' }
                ]}
                selectedKey={emp?.Gender ? emp?.Gender : ''}
                placeholder="Select Gender"
            />
        </div>

        <div>
            <label htmlFor="Email">Email</label>
            <input type="text" placeholder="Email" name="Email" onChange={setInputFieldValues} value={emp?.Email ? emp.Email : ''} />
        </div>

        <div>
            <label htmlFor="Salary">Salary</label>
            <input type="number" placeholder="Salary" name="Salary" onChange={setInputFieldValues} value={emp?.Salary ? emp.Salary : ''} />
        </div>

        <div>
            <label htmlFor="Counrty">Country</label>
            <Dropdown
                onChange={(_, value) => setEmp({ ...emp, Counrty: value.key })}
                options={['Argentina', 'Brazil', 'Cuba', 'Egypt', 'France', 'Germany', 'Hong Kong', 'India', 'Japan', 'Lebanon', 'Maldives', 'Namibia'].map(x => { return { key: x, text: x } })}
                selectedKey={emp?.Counrty ? emp?.Counrty : ''}
                placeholder="Select Country"
            />
        </div>

        <br />
        <div className='btnContainer'>
            <DefaultButton onClick={closeModal} text="Cancel" />
            <DefaultButton onClick={() => postData('/api/employee')} text="Save" />
        </div>
    </div>
}