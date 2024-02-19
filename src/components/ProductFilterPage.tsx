import { useContext } from "react";
import './ProductFilterPageStyle.css';
import { FilterContext } from "./Product";

export interface FilterProps {
  filter: any;
}

export interface FilterCheckBoxProps {
  checkbox: string[];
  checkboxType: string
}

const FilterGroups = (FilterProps: FilterProps) => {
  const { filter } = FilterProps;
  let key = Object.keys(filter)[0]
  let value = filter[key]
  return( <> < FilterCheckbox checkbox={value} checkboxType={key}/> </>)
}

const FilterCheckbox = (Props: any) => {
  const { checkbox, checkboxType } = Props;
  const contextValue = useContext(FilterContext);
  const { handleFilterObject } =  contextValue;

  return(<> 
      <h3> {checkboxType} </h3>
      {
        checkbox.map((fil: any, index: number) => (
          <div key={`chceck-grop-${index}`} className="checkbox-group">
            <input key={`chceck-inp-${index}`} type="checkbox" id={fil} value={fil} onChange={(event) => {
            handleFilterObject(checkboxType, event.target.value);
      } }/>
          <label key={`chceck-lable-${index}`} htmlFor={fil}> {fil}</label>
          </div> 
        ))
      }
  </>)
}

const ProductFilterPage = () => {
  const defaultFilters = [
    {color: ['Red', 'Blue', 'Green']},
    {gender: ['Men', 'Women']},
    {price: ['0-250', '250-450', '450-1000']},
    {type: ['Polo', 'Hoodie', 'Basic']}
  ]

  return(
    <>
      {
        defaultFilters.map((fil, index) => <FilterGroups key={`filter-grp-${index}`} filter={fil}/>)
      }
    </>
  )
};

export default ProductFilterPage;
