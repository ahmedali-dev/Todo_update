import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import AddCollections from "./Add-collection";
import css from "./collectionList.module.scss";

const CollectionsList = (props) => {
    const {pathname} = useLocation();
    const [addcoll, setAddcoll] = useState(false);
    //console.log(locations);
    return (
        <div className={css.list}>
            {addcoll ? (
                <AddCollections
                    placeholder={"Add collection"}
                    Cancel={() => setAddcoll(false)}
                />
            ) : null}

            {props.collectionlist.map((list) => (
                <Link
                    className={css.item}
                    to={`${pathname}/${list.id}`}
                    key={list.id}
                >
                    <div>
                        <div className={css.name}>{list.collection}</div>
                        {/*<div className={css.collInfo}>*/}
                        {/*    {list.completed.length}/{list.tasks.length}*/}
                        {/*</div>*/}
                    </div>
                </Link>
            ))}

            <div className={css.btn__addd} onClick={() => setAddcoll(!addcoll)}>
                <i className="las la-plus"></i>
            </div>
        </div>
    );
};
export default CollectionsList;
