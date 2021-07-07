import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import TodoList from "./app/components/TodoList";
import CreateTodo from "./app/components/CreateTodo";
import Header from "./app/components/Header";
import Container from "@material-ui/core/Container";
import Error from "./app/components/Error";
import Todo from "./app/components/Todo";
import EditTodo from "./app/components/EditTodo";

export default function AppRouter(props) {
    return (
        <Router>
            <Header/>
            <Container maxWidth="md" style={{marginTop: 10}}>
                <Switch>
                    <Route path="/create" exact>
                        <CreateTodo/>
                    </Route>
                    <Route path="/" exact>
                        <TodoList/>
                    </Route>
                    <Route path="/:id" exact>
                        <Todo/>
                    </Route>
                    <Route path="/edit/:id" exact>
                        <EditTodo/>
                    </Route>
                    <Route path="*">
                        <Error>404 Not Found</Error>
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}
