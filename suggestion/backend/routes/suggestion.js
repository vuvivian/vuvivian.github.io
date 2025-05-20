const express = require('express');
const router = express.Router();

const controller = require('../controllers/suggestionController');

// 获取评论列表
router.get('/', controller.getSuggestions);

// 添加新评论
router.post('/', controller.addSuggestion);

// 更新评论状态
router.put('/:id', controller.updateSuggestionStatus);

// 删除评论
router.delete('/:id', controller.deleteSuggestion);

module.exports = router;