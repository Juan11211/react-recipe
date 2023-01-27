import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

function Cuisine() {
  
  const [cuisine, setCuisine] = useState([])
  let params = useParams();

  const apiKey = process.env.REACT_APP_API_KEY;


  const getCuisine = async(name) => { 
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=12&cuisine=${name}`);
    const recipe = await data.json(); 
    setCuisine(recipe.results)
  }
  

  useEffect(() => { 
    getCuisine(params.type)
  }, [params.type]) // 




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




  return (
    <Grid>
      {cuisine.map((item) => {
        return ( 
          <Card key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        )
      })}

    </Grid>
  )
}

export default Cuisine