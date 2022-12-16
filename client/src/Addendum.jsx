import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default function Addendum(props) {

  // useEffect(() => {
  //   props.getAll()
  // }, [handleClickYes, handleClickNo])

  const incrementYes = (id, id2) => {
    fetch(`http://localhost:3001/${id}/${id2}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({ 'vote': 'up' }),
      json: true
    })
  }
  const incrementNo = (id, id2) => {
    fetch(`http://localhost:3001/${id}/${id2}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({ 'vote': 'down' }),
      json: true
    })
  }

  function handleClickYes() { 
    incrementYes(props.propId, props.id) 
    if (props.predicate && props.ups > props.majority - 1) { props.incrementYes(props.propId) }
  }
  function handleClickNo() { 
    incrementNo(props.propId, props.id) 
    if (props.predicate && props.downs > props.majority - 1) { props.incrementNo(props.propId) }
  }

  let status
  if (props.ups > props.majority) {
    status = 'passed-addendum'
  } else if (props.downs > props.majority) {
    if (!props.showClosed) {
      status = 'hidden-failed-addendum'
    } else {
      status = 'failed-addendum'
    }
  } else {
    status = 'open-addendum'
  }
  let statusVariant
  if (props.ups > props.majority || props.downs > props.majority) {
    statusVariant = 'outlined'
  } else {
    statusVariant = 'contained'
  }

  return (
    <div className={`addendum ${status}`}>
      <div style={{ flexDirection: 'column' }}>
        <Button className='add-button'
          variant="contained"
          color="secondary"
          style={{ marginTop: '-6px' }}
          onClick={handleClickNo}
        >
          No
        </Button>
        <br />
        <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
          <Button className='add-button'
            style={{ fontSize: '16px', maxHeight: '36.5px', marginTop: '2px' }}
            variant="outlined"
            color="secondary"
          >
            {props.downs}
          </Button>
        </span>
      </div>
      <Card className='addendum-inner' variant={statusVariant} style={{ backgroundColor: props.predicate ? '#F5C4D5' : 'rgb(246, 246, 246)' }}>
        {props.claim}
      </Card>
      <div style={{ flexDirection: 'column' }}>
        <Button className='add-button'
          variant="contained"
          color="primary"
          style={{ marginTop: '-6px' }}
          onClick={handleClickYes}
        >
          Yes
        </Button>
        <br />
        <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
          <Button className='add-button'
            style={{ fontSize: '16px', maxHeight: '36.5px', marginTop: '2px' }}
            variant="outlined"
            color="primary"
          >
            {props.ups}
          </Button>
        </span>
      </div>
    </div>
  );
}
