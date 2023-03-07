import { getCustomerById } from "fakeApi"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, setCustomer] = useState(null)
    const location = useLocation()

    console.log(customer)

    useEffect(() => {
        getCustomerById(Number(customerId)).then(setCustomer)

    }, [customerId])

    if (!customer) {
        return null;
    }

    const { id, name } = customer
    console.log(location.state.from)
    const backLinkHref = location.state?.from ?? '/customers';
    return (
      <main>
        <Link to={backLinkHref}>Back to customers</Link>
        <p>id:{id}</p>
        <p>Username:{name}</p>
      </main>
    );
}