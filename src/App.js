import React, { useState } from 'react';
import './App.css';
import MUIDataTable from 'mui-datatables';
import { CustomModal } from './CustomModal';
import { Form } from './Form';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { CustomDialog } from './CustomDialog';
import { useBoolean } from '@fluentui/react-hooks';

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");
// const deleteIcon = { iconName: 'Delete' };

const defaultEmployee = { FirstName: '', LastName: '', Gender: '', Salary: null, Email: '', Counrty: '' };

function App() {


  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [dObj, setDobj] = useState({ title: '', subText: '' });

  const custModal = (header, btnText, rowIndex, eToBeEdited = defaultEmployee) => {
    const props = {
      header,
      btnText,
      modalBody: <Form
        setEmpCallBack={(emp) => {
          debugger;
          employees[rowIndex] = { ...employees[rowIndex], ...emp }
          setEmployees([...employees]);
        }}
        empToBeEdited={eToBeEdited}
      />
    }

    return <CustomModal {...props} />
  }
  const options = {
    selectableRows: 'none',
    customToolbar: () => custModal('Add a new emplooyee', 'Add Employee')
  };


  const columns = [
    { name: "FirstName", label: "First Name", options: { filter: true, sort: true } },
    { name: "LastName", label: "Last Name", options: { filter: true, sort: true } },
    { name: "Gender", label: "Gender", options: { filter: true, sort: false } },
    { name: "Salary", label: "Salary", options: { filter: true, sort: true } },
    { name: "Email", label: "Email", options: { filter: true, sort: false } },
    { name: "Counrty", label: "Country", options: { filter: true, sort: false } },

    {
      name: "ID", label: "Actions", options: {
        sort: false,
        filter: false,
        customBodyRender: (value, { rowIndex }) => <div>
          {custModal('Edit emplooyee details', 'Edit', rowIndex, employees[rowIndex])}
          <span>
            <DefaultButton
              title="Delete"
              ariaLabel="Delete"
              onClick={() => deleteItem('/api/deleteEmployee', value, rowIndex)}
              text='Delete'
              style={{ padding: '0px 5px', minWidth: '30px', marginLeft: '10px' }}
            />
          </span>
        </div>
      }
    },
  ];


  const deleteItem = (endpoint, ID, rowIndex) => {
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({ ID })
    };

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(e => {
        const emp = employees;
        emp.splice(rowIndex, 1);
        setEmployees([...emp]);
        showDialog("Message", "Item deleted successfully")
      })
      .catch(error => {
        showDialog("Error Message", `Error occurred while deleting item- ${JSON.stringify(error)}`);
        console.error('error', error);
      });
  }

  const showDialog = (title, subText) => {
    setDobj({ title, subText });
    toggleHideDialog();
  }

  const fetchData = (url) => {
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(e => {
        if (e?.response.length > 0) {
          setEmployees(e.response);
        }
        setIsLoading(false);
      })
      .catch(error => console.error('error', error));
  }

  if (isLoading) {
    fetchData('/api/employees');
  }

  return (
    <div className="App">
      <MUIDataTable
        title="Employee List"
        data={employees}
        columns={columns}
        options={options}
      />
      <CustomDialog
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        title={dObj.title}
        subText={dObj.subText}
        closeBtnHandler={toggleHideDialog}
      />
    </div>
  );
}



export default App;