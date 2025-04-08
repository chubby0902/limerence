// 问题数据
const questions = [
    {
      "id": 1,
      "category": "侵入性思维",
      "text": "我清醒时超过50%的时间都在想关于LO（迷恋对象）的事，即使努力也无法停止。"
    },
    {
      "id": 2,
      "category": "侵入性思维",
      "text": "我会反复回忆与LO的微小互动细节（如TA的一句话、一个眼神），并赋予特殊意义。"
    },
    {
      "id": 3,
      "category": "侵入性思维",
      "text": "我经常虚构与LO的未来场景（如恋爱、生活），这些幻想比现实更让我满足。"
    },
    {
      "id": 4,
      "category": "情感两极波动",
      "text": "LO的一条消息或点赞能让我极度兴奋，甚至持续一整天。"
    },
    {
      "id": 5,
      "category": "情感两极波动",
      "text": "如果LO没有及时回应，我会陷入焦虑、自我怀疑或躯体不适（如心慌、胃痛）。"
    },
    {
      "id": 6,
      "category": "情感两极波动",
      "text": "我的情绪像\"过山车\"，完全由LO的行为主导，无法自我调节。"
    },
    {
      "id": 7,
      "category": "理想化投射",
      "text": "我认为LO是\"完美\"的，即使发现TA的缺点，也会主动为其找借口（如\"TA冷漠只是太忙\"）。"
    },
    {
      "id": 8,
      "category": "理想化投射",
      "text": "我坚信LO是唯一能让我幸福的人，其他人无法替代。"
    },
    {
      "id": 9,
      "category": "理想化投射",
      "text": "如果他人指出LO的不足，我会感到愤怒或拒绝接受。"
    },
    {
      "id": 10,
      "category": "强迫行为",
      "text": "我会频繁查看LO的社交媒体动态，甚至分析TA的在线状态。"
    },
    {
      "id": 11,
      "category": "强迫行为",
      "text": "我刻意制造与LO的\"偶遇\"或找借口联系TA，即使理由牵强。"
    },
    {
      "id": 12,
      "category": "强迫行为",
      "text": "我收集与LO相关的物品（如照片、聊天记录），并反复查看。"
    },
    {
      "id": 13,
      "category": "现实功能影响",
      "text": "这种状态已持续超过3个月，且干扰了我的工作/学习效率。"
    },
    {
      "id": 14,
      "category": "现实功能影响",
      "text": "我因过度关注LO而忽视朋友、家庭或自己的健康。"
    },
    {
      "id": 15,
      "category": "现实功能影响",
      "text": "即使知道LO不适合我（如TA有伴侣/对我无兴趣），我仍无法抽离。"
    }
  ]

    
  

  
  // 初始化表单
  function initForm() {
    const container = document.getElementById('questions-container');
    
    questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question-group p-4 border border-gray-200 rounded-lg';
      
      questionDiv.innerHTML = `
        <h3 class="text-lg font-medium mb-3">${q.text}</h3>
        <div class="options grid grid-cols-5 gap-2">
          ${[1, 2, 3, 4, 5].map(score => `
            <label class="option-label flex flex-col items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
              <input type="radio" name="q${q.id}" value="${score}" class="hidden peer" required>
              <span class="score font-medium peer-checked:text-indigo-600">${score}</span>
              <span class="text-xs text-gray-500 peer-checked:text-indigo-500">${getOptionText(score)}</span>
            </label>
          `).join('')}
        </div>
      `;
      
      container.appendChild(questionDiv);
    });
  }
  
  // 获取选项描述文本
  function getOptionText(score) {
    const texts = {
      1: "完全不符",
      2: "较少符合",
      3: "有时符合",
      4: "较符合",
      5: "完全符合"
    };
    return texts[score];
  }
  
  // 表单提交处理
  document.getElementById('limerence-test').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const answers = [];
    
    // 收集所有答案
    questions.forEach(q => {
      answers.push(parseInt(formData.get(`q${q.id}`)));
    });
    
    // 计算结果
    showResults(answers);
  });
  
  // 显示结果
  function showResults(answers) {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    
    // 计算各维度得分
    const categoryScores = {
      "侵入性思维": answers.slice(0, 3).reduce((a, b) => a + b, 0),
      "情感两极波动": answers.slice(3, 6).reduce((a, b) => a + b, 0),
      "理想化投射": answers.slice(6, 9).reduce((a, b) => a + b, 0),
      "强迫行为": answers.slice(9, 12).reduce((a, b) => a + b, 0),
      "现实功能影响": answers.slice(12, 15).reduce((a, b) => a + b, 0)
    };
    
    // 确定风险等级
    let riskLevel, advice;
    if (totalScore <= 30) {
      riskLevel = "低风险";
      advice = "你的情感状态较平稳，无明显Limerence倾向。保持健康的情感边界即可。";
    } else if (totalScore <= 50) {
      riskLevel = "中度风险";
      advice = "你表现出一定的Limerence特征，建议减少对LO的关注，培养新兴趣。";
    } else {
      riskLevel = "高风险";
      advice = "你可能处于\"迷恋上瘾\"状态，建议寻求心理咨询或行为干预。";
    }
    
    // 更新UI
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('risk-level').textContent = riskLevel;
    document.getElementById('general-advice').textContent = advice;
    
    // 生成详细建议
    document.getElementById('detailed-advice').innerHTML = generateDetailedAdvice(riskLevel, categoryScores);
    
    // 绘制图表
    renderChart(categoryScores);
    
    // 显示结果区域
    document.getElementById('test-form').classList.add('hidden');
    document.getElementById('results-container').classList.remove('hidden');
  }
  
  // 生成详细建议
  function generateDetailedAdvice(riskLevel, categoryScores) {
    let advice = '';
    
    if (riskLevel === "高风险") {
      advice += `<p class="mb-3">你表现出强烈的Limerence特征，这可能会影响你的日常生活和情感健康。建议考虑以下措施：</p>
                <ul class="list-disc pl-5 space-y-1 mb-4">
                  <li>寻求心理咨询师或心理医生的专业帮助</li>
                  <li>尝试减少与LO（迷恋对象）的接触</li>
                  <li>培养新的兴趣爱好转移注意力</li>
                  <li>练习正念冥想，减少侵入性思维</li>
                </ul>`;
    }
    // 其他风险等级的建议...
    
    // 针对高分的特定维度给出建议
    Object.entries(categoryScores).forEach(([category, score]) => {
      if (score >= 12) {
        advice += `<div class="mt-3 p-3 bg-white rounded-md border border-gray-200">
                  <h4 class="font-medium mb-1">${category} (${score}/15)</h4>
                  <p>${getCategoryAdvice(category)}</p>
                </div>`;
      }
    });
    
    return advice;
  }
  
  // 获取特定类别的建议
  function getCategoryAdvice(category) {
    const adviceMap = {
      "侵入性思维": "尝试'思维停止'技术，当注意到自己在想LO时，立即转移注意力到具体任务上。",
      "情感两极波动": "练习情绪调节技巧，如深呼吸或写日记记录情绪变化。",
      "理想化投射": "列出LO的缺点清单，与你的理想化想象进行对比。",
      "强迫行为": "设定查看LO社交媒体的时间限制，逐步减少频率。",
      "现实功能影响": "制定每日任务清单，优先完成与LO无关的重要事项。"
    };
    
    return adviceMap[category] || "保持自我觉察，记录相关行为模式。";
  }
  
  // 绘制图表
  function renderChart(categoryScores) {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(categoryScores),
        datasets: [{
          label: '得分',
          data: Object.values(categoryScores),
          backgroundColor: 'rgba(79, 70, 229, 0.7)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 15,
            ticks: {
              stepSize: 3
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
  
  // 重新测试按钮
  document.getElementById('retake-btn').addEventListener('click', function() {
    document.getElementById('results-container').classList.add('hidden');
    document.getElementById('test-form').classList.remove('hidden');
    window.scrollTo(0, 0);
  });
  
  // 初始化
  document.addEventListener('DOMContentLoaded', initForm);