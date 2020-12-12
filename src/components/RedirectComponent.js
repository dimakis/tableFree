import React from 'react'
import { Redirect } from "react-router-dom"


const RedirectCom = (path) =>    {
    return <Redirect to={path} />
}
export default RedirectCom