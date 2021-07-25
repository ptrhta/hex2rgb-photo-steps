import React, { useState } from 'react';
import uuid from 'react-uuid'
import Table from '../Table/Table';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './steps.css';

export default function Steps() {

    const [ currentData, setCurrentData ] = useState({
        date: '',
        km: '',
      }
    );
    const [tableData, setTableData ] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editModeData, setEditModeData] = useState({});

    const formatDate = date => {
      return moment(date).format('DD.MM.YYYY')
    }

    const handleChange = e => {
        const { name, value } = e.target;

        setCurrentData(prevData => {
          return {
            ...prevData,
            [name]: value,
          }
        })
    }

    const handleChangeDate = date => {
        const newDate = date ? date: currentData.date;

        setCurrentData(prevData => {
          return {
            ...prevData,
            'date': newDate
          }
        })
    }

    const handleDelete = (e, id) => {
      setTableData(prevData => {
        return prevData.filter(row => row.id !== id);
      })
    }

    const handleEdit = (e, id) => {
      e.preventDefault();
      if (!editMode) {
        setEditModeData(tableData.filter(row => row.id === id)[0]);
      }
      setEditMode(prevEditMode => !prevEditMode);
    }

    const handleSubmit = (e, currentData) => {
        e.preventDefault();

        setTableData(data => {
          let isNewDate = true;
            let newDate = data.map(step => {
                if (formatDate(step.date) === formatDate(currentData.date)) {
                  isNewDate = false;
                  if (editMode) {
                    setEditMode(prevEditMode => !prevEditMode);
                    return {
                        ...step, date: currentData.date, km: +currentData.km
                      }
                  }
                    return {
                        ...step, id: uuid(), date: currentData.date, km: +currentData.km + +step.km
                    }
                } else {
                  return {
                    ...step
                  }
                }
            })

            if (!isNewDate) return newDate

            return [...data, {...currentData, id: uuid()}]
        })
      };

    return(
        <div className="steps">
            <form className="steps-form" onSubmit={(e) => handleSubmit(e, currentData)}>
               <div className="col">
                  <label htmlFor='date'>Дата (ДД.ММ.ГГГГ)</label>
                  <DatePicker 
                    dateFormat="dd.MM.yyyy" 
                    selected={currentData.date} 
                    onChange={handleChangeDate} 
                  />
                </div>
                <div className="col">
                  <label htmlFor='km'>Пройдено, км</label>
                  <input 
                      id='km' 
                      name='km' 
                      type="number"
                      className={`${editMode ? 'editMode' : ''}`}
                      value={currentData.km} 
                      onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btnSubmit">ОК</button>
            </form>
            <Table 
                data={tableData} 
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                editModeData={editModeData}
                setCurrentData={setCurrentData}
            />
        </div>
    )
}