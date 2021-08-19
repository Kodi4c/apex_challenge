//*********************************************** */
//
//         Content JS
//
//
//*********************************************** */
import React from 'react'
import "./Content.css"
// import MovieDisplay from './MovieDisplay'
import SearchField from './SearchField'
import QueryComponent from './QueryComponent'

function Content() {
    return (
        
        <div id ="content">
            <SearchField/>
            <QueryComponent/>
        </div>
    
        
    )
}

export default Content
