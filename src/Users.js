import React, { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';

export default function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('online');
  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    fetch(url).then((response) => {
      response.json().then((result) => {
        console.warn("result", result);
        setData(result);
        localStorage.setItem("users", JSON.stringify(result));
      })
    }).catch(err => {
      let collection = localStorage.getItem("users");
      setData(JSON.parse(collection));
      setMode('offline');
      // alert('Cache block.');
    })
  }, [])
  return (
    <div>
      <div>
        {
          mode === "offline" ?
          <div className='alert alert-warning'>You are in offline mode or some issue with internet connection.</div> :
          null
        }
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}