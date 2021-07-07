import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {List, ListItem, ListItemText} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InBoxIcon from '@material-ui/icons/MoveToInbox';
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    item: {
        width: 250
    }
}));

function Aside(props) {
    const classes = useStyles();

    const items = [{
        path: '/',
        text: 'Home'
    }, {
        path: '/create',
        text: 'Create Todo'
    }]

    const {open, setAsideStatus} = props;

    return (
        <Drawer className={classes.drawer} open={open} onClose={() => setAsideStatus(false)}>
            <List>
                {
                    items.map((item, i) => (
                        <ListItem component={Link} key={i} button className={classes.item} to={item.path}
                                  onClick={() => setAsideStatus(false)}>
                            <ListItemIcon>
                                <InBoxIcon/>
                            </ListItemIcon>
                            <ListItemText>{item.text}</ListItemText>
                        </ListItem>
                    ))
                }

            </List>
        </Drawer>
    )
}

export default Aside;
