const express = require('express');
const router = express.Router();
const itemsQueries = require('../database/queries/itemsQuery.js');


router.get('/', async (req, res, next) => {
  try {
    let allItems = await itemsQueries.getAllItems();
    res.status(200)
      .json({
        payload: allItems,
        msg: "All items retrieved.",
        err: false
      })
  }
  catch (err) {
    res.json({
      payload: null,
      msg: "All items not retrieved",
      err: true
    })
  }
});

router.post('/', async (req, res, next) => {
  const { item_img, fabric_id, item_type, user_id, color } = req.body;
  try {
    let postedItem = await itemsQueries.postNewItem(item_img, fabric_id, item_type, user_id, color);
    res.status(200)
      .json({
        payload: postedItem,
        msg: "All items retrieved.",
        err: false
      })
  }
  catch (err) {
    console.log(err)
    res.json({
      payload: null,
      msg: "Item not posted",
      err: true
    })
  }
});

router.get('/:fabricId', async (req, res, next) => {
  let fabric_id = req.params.fabricId;
  try {
    let allItemsForFabric = await itemsQueries.getAllItemsForFabric(fabric_id);
    res.status(200)
      .json({
        payload: allItemsForFabric,
        msg: "All items retrieved.",
        err: false
      })
  }
  catch (err) {
    console.log(err)
    res.json({
      payload: null,
      msg: "All items not retrieved",
      err: true
    })
  }
});

module.exports = router;
