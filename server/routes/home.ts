import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send(
    '<h1>Nothing to see here</h1><p>Try making a call to one of the novel or user routes</p>'
  );
});

export default router;
