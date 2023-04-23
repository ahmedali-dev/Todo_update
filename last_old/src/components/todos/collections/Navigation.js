import {Link, NavLink, useParams} from "react-router-dom";
import css from "./Navigation.module.scss";
import FetchCollectionsHook, {FetchCollectionItem} from "../../../hooks/FetchCollectionsHook";
import {useEffect, useState} from "react";
import Loader from "../../../../../src/components/UI/Loader";
import {useDispatch} from "react-redux";
import {ChangeIsloading} from "../../../store/Slices/RegisterSlice";

const NavigationColl = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [data, error, FetchData] = FetchCollectionsHook({loading: setLoading});
    const dispatch = useDispatch();

    useEffect(() => {
        FetchData();

    }, [id]);


    if (error) {
        // collection not found {setTimeout(() => back(), 2000)}
        return <div>{error}</div>;
    }
    if (loading) {
        return <Loader/>;
    }

    return (
        <div className={css.Nav}>
            <Link to={"/collections"} className={css.header}>
                Collections
            </Link>
            <div className={css.collections}>
                {data && data.map((dm) => (
                    <NavLink
                        key={dm.id}
                        className={() =>
                            id == dm.id
                                ? `${css.collections_item} ${css.active}`
                                : css.collections_item
                        }
                        to={`/collections/${dm.id}`}
                    >
                        <div key={dm.collection}>{dm.collection}</div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default NavigationColl;
