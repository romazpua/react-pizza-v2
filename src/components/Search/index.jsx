import React, { useCallback, useContext, useRef, useState } from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce'

const Search = () => {

    const [ value, setValue ] = useState( '' )
    const { setSearchValue } = useContext( SearchContext )
    const inputRef = useRef()

    const onClickClear = () => {
        setSearchValue( '' )
        setValue( '' )
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce( ( str ) => {
            setSearchValue( str )
        }, 1000 ), [] )

    const onChangeInput = ( event ) => {
        setValue( event.target.value )
        updateSearchValue( event.target.value )
    }

    return (
        <div className={ styles.root }>
            <svg className={ styles.icon } viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/>
                <path
                    d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
                    fill="#464646"/>
            </svg>
            <input ref={ inputRef }
                   value={ value }
                   onChange={ onChangeInput }
                   className={ styles.input }
                   type="text"
                   placeholder={ 'Search pizza...' }/>
            {
                value && <svg onClick={ onClickClear }
                              className={ styles.clear }
                              height="48"
                              viewBox="0 0 48 48"
                              width="48">
                    <path
                        d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                    <path d="M0 0h48v48h-48z" fill="none"/>
                </svg>
            }

        </div>
    )
}

export default Search