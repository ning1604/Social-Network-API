const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router
    .router('/')
    // GET all thoughts
    .get(getThoughts)
    // POST a new thought
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    // GET a single thought by its _id
    .get(getSingleThought)
    // PUT to update a thought by its _id
    .put(updateThought)
    // DELETE to remove a thought by its _id
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
    .route(':thoughtId/reactions')
    // POST to create a reaction
    .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route(':thoughtId/reactions/:reactionId')
    // DELETE to delete reaction by its _id
    .delete(deleteReaction);

module.exports = router;