import React, { useContext } from "react";
import {AuthContext} from "../App";

const BookingPage = props =>        {
    const context = useContext(AuthContext);
    
    const initialState = {
        id: props.id,
        firstName = "",
        lastName = "",
        phoneNumber = "",
        email = ""
    }

    const [data, setData] = useState(initialState);
    const handleInputChange = event => {
        setData({
            ...data, 
            [event.target.name]: event.target.value
        });
    };
    const handleFormSubmit = event => {
        event.preventDefault();
        setData({
          ...data,
          isSubmitting: true,
          errorMessage: null
        });
        let id = context.data.email
        const 


   return   (
        <di
   );


}