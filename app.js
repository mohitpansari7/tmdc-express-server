const express = require('express')
const axios = require('axios').default
const cors = require('cors')

const app = express()
const developmentBaseUrl = 'http://localhost:3002'

app.use(cors())
app.use(express.json())

app.get('/movieNames', async (req,res) => {
    try{
        let result = await (await axios.get(`${developmentBaseUrl}/movies`)).data
        let movieName = result.map(element => {
            let {id, title} = element
            return {id, title}
        })
        res.status(201).json(movieName)
    } catch(err) {
        console.log('Error occurred at get MovieNames', err)
        res.status(404).json({
            message : err.message
        })
    }
})

app.get('/genres', async (req, res) => {
    try{
        let genresRes = []
        let result = await (await axios.get(`${developmentBaseUrl}/movies`)).data
        result.map(item => {
            item.genres.forEach(element => {
                if( !genresRes.includes(element)){
                    genresRes.push(element)
                }
            })
        })
        res.status(201).json(genresRes)
    } catch(err) {
        console.log('Error occured at getGenres', err)
        res.status(404).json({
            message : err.message
        })
    }
})

app.get('/movieByGenre', async (req, res) => {
    try {
        let genre = req.query.genre
        let result = await ( await axios.get(`${developmentBaseUrl}/movies`)).data
        result = result.filter(item => item.genres.includes(genre)).map(item => {
            let {id, title} = item
            return {id, title}
        })
        res.status(201).json(result)
    } catch(err) {
        console.log('Error occurred at get MovieByGenre', err)
        res.status(404).json({
            message : err.message
        })
    }
})

app.get('/movieDetails', async (req, res) => {
    try{
        let movieName = req.query.movieName
        let result = await (await axios.get(`${developmentBaseUrl}/movies`)).data
        result = result.filter(item => item.title === movieName)
        res.status(201).json(result)
    } catch(err) {
        console.log('Error occurred at get MovieDetails', err)
        res.status(404).json({
            message : err.message
        })
    }
})

app.put('/updateMovie', async (req, res) => {
    try{
        console.log(req)
        let movie = req.body[0]
        let movieId = movie.id

        let result = await (await axios.put(`${developmentBaseUrl}/movies/${movieId}`, movie)).data
        res.status(201).json(result)
    } catch(err) {
        console.log('Error occurred at PUT updateMovie', err)
        res.status(404).json({
            message : err.message
        })
    }
})

app.listen(3001, () => {
    console.log('Server running on port 3001')
})