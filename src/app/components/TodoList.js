import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckBox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import {useState} from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import {setTodos, updateTodo} from "../../redux/actions";
import {useHistory} from 'react-router-dom';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from '@material-ui/icons/Done';

function TodoList(props) {
    const [checkedIndexes, setCheckedIndexes] = useState([]);
    const [checkedAllStatus, setCheckedAllStatus] = useState(false);
    const history = useHistory();

    const switchCheckedStatus = (e, i) => {
        e.stopPropagation();
        const index = checkedIndexes.indexOf(i);
        const newCheckedIndexes = [...checkedIndexes];
        if (index !== -1) {
            newCheckedIndexes.splice(index, 1);
            setCheckedAllStatus(false);
        } else {
            newCheckedIndexes.push(i);
            if (newCheckedIndexes.length === props.todos.length) {
                setCheckedAllStatus(true);
            }
        }
        setCheckedIndexes(newCheckedIndexes);
    };

    const switchDoneStatus = (e, i) => {
        e.stopPropagation();
        const todo = {...props.todos[i], done: !props.todos[i].done};
        props.updateTodo(i, todo);
    }

    return (
        <div>
            {props.todos.length > 0 ? (
                <>
                    <Typography variant="h3">Todos:</Typography>

                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CheckBox
                                    edge="start"
                                    checked={checkedAllStatus}
                                    onClick={() => {
                                        if (checkedIndexes.length === props.todos.length) {
                                            setCheckedIndexes([]);
                                            setCheckedAllStatus(false);
                                        } else {
                                            setCheckedIndexes(new Array(props.todos.length).fill(0).map((x, i) => i));
                                            setCheckedAllStatus(true);
                                        }
                                    }}
                                />
                                <ListItemText primary="All" style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}/>
                            </ListItemIcon>
                        </ListItem>
                        {
                            props.todos.map((todo, i) => (
                                    todo.name.includes(props.searchText) && (
                                        <ListItem key={i} button onClick={() => history.push(`/${i}`)}>
                                            <ListItemIcon>
                                                <CheckBox
                                                    edge="start"
                                                    checked={checkedIndexes.includes(i)}
                                                    onClick={e => switchCheckedStatus(e, i)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`Todo: ${todo.name}`}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" color={todo.done ? 'secondary' : 'default'}
                                                            onClick={e => switchDoneStatus(e, i)}>
                                                    <DoneIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                )
                            )
                        }
                    </List>

                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
                            disabled={checkedIndexes.length === 0} onClick={() => {
                        const todos = [];
                        props.todos.forEach((todo, i) => {
                            if (!checkedIndexes.includes(i)) {
                                todos.push(todo);
                            }
                        });
                        props.setTodos(todos);
                        setCheckedIndexes([]);
                    }}>刪除已選取項目</Button>
                </>
            ) : (
                <Typography variant="h3">Nothing todos.</Typography>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    todos: state.todos,
    searchText: state.searchText
});

const mapDispatchToProps = {
    setTodos,
    updateTodo,
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
