import AppBar from "@material-ui/core/AppBar";
import {fade, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SearchIcon from '@material-ui/icons/Search';
import Input from "@material-ui/core/Input";
import Aside from "./Aside";
import {useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setSearchText} from "../../redux/actions";

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


function Header(props) {
    const classes = useStyles();
    const [asideStatus, setAsideStatus] = useState(false);

    return (
        <header>
            <Aside open={asideStatus} setAsideStatus={setAsideStatus}/>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <IconButton color="inherit" onClick={() => setAsideStatus(true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component={Link} to="/" color="inherit" style={{textDecoration: 'none'}}>
                        ToDoList
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <Input placeholder="Search.." classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }} onChange={e => props.setSearchText(e.target.value)}/>
                    </div>

                </Toolbar>
            </AppBar>
        </header>
    )
}

const mapDispatchToProps = {
    setSearchText
}
export default connect(null, mapDispatchToProps)(Header);
