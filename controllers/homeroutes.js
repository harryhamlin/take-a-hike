const router = require('express').Router();
const { Comment, Hike, User } = require('../models');
const { Op } = require('sequelize');

const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  const hikeData = await Hike.findAll({
    limit: 2
  });
  const hike = hikeData.map((singleHikeData) =>
    singleHikeData.get({ plain: true })
  );
  res.render("homepage", {
    logged_in: req.session.logged_in,
    posts: hike
  });
});

// render login form
router.get('/login', (req, res) => {

  res.render('login', {
    logged_in: req.session.logged_in
  });
});

// render signup form
router.get('/signup', (req, res) => {

  res.render('signup');
});

//this is the route that takes the user to their own profile page
router.get("/profile", withAuth, async (req, res) => {
  let hikeData = await Hike.findAll({

    where: { user_id: req.session.user_id },

  });
  hikeData = hikeData.map((singleHikeData) =>
    singleHikeData.get({ plain: true })
  );
  res.render("profile", {
    hikes: hikeData,
    css: 'profile.css',
    logged_in: req.session.logged_in
  });
});



//this route will get the specific hike you want to edit and take you to a page with just that hike
router.get("/profile/:id", withAuth, async (req, res) => {

  let hike = await Hike.findOne({
    where: {
      id: req.params.id,
    },
  });
  hike = hike.get({ plain: true });
  res.render("edithike", {
    hike,
    logged_in: req.session.logged_in
  });
});

//this is the route that edits and updates the hike and then sends u back to profile
router.put("/profile/:id", withAuth, async (req, res) => {
  await Hike.update(
    {
      name: req.body.hikename,
      location: req.body.hikelocation,
      difficulty: req.body.hikedifficulty,
      description: req.body.hikedescription,
      max_altitude: req.body.hikealtitude,
      length: req.body.hikelength,
      rating: req.body.hikerating,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.redirect("/profile");
});
//this route deletes hikes
router.delete("/profile/:id", withAuth, async (req, res) => {
  await Hike.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/profile");
});

// <====== harrys filter code ======>
router.get('/viewhikes', async (req, res) => {
  try {
    //<------ grabs each query parameter and assigns it to a value ------>
    const hike = req.query.location;
    const lengthUl = req.query.lengthUl;
    const lengthLl = req.query.lengthLl
    const difficulty = req.query.difficulty;
    //<------ variable 'filter' ------>
    let filter = {}
    //<------ if there exists a query parameter of each type, then that parameter is passed into the filter as a sequelize clause, in the case of length using sequelize operators to accomodate a range ------>
    if (hike) { filter.location = req.query.location };
    if (lengthUl && lengthLl) { filter.length = { [Op.gt]: req.query.lengthLl, [Op.lte]: req.query.lengthUl } };
    if (difficulty) { filter.difficulty = req.query.difficulty };
    //<------ sequelize findall with a where clause ------>
    const filteredHikes = await Hike.findAll({
      where: filter
    })
    const posts = filteredHikes.map((hike) => hike.get({ plain: true }))
    //<------ viewhikes view rendered with a 200 code ------>
    res.status(200).render('viewhikes', {
      posts: posts,
      logged_in: req.session.logged_in

    })
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/hike/:id", async (req, res) => {
  let hikePost = await Hike.findOne({
    where: {
      id: req.params.id,
      
    },
    include: [{ model: Comment }]
  });
  hikePost = hikePost.get({ plain: true });
  console.log(hikePost);
  res.render("hike_details", {
    hikePost,
    logged_in: req.session.logged_in
  });
});


// rating put route that we are no longer using.
// router.put('/hike/:hike_id', async (req, res) => {
//   console.log(req.params)
//   console.log(req.body)
//   // update a hike by its `id` value
//   await Hike.update(
//     {
//       // All the fields you can update and the data attached to the request body.
//       rating: req.body.rating,
      
//     },
//     {
//       // Gets a hike based on the hike_id given in the request parameters
//       where: {
//         id: req.params.hike_id,
//       },
//     }
//   )
//     .then((updatedHike) => {
//       res.json(updatedHike);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });

// });

module.exports = router
