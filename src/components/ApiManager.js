export const getAllCustomers = (setCustomers) => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
}

export const getCustomerDetails = (updateCustomer, customerId) => {
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
}

export const saveCustomerDetails = (customer, customerId, navigate) => {
    return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(() => {
                navigate(`/customers/${customerId}`)
            })
}

export const deleteEmployee = (id, setEmployees) => {
    return fetch(`http://localhost:8088/users/${id}`, { method: "DELETE" })
        .then(
            () => {
                fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((employees) => {
                    setEmployees(employees)
                })
            }
        )
}

export const getEmployeeDetails = (employeeId, updateEmployee) => {
    return fetch(`http://localhost:8088/employees?_expand=user&userId=${employeeId}&_expand=location`)
                .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })
}

export const getEmployees = (getUsers) => {
    return fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((userArray) => {
                    getUsers(userArray)
                })
}

export const saveNewEmployee = (userToSendToAPI, navigate, employee) => {
    return fetch('http://localhost:8088/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(response => response.json())
            .then((newUser) => {
                let employeeToSendToAPI = {
                    startDate: employee.startDate,
                    payRate: parseFloat(employee.payRate),
                    locationId: parseInt(employee.locationId),
                    userId: newUser.id
                }
                fetch('http://localhost:8088/employees', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToSendToAPI)
                })
                    .then(response => response.json())
                    .then(() => {
                        navigate("/employees")
                    })

            })
}

export const getLocations = (setLocations) => {
    return fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
                setLocations(locationArray)
            })
}

export const saveNewProduct = (productToSendToAPI, navigate) => {
    return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
}

export const getProducts = (setProducts) => {
    return fetch(`http://localhost:8088/products`)
            .then(response => response.json())
            .then((productsArray) => {
                setProducts(productsArray)
            })
}

export const getProductTypes = (setProductTypes) => {
    return fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productsArray) => {
                setProductTypes(productsArray)
            }) 
}

export const savePurchase = (newPurchase, setFeedback) => {
    return fetch('http://localhost:8088/purchases', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Product purchased!")
            })
}

export const getPurchases = (setPurchases) => {
    return fetch(`http://localhost:8088/purchases?_expand=product`)
            .then(response => response.json())
            .then((purchasesArray) => {
                setPurchases(purchasesArray)
            }) 
}

export const getUsersAndCurrent = (setUserList, setCurrentUser, kandyUserObject) => {
    return fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((usersArray) => {
                setUserList(usersArray)
                let currentUser = usersArray.find(user => kandyUserObject.id === user.id)   
                setCurrentUser(currentUser) 
            })
}