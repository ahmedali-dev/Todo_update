import {Navigate, useLocation} from "react-router-dom";


//authentication required to reload the pages
export const AuthRequired = (path, element, auth, more = null) => {

    const router = {
        path: path,
        element: <>
            {!auth ? <Navigate to={'/auth/signin'}/> : element}
        </>,

    }
    // more.element = <>
    //     {!auth ? <Navigate to={'/auth/signin'}/> : more.element}
    // </>
    return router;
}

export const AuthElement = (auth, element) => {
    return !auth ? <Navigate to={'/auth/signin'}/> : element
};


//authentcation not required to reload this page but if auth not found redirect this page
export const AuthNotRequired = (path, element, auth, child, home = '/collections') => {


    return {
        path: path,
        element: <>
            {auth ? <Navigate to={home}/> : element}
        </>,
        ...child
    }
}
