import { useMemo, createContext, useState, useCallback } from "react";
import data from '../data'
import ProductCard from "./ProductCard";
import { useScreenSize } from "./useScreenSize";
import ProductFilterPage from "./ProductFilterPage";
import { Drawer } from 'antd';
import type { DrawerProps, RadioChangeEvent } from 'antd';

export const FilterContext = createContext<{
  handleFilterObject: (filterType: string, value: string) => void;
}>({
  handleFilterObject: () => {},
});

// main page display product details
const Product = () => {
  const [width, height] = useScreenSize();
  const defaultFilter: any = {
    color: [],
    gender: [],
    price: [],
    type: [],
  }

  // Drower for mobile view fillter
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    console.log('showDrawer')
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  let [filterResult, setFilterResult ] = useState(data);
  let [searchInput, setSearchInput ] = useState('');
  let [searchResult, setSearchResult ] = useState(data);
  let [filterObject, setfilterObject] = useState(defaultFilter);  

  // Handle search product 
  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value)
    let value = event.target.value;
    const lowerCasedSearchInput = value.toLowerCase();
    let filterList: any =  lowerCasedSearchInput === ''
      ? data
      : data.filter(({ name }) => name.toLowerCase().includes(lowerCasedSearchInput));
      setSearchResult(filterList);
      const result = filterfun(filterList, filterObject);
      setFilterResult(filterList);
  };

  // function for apply various filters  
  const filterfun = (arr:any[], filters: any) => {
    const filtersArr = Object.values(filters)
    let filterRes = arr.filter(obj => {
      let result = true;
      filtersArr.forEach((value: any, index: number) => {
        if(value.length > 0) {
          if(index === 0) {
            result = value.includes(obj['color'])
          } if(index === 1) {
            result = value.includes(obj['gender'])
          } if(index === 2) {
            let priceFilter = 0;
            value.forEach((element: any) => {
              priceFilter = Number(element.split('-')[1]) < priceFilter ? priceFilter : Number(element.split('-')[1]);
            });
            result = (priceFilter > obj['price'])
          } if(index === 3) {
            result = value.includes(obj['type'])
          }
        }           
      });
      return result;
      }
    );
    return filterRes;
  }

// prefering fillter object
const handleFilterObject = useCallback((filterType: string, value: string) => {
  const index = filterObject[filterType].indexOf(value);
  if (index > -1) {
    filterObject[filterType].splice(index, 1);
  } else {
    filterObject[filterType].push(value)
  }
  setfilterObject(filterObject);
  const result = filterfun(searchResult, filterObject);
  setFilterResult(result)
},[]);

  const contextValue = useMemo(
    () => ({ handleFilterObject }),
    [],
  );

  return(
    <>
      { width > 1000 ? 
        <>
          <div className="column" style={{width: '20%'}}>
            <FilterContext.Provider value={contextValue}>
              <ProductFilterPage /> 
            </FilterContext.Provider>
          </div>
          <div className="column" style={{backgroundColor: '#bbb', width: '80%'}}> 
            <div className="search">
              <input type="text" className="searchbox" value={searchInput}
              onChange={handleSearchInputChange} placeholder="Search for product.." />
              <button className="searchButton">
                Search 
              </button>
              {width < 1000 ? <button onClick={showDrawer} className="searchButton">
                 filter
              </button> : null }
            </div>
            <div className={width > 1000 ? 'product-view': 'single-product-view' }>
              {
                filterResult.map((product: any) => (
                  <ProductCard product={product}/>
                ))
              }
            </div>
          </div>
        </>  : 
        <div className="column" style={{backgroundColor: '#bbb', width: '100%'}}> 
          <div className="search">
            <input type="text" className="searchbox" value={searchInput}
            onChange={handleSearchInputChange} placeholder="Search for product.." />
            <button type="submit" className="searchButton">
              Search
            </button>
            {width < 1000 ? <button onClick={showDrawer} className="searchButton">
                filter
            </button> : null }
          </div>
          <div className={width > 1000 ? 'product-view': 'single-product-view' }>
            {
              filterResult.map((product: any) => (
                <ProductCard product={product}/>
              ))
            }
          </div>
        </div>
      }

      <Drawer title="Filter" onClose={onClose} open={open}>
        <FilterContext.Provider value={contextValue}>
          <ProductFilterPage /> 
        </FilterContext.Provider>
      </Drawer>
    </>  
  )
};

export default Product;
