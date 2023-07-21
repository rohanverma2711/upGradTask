// MainComponent.js
import React, { useState } from 'react';
import TableComponent from './TableComponent';
import Resume from './Resume';


const MainComponent = () => {
  const [selectedItem, setSelectedItem] = useState(null);

 const handleRowClick=(id) =>{
    setSelectedItem(id);

    console.log("clicked");
  };

  console.log(selectedItem,"sdsadasdas");

  return (
    <div>
        
      <TableComponent onRowClick={handleRowClick}  />
     
     
    </div>
  );
};

export default MainComponent;
