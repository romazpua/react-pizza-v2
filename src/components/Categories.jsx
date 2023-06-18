import React, { useState } from 'react';

const Categories = ( { catigories } ) => {

    const [ activeIndex, setActiveIndex ] = useState( 0 )

    const onClickItem = ( index ) => {
        setActiveIndex( index )
    }

    return (
        <div className="categories">
            <ul>
                {
                    catigories.map( ( item, index ) => <li key={ item }
                                                          className={ activeIndex === index ? 'active' : '' }
                                                          onClick={ () => onClickItem( index ) }>
                        { item }</li> )
                }
            </ul>
        </div>
    );
};

export default Categories;