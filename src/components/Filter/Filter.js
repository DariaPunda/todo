import React from "react";
import Button from "../Button";
import "./Filter.css";

const Filter = ({onFilterChange}) => {


  return (
    <div className="filter-container">
      <Button onClick={()=>{onFilterChange('all')}} className="btn-outline-secondary"> All </Button>
      <Button onClick={()=>{onFilterChange('progress')}} className="btn-outline-primary"> In Progress </Button>
      <Button onClick={()=>{onFilterChange('pause')}} className="btn-outline-warning"> Paused </Button>
      <Button onClick={()=>{onFilterChange('done')}} className="btn-outline-success"> Done </Button>
    </div>
  );
};

export default Filter;
