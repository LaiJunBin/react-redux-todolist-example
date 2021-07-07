import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {pushTodo} from "../../redux/actions";
import {connect} from "react-redux";
import Todo from "../../models/Todo";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root, & .MuiButton-root': {
            margin: theme.spacing(1)
        }
    }
}));

function CreateTodo(props) {
    const classes = useStyles();
    const history = useHistory();
    const todo = new Todo();

    return (
        <div>
            <Typography variant="h3">Create Todo</Typography>
            <form className={classes.root}>
                <TextField label="Todo Name" fullWidth onChange={e => todo.setName(e.target.value)}/>
                <TextField label="Todo Description" fullWidth multiline rows="4"
                           onChange={e => todo.setDescription(e.target.value)}/>
                <Button variant="contained" color="primary" fullWidth
                        onClick={() => props.pushTodo(todo) && history.push('/')}>Create</Button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {pushTodo};

export default connect(null, mapDispatchToProps)(CreateTodo);
