import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { AuthContext } from "../App";
import ErrorMessage from "../components/errorMessage";
import { TablesContext } from "../context/tablesContext";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    loginButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',

    }
}));

export default function BookTable() {
    const authContext = useContext(AuthContext)
    const tableContext = useContext(TablesContext)

    const classes = useStyles()
    const {
        register,
        handleSubmit,
        errors,
        setError,
        clearError,
        formState: { isSubmitting }
    } = useForm();
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const validateUserName = async value => {
        await sleep(1000);
        if (value !== "bill") {
            setError("username", "validate");
        } else {
            clearError("username");
        }
    };

    return (
        <Container >
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <form className="App" onSubmit={handleSubmit(onSubmit)}>
                        <h1>Book Table</h1>
                        <Grid item xs={6}>
                            <label>First Name:</label>
                            <input name="firstName" ref={register({ required: true })} />
                            <ErrorMessage error={errors.firstName} />
                        </Grid>
                        <Grid item xs={6}>
                            <label>Last Name:</label>
                            <input name="lastName" ref={register({ required: true, minLength: 2 })} />
                            <ErrorMessage error={errors.firstName} />
                        </Grid>
                        <Grid item xs={6} >
                            <label>Username</label>
                            <input
                                name="username"
                                onBlur={e => validateUserName(e.target.value)}
                                ref={register({ required: true, validate: validateUserName })}
                            />
                            <ErrorMessage error={errors.username} />
                        </Grid>
                        <Grid item xs={6} >
                            <label>Email</label>
                            <input
                                name="email"
                                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                            />
                            <ErrorMessage error={errors.email} />
                        </Grid>
                        <br></br>
                        <Grid item xs={6} >
                            <Button className={classes.loginButton} disabled={isSubmitting} type="submit">Submit</Button>
                            {/* <input disabled={isSubmitting} type="submit" /> */}
                        </Grid>
                    </form>
                </Grid>
            </div>
        </Container>
    );
}