import React, { useState} from 'react'; 
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {isNameValid} from './mock-api/apis';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [products, setProduct] = useState([]);

  const frameStyle = {
    border: '2px solid #000', // Specify border properties
    borderRadius: '5px',      // Optionally, you can add border radius for rounded corners
    padding: '30px',         // Optionally, add padding for space inside the frame
    margin: '90px'
  };

  const countries = [
      { name: 'Canada', code: 'CA' },
      { name: 'China', code: 'CN' },
      { name: 'United States', code: 'US' },
      { name: 'Brazil', code: 'BR' }
      
  ];

  const validateInput = (e) => {
        console.log(e);
        setSelectedName(e);
        const data =  isNameValid(e);
        console.log(data);
  }

  const onAddClick = () => {
    if (selectedName && selectedCountry) {
      let selectedcountry = selectedCountry.name;
      setProduct([...products, { selectedName, selectedcountry }]);
      console.log(products);
    }
  }

  return (
    <div className="App" style={frameStyle}>

      <div className="card flex justify-content-center" style={{padding: '10px'}}>
            <div className="flex flex-column">
                <label htmlFor="username">Name </label>
                <InputText id="username" value={selectedName} aria-describedby="username-help" onChange={(e) => validateInput(e.target.value)}/>
            </div>
        </div>

        <div className="card flex justify-content-center" style={{padding: '10px', marginBottom: '170px'}} > 
            <label htmlFor="username">Location </label>
            <Dropdown value={selectedCountry} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" placeholder="Select a Country" 
                 className="w-full md:w-14rem" 
                dropdownIcon={(opts) => {
                    return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                }}/>
        </div>

        <div className="card flex justify-content-center" style={{padding: '10px'}}>
            <Button label="Clear" /> 
            <Button label="Add" style={{marginLeft: '10px'}} onClick={onAddClick}/>
        </div>

        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '70rem' }}>
                <Column field="selectedName" header="Name"></Column>
                <Column field="selectedcountry" header="Location"></Column>
            </DataTable>
        </div>
    </div>
  );
}

export default App;
