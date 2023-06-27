import React from 'react';

const Categories = ( { categories, value, onClickCategory } ) => {

    // const [ activeIndex, setActiveIndex ] = useState( 0 )
    // const onClickItem = ( index ) => {
    //     setActiveIndex( index )
    // }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map( ( item, index ) => <li key={ item }
                                                          className={ value === index ? 'active' : '' }
                                                          // className={ activeIndex === index ? 'active' : '' }
                                                          // onClick={ () => onClickItem( index ) }
                                                          onClick={ () => onClickCategory( index ) }
                    >
                        { item }</li> )
                }
            </ul>
        </div>
    );
};

export default Categories;