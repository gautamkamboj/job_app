const express = require('express');
const app = express();
app.use(express.json());

let jobs = [];

app.post('/jobs', (req, res) => {
  const job = req.body;
  jobs.push(job);
  res.status(201).json(job);
});

app.put('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedJob = req.body;
  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Job not found' });
  }

  jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
  res.json(jobs[jobIndex]);
});

app.delete('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const jobIndex = jobs.findIndex((job) => job.id === id);

  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Job not found' });
  }

  const deletedJob = jobs.splice(jobIndex, 1)[0];
  res.json(deletedJob);
});

app.get('/jobs', (req, res) => {
  res.json(jobs);
  console.log(jobs);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});