const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../data/db.json');

// 读取评论数据
function readSuggestions() {
  if (!fs.existsSync(dbPath)) return [];
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
}

// 写入评论数据
function writeSuggestions(Suggestions) {
  fs.writeFileSync(dbPath, JSON.stringify(Suggestions, null, 2));
}

exports.getSuggestions = (req, res) => {
  const Suggestions = readSuggestions();
  res.json(Suggestions);
};

exports.addSuggestion = (req, res) => {
  const { content, nickname } = req.body;
  if (!content || !nickname) return res.status(400).json({ error: 'Content and nickname are required' });

  const newSuggestion = {
    id: uuidv4(),
    content,
    nickname,
    status: 'TODO',
    createdAt: new Date().toISOString()
  };

  const Suggestions = readSuggestions();
  Suggestions.push(newSuggestion);
  writeSuggestions(Suggestions);

  res.status(201).json(newSuggestion);
};


exports.updateSuggestionStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ['TODO', 'DOING', 'DONE', 'DELETE'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });

  const Suggestions = readSuggestions();
  const index = Suggestions.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: 'Suggestion not found' });

  Suggestions[index].status = status;
  writeSuggestions(Suggestions);

  res.json(Suggestions[index]);
};

exports.deleteSuggestion = (req, res) => {
  const { id } = req.params;
  const Suggestions = readSuggestions();
  const filtered = Suggestions.filter(c => c.id !== id);

  if (filtered.length === Suggestions.length) return res.status(404).json({ error: 'Suggestion not found' });

  writeSuggestions(filtered);
  res.status(204).send();
};
