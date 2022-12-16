import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VotesAndTitle from './VotesAndTitle';
import Addendum from './Addendum';
import NewAddendum from './NewAddendum';

export default function Proposition(props) {

  // useEffect(() => {
  //   props.getAll()
  // }, [handleClickYes, handleClickNo, handleClickYesAnd, handleClickNoBut])


  let [addenEntry, setAddenEntry] = useState()

  const incrementYes = (id) => {
    fetch(`http://localhost:3001/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ "vote": "up" }),
      json: true
    })
  }
  const incrementNo = (id) => {
    fetch(`http://localhost:3001/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ "vote": "down" }),
      json: true
    })
  }

  function handleCancel() { setAddenEntry() }
  function handleClickYes() { incrementYes(props.id) }
  function handleClickNo() { incrementNo(props.id) }

    function handleClickYesAnd() {
      setAddenEntry(
        <NewAddendum 
        handleCancel={handleCancel} 
        // handleRerender={update}
        addenda={addenda}
        propId={props.id}
        />
      )
      incrementYes(props.id)
    }
    function handleClickNoBut() {
      setAddenEntry(
        <NewAddendum 
          predicate='yes' 
          handleCancel={handleCancel} 
          // handleRerender={update}
          addenda={addenda}
          propId={props.id}
        />
      )
    }

    let addenda = props.addenda
    let openAddenda = []
    let openAddendaMapped = []
    let closedAddenda = []
    let closedAddendaMapped = []

    addenda.forEach((addendum) => {
      if ( (addendum != undefined) && ((addendum.ups >= props.majority) || (addendum.downs >= props.majority)) ) {
        closedAddenda.push(addendum)
      } else if (addendum != undefined) {
        openAddenda.push(addendum)
      }
    })

    if (openAddenda) {
      openAddendaMapped = openAddenda.map((addendum) => {
        return(
          <Addendum
            key={addendum.key}
            id={addendum.id}
            propId={props.id}
            claim={addendum.text}
            predicate={addendum.predicate}
            ups={addendum.ups}
            downs={addendum.downs}
            majority={props.majority}
            incrementYes={incrementYes}
            incrementNo={incrementNo}
            getAll={props.getAll}
          />
      )})
    }

    if (closedAddenda) {
      closedAddendaMapped = closedAddenda.map((addendum) => {
        return(
          <Addendum
            key={addendum.key}
            id={addendum.id}
            propId={props.id}
            claim={addendum.text}
            predicate={addendum.predicate}
            ups={addendum.ups}
            downs={addendum.downs}
            majority={props.majority}
            showClosed={props.showClosed}
            incrementYes={incrementYes}
            incrementNo={incrementNo}
            getAll={props.getAll}
          />
      )})
    }

  let status
  if (props.ups > props.majority) {
      status = 'passed'
  } else if (props.downs > props.majority) {
      status = 'failed'
  } else {
      status = 'open'
  }

  let closedVisibility = 'closed-visible'
  if (!props.showClosed) {
    if (status !== 'open') {
      closedVisibility = 'closed-hidden'
    }
  } else {
    closedVisibility = 'closed-visible'
  }
  
  return (
      <Card className={`proposition ${status} ${closedVisibility}`}>
          <VotesAndTitle
              claim={props.claim}
              ups={props.ups}
              downs={props.downs}
              />
          <span style={{ height: '70px' }} ></span>
          
          {closedAddendaMapped}    
          <div className={`prop-hider ${status}`} style={{ marginTop: '-50px', flexDirection: 'row' }}>
              <ButtonGroup
              style={{ margin: '5px' }}
              orientation="vertical"
              variant="contained"
              color="secondary"
              aria-label="vertical button group"
              >
                  <Button onClick={handleClickNo}>No</Button>
                  <Button onClick={handleClickNoBut}>No But</Button>
              </ButtonGroup>

              <ButtonGroup
              style={{ margin: '5px' }}
              orientation="vertical"
              variant="contained"
              color="primary"
              aria-label="vertical primary button group"
              >
                  <Button onClick={handleClickYes}>Yes</Button>
                  <Button onClick={handleClickYesAnd}>Yes And</Button>
              </ButtonGroup>
          </div>
          {openAddendaMapped}
          {addenEntry}
      </Card>
  )
}