import { SearchBox } from "components/SearchBox";
import { getCustomers } from "fakeApi";
import { useEffect, useMemo, useState } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const Customers = () => {
    const location= useLocation()
    const [customers, setCustomers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams()
    const filterParams = searchParams.get('filter')??""
    
    
    useEffect(() => {
        getCustomers().then(setCustomers)
    }, [])

    const changeFilter = value => {
        setSearchParams(value !== '' ? { filter: value } : {})
    }

    const visibleCustomers = useMemo(() => {
        return customers.filter(customer =>
          customer.name.toLowerCase().includes(filterParams.toLocaleLowerCase())
        );
    }, [customers, filterParams])
    
    
    return (
      <main>
        <SearchBox value={filterParams} onChange={changeFilter} />
        {visibleCustomers.length > 0 && (
          <ul>
            {visibleCustomers.map(customer => (
              <li key={customer.id}>
                    <Link to={`${customer.id}`} state={{from: location}}>{customer.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
}