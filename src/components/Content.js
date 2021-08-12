//*********************************************** */
//
//         Content JS
//
//
//*********************************************** */
import React from 'react'
import "./Content.css"
import MovieDisplay from './MovieDisplay'
import SearchField from './SearchField'

function Content() {
    return (
        
        <div id ="content">
            <SearchField/>
            <MovieDisplay/>
        </div>
    
        
    )
}

export default Content
