import React, { useState } from 'react';

const Categories = ( { sortItems } ) => {

    const [ activeIndex, setActiveIndex ] = useState( 0 )

    const onClickItem = ( index ) => {
        setActiveIndex( index )
    }

    return (
        <div className="categories">
            <ul>
                {
                    sortItems.map( ( item, index ) => <li key={ item }
                                                          className={ activeIndex === index ? 'active' : '' }
                                                          onClick={ () => onClickItem( index ) }>
                        { item }</li> )
                }
            </ul>
        </div>
    );
};

export default Categories;