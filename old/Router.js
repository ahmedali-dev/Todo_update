import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import AddTodo from "./pages/AddTodo";
import EditeTodo from "./pages/EditeTodo";
import Todos from "./pages/Todos";

const route = (path, element, more) => {
    return {
        path: `/${path}`,
        element: <App>{element}</App>,
        children: [more],
    };
};

const pages = [
    route("/todos", <Todos/>,
        {
            path: "/todos/:id",
            element: <Todos/>
        }
    ),
    route("/", <Todos/>,
        {
            path: "todos/:id",
            element: <Todos/>
        }
    ),
    // route(),
    route("/add", <AddTodo/>),
    route("/edit/:id", <EditeTodo/>),
    // route("/delete/:id", <div>delete todo</div>),
    route("*", <div>page not found</div>),
];
const RouterApp = createBrowserRouter(pages);
export default RouterApp;
