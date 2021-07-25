import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import './table.css'


export default function Table(props) {
    const data = props.data;
    const handleDelete = props.handleDelete;
    const editModeData = props.editModeData;
    const setCurrentData = props.setCurrentData;
    const handleEdit = props.handleEdit;

    useEffect(() => {
      if (Object.keys(editModeData).length) {
        setCurrentData({
          date: editModeData.date,
          km: editModeData.km,
        })
      }
    }, [editModeData]);

    const formatDate = date => {
      return moment(date).format('DD.MM.YYYY')
    }

    return (
        <table className="table">
            <thead>
                <tr>
                <th>Дата (ДД.ММ.ГГГГ)</th>
                <th>Пройдено, км</th>
                <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.sort((a, b) => a.date - b.date)
                    .map(step => {
                        return(
                          <tr key={step.id}>
                            <td>
                              <p>{formatDate(step.date)}</p>
                            </td>
                            <td>
                              <p>{step.km}</p>
                            </td>
                            <td>
                              <button className="edit" onClick={e => handleEdit(e, step.id)}>
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button className="delete" onClick={e => handleDelete(e, step.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            </td>
                          </tr>
                        )
                })
            }
            </tbody>
        </table>
    )
}

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]).isRequired,
      km: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ),
  handleDelete: PropTypes.func.isRequired, 
  handleEdit: PropTypes.func.isRequired,
  setCurrentData: PropTypes.func.isRequired,
  editModeData: PropTypes.object.isRequired
};