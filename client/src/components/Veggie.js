import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'
import { Link } from 'react-router-dom';


function Veggie() {

const apiKey = process.env.REACT_APP_API_KEY;

    const [veggie, setVeggie] = useState([])

    const Wrapper = styled.div` 
    margin: 4rem 0rem
    `

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative; 


    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;

    } 
    
    p{
        position: absolute; 
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }`

    const Gradient = styled.div` 
    z-index: 3; 
    position: absolute; 
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
    `
    useEffect(() => { 
      getVeggie ()
  }, [])

  const getVeggie = async() => { 

      const check = localStorage.getItem('veggie') // checking to see if popular is saved in LS if it is no fetching

      if(check){
          setVeggie(JSON.parse(check))
      } else { 
          const api = 
          await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9&tags=vegetarian`);
          const data = await api.json(); 

          localStorage.setItem('veggie', JSON.stringify(data.recipes)) // if not setting it and fetching api
          (data.recipes)
      }
      
     
  }; 

    
  return (
    <div>
      <div>  
        <Wrapper>
            <h3>Top Veggie Picks</h3>



            <Splide options={{
                perPage: 4,
                arrows: false, 
                pagination: false, 
                drag: "free",
                gap: "5rem",
            }}>
            {veggie.map((recipe) => (
                    <SplideSlide key={recipe.id}>
                   <Link to={'/recipe/' + recipe.id}> 
                   <Card>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient />
                    </Card>
                    </Link>
                    </SplideSlide>
            ))}
            </Splide>
        </Wrapper>
    </div>
    </div>
  )
}

export default Veggie