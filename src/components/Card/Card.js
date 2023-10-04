import React, { useState, useEffect, useReducer } from "react";
import CardFooter from "./CardFooter";
import "./Card.css";

const initialState = {
  textColor: 'text-primary',
  bgColor: 'text-bg-primary',
  borderColor: 'border-primary',

};

const cardReducer = (state, action) => {
  if (action.type === 'pause') {
    return {
      textColor: 'text-warning',
      bgColor: 'text-bg-warning',
      borderColor: 'border-warning',
    };
  }
  if (action.type === 'done') {
    return {
      textColor: 'text-success',
      bgColor: 'text-bg-success',
      borderColor: 'border-success',
    };
  }

  if (action.type === 'progress') {
      
    return {
      textColor: initialState.textColor,
      bgColor: initialState.bgColor,
      borderColor:initialState.borderColor,
    };

  }
  
  return state;
}


const Card = ({ name, description }) => {
  const [status, setStatus] = useState('progress');

  const [statusState, dispatchStatus] = useReducer(cardReducer,initialState);

  const statusHandler = (newStatus) => {
    setStatus(newStatus);
  };

  const {textColor, bgColor, borderColor } = statusState;

  useEffect(() => {
    if (status === 'pause') {
      dispatchStatus({ type: status });
    }
    if (status === 'done') {
      dispatchStatus({ type: status});
    }
    if (status === 'progress') {
      dispatchStatus({ type: status});
  
    }
  }, [status]);


  return (
    <div className={`${borderColor} card mb-3`} >
      <div className={`card-header ${bgColor} ${borderColor}`}>{name}</div>
      <div className={`card-body card-scroll ${textColor}`}>
        <p className="card-text">{description}</p>
      </div>
      <CardFooter statChange={statusHandler} borderColor={borderColor } />
    </div>
  );
};

export default Card;
