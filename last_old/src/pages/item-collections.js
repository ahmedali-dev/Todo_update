import {useNavigate, useParams} from "react-router-dom";
import css from "./ItemCollections.module.scss";
import Items from "./../components/todos/items/Items";
import NavigationColl from "../components/todos/collections/Navigation";
import {useEffect, useLayoutEffect, useState} from "react";

import {FetchCollectionItem} from "../hooks/FetchCollectionsHook";
import Loader from "../../../src/components/UI/Loader";
import {useSelector} from "react-redux";


const ItemsCollections = () => {
    const {id: collid} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, error, fetchdata] = FetchCollectionItem({id: collid, loading: setLoading})
    const {isloading} = useSelector(state => state.register);

    useEffect(() => {
        fetchdata();
    }, [isloading, collid]);

    const back = () => {
        return navigate('/collections');
    };


    if (error) {
        // collection not found {setTimeout(() => back(), 2000)}
        return <div>{error}</div>;
    }
    if (loading) {
        return <Loader/>;
    }
    return (
        <>
            <div className={css.itemsContainer}>
                {/*collections navigation bar in computer mode*/}
                <NavigationColl/>

                <div className={css.itemColl}>
                    <div className={css.header}>
                        <div className={css.header_left}>
                            <div onClick={back} className={css.header_left_icon}>
                                <i className="las la-angle-left"></i>
                            </div>
                            <div className={css.header_left_name}>
                                {data.collection}
                            </div>
                        </div>

                        <div className={css.option}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>


                    <div className={css.items}>
                        <Items
                            collId={collid}
                            data={data}
                            loading={loading}
                            isloading={setLoading}
                        />
                    </div>
                </div>

            </div>

        </>
    );
};

export default ItemsCollections;
