import React from 'react';

function Table() {
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Job</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John</td>
                <td>20</td>
                <td>Programmer</td>
            </tr>
            <tr>
                <td>Jane</td>

                <td>30</td>
                <td>Designer</td>
            </tr>
            <tr>
                <td>Bob</td>
                <td>40</td>
                <td>Manager</td>
            </tr>
        </tbody>
    </table>
    </div>
    );
}

export default Table;