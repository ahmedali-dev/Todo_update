import "./App.css";
import Header from "./components/Header/Header";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchData} from "./store/TodoList";

const App = (props) => {

    const dispath = useDispatch();
    useEffect(() => {
        dispath(fetchData());
    }, []);

    return (
        <>
            <Header/>
            {/* main content */}
            <main className="main">{props.children}</main>
        </>
    );
};

export default App;
