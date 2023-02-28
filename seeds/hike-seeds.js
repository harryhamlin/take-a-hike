const { Hike } = require(`../models`);

const hikeData = [
  {
    name: "Mt si",
    location: "north bend",
    difficulty: 3,
    description: "A beautiful hike",
    max_altitude: 1400,
    length: 2,
    rating: 5,
    user_id: 1
    
  },
  {
    name: "rattle snake",
    location: "rattle snake ridge",
    difficulty: 1,
    description: "noob stuff",
    max_altitude: 1000,
    length: 1,
    rating: 2,
    user_id: 2
    
    
  },
  {
    name: "panarama pointe",
    location: "mt rainier",
    difficulty: 4,
    description: "Hike was sick",
    max_altitude: 4000,
    length: 3,
    rating: 4,
    user_id: 3
  }
]

const seedHike = () => Hike.bulkCreate(hikeData);

module.exports = seedHike;