import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {updateTodo} from "../../redux/actions";
import {connect} from "react-redux";
import {Link, useHistory, useParams} from 'react-router-dom';
import Error from "./Error";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Todo from "../../models/Todo";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root, & .MuiButton-root': {
            margin: theme.spacing(1)
        }
    }
}));

function EditTodo(props) {
    const classes = useStyles();
    const history = useHistory();
    const {id} = useParams();
    const todo = props.todos[id];
    if (!todo) {
        return <Error>Todo not found.</Error>
    }
    const newTodo = new Todo(todo);

    return (
        <div className={classes.root}>
            <Button variant="contained" component={Link} to={`/${id}`} startIcon={<ArrowBackIcon/>}>Back</Button>
            <Typography variant="h3">Edit Todo: {todo.name}</Typography>
            <form>
                <TextField label="Todo Name" fullWidth onChange={e => newTodo.setName(e.target.value)}
                           defaultValue={todo.name}/>
                <TextField label="Todo Description" fullWidth multiline rows="4"
                           onChange={e => newTodo.setDescription(e.target.value)} defaultValue={todo.description}/>
                <Button variant="contained" color="primary" fullWidth
                        onClick={() => props.updateTodo(id, newTodo) && history.push(`/${id}`)}>Edit</Button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {updateTodo};
const mapStateToProps = state => ({
    todos: state.todos
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
