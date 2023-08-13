import React, {memo} from 'react';

type CategoriesProps = {
    value: number;
    onClickCategory: (i: number) => void;
}
const Categories: React.FC<CategoriesProps> = memo(({value, onClickCategory}) => {

    const categories: string[] = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => <li key={item}
                                                        className={value === index ? 'active' : ''}
                                                        onClick={() => onClickCategory(index)}>{item}</li>)
                }
            </ul>
        </div>
    );
});

export default Categories;