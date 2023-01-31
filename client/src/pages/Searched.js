import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';




function Searched() { 
    
    const Grid = styled.div` 
    display: grid; 
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3rem;
    `;

    const Card = styled.div` 
      height: 20rem;
      img { 
        width: 100%;
        object-fit: cover;
        border-radius: 2rem; 
     }
     a{
      text-decoration: none; 
     }
     h4{
      text-align: center; 
      padding: 1rem; 
     }
     `

    
    const apiKey = process.env.REACT_APP_API_KEY;

    const [searched, setSearched] = useState([])
    
    let params = useParams()

    const getSearched = async(name) => { 
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=12&query=${name}`);
    const recipe = await data.json(); 
    setSearched(recipe.results)
}

    useEffect(() => { 
        getSearched(params.search);
    }, [params.search])


  return (
    <Grid> 
        {searched.map((item) => {
            return ( 
                <Card key={item.id}>
                <Link to={'/recipe/' + item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                </Link>
               </Card>
                
            )
        })}
        
 
    </Grid>
  )
}

export default Searched