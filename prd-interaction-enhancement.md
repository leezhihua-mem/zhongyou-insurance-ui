# PRD: 原型交互完善

## 项目概述

完善用药手册原型的交互功能，使其更接近真实应用体验。

## 目标

1. 实现搜索过滤功能
2. 实现症状自查分析逻辑
3. 实现用药提醒数据持久化
4. 实现查询记录动态存储
5. 增强AI问答体验
6. 添加页面过渡动画

## 用户故事

### US-001: 搜索过滤功能
**描述:** 用户输入关键词后，实时过滤显示匹配的药品/疾病

**验收标准:**
- [ ] 搜索框支持输入
- [ ] 实时过滤药品列表
- [ ] 实时过滤疾病列表
- [ ] 无结果时显示提示
- [ ] 支持清空搜索

**优先级:** P0

---

### US-002: 症状自查分析
**描述:** 用户选择症状后，显示可能的疾病建议

**验收标准:**
- [ ] 症状可多选
- [ ] 点击"开始分析"显示结果
- [ ] 结果显示可能疾病+概率
- [ ] 提供就医建议
- [ ] 可重新选择

**优先级:** P0

---

### US-003: 用药提醒管理
**描述:** 用户可添加/编辑/删除用药提醒

**验收标准:**
- [ ] 添加新提醒（药品名、时间、剂量）
- [ ] 编辑已有提醒
- [ ] 删除提醒
- [ ] 标记已完成
- [ ] LocalStorage持久化

**优先级:** P1

---

### US-004: 查询记录存储
**描述:** 自动记录用户查询历史

**验收标准:**
- [ ] 记录药品查询
- [ ] 记录疾病查询
- [ ] 记录症状自查
- [ ] 显示时间戳
- [ ] 可清空记录
- [ ] LocalStorage持久化

**优先级:** P1

---

### US-005: AI问答增强
**描述:** 提供更智能的AI回复

**验收标准:**
- [ ] 关键词匹配回复
- [ ] 常见问题快速回复
- [ ] 输入提示
- [ ] 对话历史显示
- [ ] 可清空对话

**优先级:** P2

---

### US-006: 页面过渡动画
**描述:** 页面切换时有流畅的过渡效果

**验收标准:**
- [ ] 页面淡入淡出
- [ ] 卡片加载动画
- [ ] 按钮点击反馈
- [ ] Toast提示动画

**优先级:** P2

---

## 技术方案

### 搜索过滤
```javascript
// 实时过滤药品列表
function filterMedicines(keyword) {
  const items = document.querySelectorAll('.drug-item');
  items.forEach(item => {
    const name = item.querySelector('.drug-name').textContent;
    if (name.includes(keyword)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
```

### 症状分析
```javascript
// 简单匹配算法
const symptomDiseaseMap = {
  '头痛': ['高血压', '偏头痛', '感冒'],
  '发热': ['感冒', '流感', '肺炎'],
  '咳嗽': ['感冒', '支气管炎', '肺炎']
};

function analyzeSymptoms(symptoms) {
  // 统计疾病出现次数
  const diseaseCount = {};
  symptoms.forEach(symptom => {
    const diseases = symptomDiseaseMap[symptom] || [];
    diseases.forEach(disease => {
      diseaseCount[disease] = (diseaseCount[disease] || 0) + 1;
    });
  });
  
  // 排序并返回
  return Object.entries(diseaseCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
}
```

### 数据持久化
```javascript
// LocalStorage工具
const Storage = {
  get(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
  },
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  add(key, item) {
    const data = this.get(key);
    data.unshift(item);
    this.set(key, data.slice(0, 50)); // 最多50条
  }
};
```

---

## 实施计划

| 优先级 | 任务 | 预计时间 |
|--------|------|---------|
| P0 | 搜索过滤 | 30分钟 |
| P0 | 症状分析 | 30分钟 |
| P1 | 用药提醒 | 30分钟 |
| P1 | 查询记录 | 20分钟 |
| P2 | AI问答增强 | 20分钟 |
| P2 | 过渡动画 | 20分钟 |

**总计:** 2.5小时

---

*创建时间: 2026-04-09 17:22*