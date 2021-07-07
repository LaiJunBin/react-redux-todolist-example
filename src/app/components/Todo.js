import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {makeStyles, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import DeleteIcon from '@material-ui/icons/Delete';
import Error from "./Error";
import {deleteTodoFromIndex} from "../../redux/actions";
import {useHistory} from 'react-router-dom';
import {orange} from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    title: {
        margin: theme.spacing(1)
    },

    description: {
        fontSize: '1.6em'
    },

    'btn-warning': {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700],
        }
    }
}))

function Todo(props) {
    const {id} = useParams();
    const todo = props.todos[id];
    const classes = useStyles();
    const history = useHistory();

    if (!todo) {
        return (
            <Error>Todo not found.</Error>
        )
    }

    return (
        <div>
            <Card>
                <CardActions>
                    <Button variant="contained" startIcon={<ArrowBackIcon/>} component={Link} to="/">Back</Button>
                    <Button variant="contained" startIcon={<EditIcon/>} component={Link} to={`/edit/${id}`}
                            className={classes['btn-warning']}>Edit</Button>
                    <Button variant="contained" startIcon={<DeleteIcon/>} color="secondary"
                            onClick={() => props.deleteTodoFromIndex(id) && history.push('/')}>Delete</Button>
                </CardActions>
                <CardContent>
                    <Typography variant="h3" className={classes.title}>Todo: {todo.name}</Typography>
                    <pre className={classes.description}>{todo.description}</pre>
                </CardContent>
            </Card>

        </div>
    )
}

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = {
    deleteTodoFromIndex
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
