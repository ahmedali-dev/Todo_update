import {useEffect, useLayoutEffect, useState} from "react";
import Loader from "../../../src/components/UI/Loader";
import CollectionsList from "../components/todos/collections/collectionList";
import css from "./collections.module.scss";
import FetchCollectionsHook from "../hooks/FetchCollectionsHook";
import {toast} from "react-hot-toast";
import {useSelector} from "react-redux";


const Collections = () => {
    const [loading, setLoading] = useState(false);


    const {isloading} = useSelector(state => state.register);
    const [data, error, fetchdata] = FetchCollectionsHook({loading: setLoading});
    useEffect(() => {
        fetchdata();

        return () => {
            if (error) {
                toast.error(error)
            }
        }
    }, [isloading]);

    if (loading) {
        return (
            <div>
                <Loader/>
            </div>
        );
    }

    return (
        <div className={css.collections}>
            <div
                onClick={() => {
                    console.log(null);
                }}
                className={css.collHeader}
            >
                Collections
            </div>
            <div className={css.collList}>
                {<CollectionsList collectionlist={data}/>}
            </div>
        </div>
    );
};

export default Collections;
