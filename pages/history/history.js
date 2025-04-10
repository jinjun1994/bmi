var e = require("../../@babel/runtime/helpers/toConsumableArray");
Page({
  data: {
    records: [],
    showTrendAnalysis: !1,
    weightTrend: "",
    bmiTrend: "",
    currentProfileId: "",
    isViewingOtherProfile: !1,
    viewingProfileName: "",
    maleWeightStandard: [],
    femaleWeightStandard: [],
    ageWeightStandard: [],
    bottomPadding: 0
  },
  onLoad: function() {
    var e = this;
    this.loadRecords(), this.generateWeightStandards(), wx.getSystemInfo({
      success: function(t) {
        var a = t.screenHeight - t.safeArea.bottom;
        e.setData({
          bottomPadding: a + 60
        })
      }
    })
  },
  onShow: function() {
    var e = wx.getStorageSync("temp_view_profile_id");
    e ? (this.loadProfileRecords(e), wx.removeStorageSync("temp_view_profile_id")) : this.loadRecords()
  },
  loadRecords: function() {
    var e = wx.getStorageSync("current_profile_id");
    if (e) {
      var t = (wx.getStorageSync("all_bmi_records") || {})[e] || [];
      this.setData({
        records: t,
        currentProfileId: e
      }), t.length >= 2 && (this.analyzeTrends(t), this.drawWeightChart(t), this.drawBmiChart(t), this.drawHeightChart(t))
    } else this.setData({
      records: []
    })
  },
  analyzeTrends: function(e) {
    // 反转数据顺序，使最新数据显示在右侧
    e = e.slice().reverse();
    var t = e.slice(0, 5),
      a = this.calculateTrend(t.map(function(e) {
        return e.weight;
      })),
      i = this.calculateTrend(t.map(function(e) {
        return parseFloat(e.bmi);
      }));
    this.setData({
      showTrendAnalysis: !0,
      weightTrend: this.getTrendText(a, "体重"),
      bmiTrend: this.getTrendText(i, "BMI")
    });
  },
  calculateTrend: function(e) {
    if (e.length < 2) return "stable";
    var t = e[0],
      a = e[1],
      i = (t - a) / a * 100;
    return Math.abs(i) < 1 ? "stable" : i > 0 ? "increasing" : "decreasing"
  },
  getTrendText: function(e, t) {
    return "您的".concat(t, "stable" === e ? "保持稳定" : "increasing" === e ? "呈上升趋势" : "呈下降趋势")
  },
  clearRecords: function() {
    var e = this,
      t = this.data.currentProfileId;
    if (t) {
      var a = this.data.isViewingOtherProfile,
        i = "确定要清除所有记录吗？";
      a && (i = "确定要清除".concat(this.data.viewingProfileName, "的所有记录吗？")), wx.showModal({
        title: "确认清除",
        content: i,
        success: function(i) {
          if (i.confirm) {
            var r = wx.getStorageSync("all_bmi_records") || {};
            r[t] = [], wx.setStorageSync("all_bmi_records", r), e.setData({
              records: [],
              showTrendAnalysis: !1
            }), wx.showToast({
              title: "记录已清除",
              icon: "success"
            }), a && wx.navigateBack()
          }
        }
      })
    }
  },
  shareToFriends: function() {
    if (wx.showLoading({
        title: "正在生成分享图..."
      }), 0 === this.data.records.length) return wx.showToast({
      title: "暂无记录可分享",
      icon: "none"
    }), void wx.hideLoading();
    this.data.records.length >= 2 ? this.shareMultipleRecords() : this.shareSingleRecord()
  },
  shareMultipleRecords: function() {
    // 创建Canvas上下文
    const query = wx.createSelectorQuery();
    query.select('#shareCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 设置Canvas大小
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = 300 * dpr;
        canvas.height = 900 * dpr;
        ctx.scale(dpr, dpr);
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制背景
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 300, 900);
        
        // 绘制标题
        ctx.font = "18px sans-serif";
        ctx.fillStyle = "#4776E6";
        ctx.textAlign = "center";
        ctx.fillText("健康数据趋势分析", 150, 40);
        
        // 绘制最新记录日期
        var latestRecord = this.data.records[this.data.records.length - 1];
        ctx.font = "14px sans-serif";
        ctx.fillStyle = "#333333";
        ctx.textAlign = "center";
        ctx.fillText("记录日期: " + latestRecord.formattedDate, 150, 70);
        
        // 绘制分隔线
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#eeeeee";
        ctx.beginPath();
        ctx.moveTo(20, 85);
        ctx.lineTo(280, 85);
        ctx.stroke();
        
        // 绘制体重趋势图
        this.drawWeightChartForShare(ctx, 20, 100, 260, 200);
        
        // 绘制BMI趋势图
        this.drawBmiChartForShare(ctx, 20, 320, 260, 200);
        
        // 绘制身高趋势图
        this.drawHeightChartForShare(ctx, 20, 540, 260, 200);
        
        // 绘制底部信息
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#999999";
        ctx.textAlign = "center";
        ctx.fillText("扫描小程序码，测算您的BMI和健康数据", 150, 770);
        
        ctx.font = "10px sans-serif";
        ctx.fillStyle = "rgba(150, 150, 150, 0.5)";
        ctx.fillText("BMI标准体重计算器助手", 150, 800);
        
        // 生成图片
        wx.canvasToTempFilePath({
          canvas: canvas,
          x: 0,
          y: 0,
          width: 300,
          height: 900,
          destWidth: 300,
          destHeight: 900,
          success: function(e) {
            var t = e.tempFilePath;
            wx.hideLoading();
            wx.showShareImageMenu({
              path: t,
              success: function() {
                wx.showToast({
                  title: "图片已准备分享",
                  icon: "success"
                });
              },
              fail: function(e) {
                console.error("分享图片失败", e);
                wx.showToast({
                  title: "分享图片失败",
                  icon: "none"
                });
              }
            });
          },
          fail: function(e) {
            wx.hideLoading();
            console.error("生成图片失败", e);
            wx.showToast({
              title: "生成图片失败",
              icon: "none"
            });
          }
        });
      });
  },
  drawWeightChartForShare: function(ctx, x, y, width, height) {
    var records = this.data.records.slice().reverse();
    
    // 绘制图表背景
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(x, y, width, height);
    
    // 绘制标题
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "left";
    ctx.fillText("体重变化趋势", x + 10, y + 20);
    
    // 计算体重数据
    var weightData = records.map(function(r) { return r.weight; });
    var maxWeight = Math.max.apply(Math, weightData);
    var minWeight = Math.min.apply(Math, weightData);
    var range = (maxWeight - minWeight) * 1.2;
    var scale = range > 0 ? (height - 40) / range : 0;
    
    // 绘制坐标轴
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#999";
    ctx.beginPath();
    ctx.moveTo(x + 40, y + height - 20);
    ctx.lineTo(x + width - 20, y + height - 20);
    ctx.stroke();
    
    // 绘制体重趋势线
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#4776E6";
    ctx.fillStyle = "#4776E6";
    
    var points = records.map(function(r, i) {
      var pointX = x + 40 + (i * (width - 60)) / (records.length - 1);
      var pointY = y + height - 20 - ((r.weight - minWeight) * scale);
      return { x: pointX, y: pointY };
    });
    
    // 绘制连接线
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    
    // 绘制数据点
    points.forEach(function(point) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // 绘制日期标签
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#666";
    records.forEach(function(r, i) {
      var date = r.formattedDate.split("-");
      var labelX = x + 40 + (i * (width - 60)) / (records.length - 1);
      ctx.fillText(date[1] + "/" + date[2], labelX - 10, y + height);
    });
  },
  drawBmiChartForShare: function(ctx, x, y, width, height) {
    var records = this.data.records.slice().reverse();
    
    // 绘制图表背景
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(x, y, width, height);
    
    // 绘制标题
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "left";
    ctx.fillText("BMI变化趋势", x + 10, y + 20);
    
    // 计算BMI数据
    var bmiData = records.map(function(r) { return parseFloat(r.bmi); });
    var maxBmi = Math.max.apply(Math, bmiData);
    var minBmi = Math.min.apply(Math, bmiData);
    var range = (maxBmi - minBmi) * 1.2;
    var scale = range > 0 ? (height - 40) / range : 0;
    
    // 绘制坐标轴
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#999";
    ctx.beginPath();
    ctx.moveTo(x + 40, y + height - 20);
    ctx.lineTo(x + width - 20, y + height - 20);
    ctx.stroke();
    
    // 绘制BMI趋势线
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#43e97b";
    ctx.fillStyle = "#43e97b";
    
    var points = records.map(function(r, i) {
      var pointX = x + 40 + (i * (width - 60)) / (records.length - 1);
      var pointY = y + height - 20 - ((parseFloat(r.bmi) - minBmi) * scale);
      return { x: pointX, y: pointY };
    });
    
    // 绘制连接线
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    
    // 绘制数据点
    points.forEach(function(point) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // 绘制日期标签
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#666";
    records.forEach(function(r, i) {
      var date = r.formattedDate.split("-");
      var labelX = x + 40 + (i * (width - 60)) / (records.length - 1);
      ctx.fillText(date[1] + "/" + date[2], labelX - 10, y + height);
    });
  },
  drawHeightChartForShare: function(ctx, x, y, width, height) {
    var records = this.data.records.slice().reverse();
    
    // 绘制图表背景
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(x, y, width, height);
    
    // 绘制标题
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "#333";
    ctx.textAlign = "left";
    ctx.fillText("身高变化趋势", x + 10, y + 20);
    
    // 计算身高数据
    var heightData = records.map(function(r) { return r.height; });
    var maxHeight = Math.max.apply(Math, heightData);
    var minHeight = Math.min.apply(Math, heightData);
    var range = (maxHeight - minHeight) * 1.2;
    var scale = range > 0 ? (height - 40) / range : 0;
    
    // 绘制坐标轴
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#999";
    ctx.beginPath();
    ctx.moveTo(x + 40, y + height - 20);
    ctx.lineTo(x + width - 20, y + height - 20);
    ctx.stroke();
    
    // 绘制身高趋势线
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffcc00";
    ctx.fillStyle = "#ffcc00";
    
    var points = records.map(function(r, i) {
      var pointX = x + 40 + (i * (width - 60)) / (records.length - 1);
      var pointY = y + height - 20 - ((r.height - minHeight) * scale);
      return { x: pointX, y: pointY };
    });
    
    // 绘制连接线
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    
    // 绘制数据点
    points.forEach(function(point) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // 绘制日期标签
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#666";
    records.forEach(function(r, i) {
      var date = r.formattedDate.split("-");
      var labelX = x + 40 + (i * (width - 60)) / (records.length - 1);
      ctx.fillText(date[1] + "/" + date[2], labelX - 10, y + height);
    });
  },
  shareSingleRecord: function() {
    var e = this.data.records[this.data.records.length - 1];
    
    // 创建Canvas上下文
    const query = wx.createSelectorQuery();
    query.select('#shareCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 设置Canvas大小
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = 300 * dpr;
        canvas.height = 800 * dpr;
        ctx.scale(dpr, dpr);
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制背景
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 300, 800);
        
        // 绘制标题
        ctx.font = "18px sans-serif";
        ctx.fillStyle = "#4776E6";
        ctx.textAlign = "center";
        ctx.fillText("BMI和健康数据", 150, 40);
        
        // 绘制最新记录日期
        ctx.font = "14px sans-serif";
        ctx.fillStyle = "#333333";
        ctx.textAlign = "center";
        ctx.fillText("记录日期: " + e.formattedDate, 150, 70);
        
        // 绘制分隔线
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#eeeeee";
        ctx.beginPath();
        ctx.moveTo(20, 85);
        ctx.lineTo(280, 85);
        ctx.stroke();
        
        // 绘制数据标签
        ctx.font = "14px sans-serif";
        ctx.textAlign = "left";
        ctx.fillStyle = "#666666";
        ctx.fillText("身高:", 40, 120);
        ctx.fillText("体重:", 40, 150);
        ctx.fillText("BMI:", 40, 180);
        ctx.fillText("体型:", 40, 210);
        
        // 绘制数据值
        ctx.fillStyle = "#333333";
        ctx.font = "14px sans-serif";
        ctx.fillText(e.height + " cm", 140, 120);
        ctx.fillText(e.weight + " kg", 140, 150);
        ctx.fillText(e.bmi, 140, 180);
        
        // 绘制体型状态（使用不同颜色）
        var a = "#333333";
        a = e.category === "正常" ? "#43e97b" : e.category === "偏瘦" ? "#5db9ff" : e.category === "偏胖" ? "#ffcc00" : "#ff3b30";
        ctx.fillStyle = a;
        ctx.fillText(e.category, 140, 210);
        
        // 绘制BMI趋势图（如果有两条或以上记录）
        if (this.data.records.length >= 2) {
          // 计算BMI趋势图的位置和大小
          var chartX = 20,
              chartY = 240,
              chartWidth = 260,
              chartHeight = 300;
          
          // 绘制图表背景
          ctx.fillStyle = "#f8f9fa";
          ctx.fillRect(chartX, chartY, chartWidth, chartHeight);
          
          // 绘制标题
          ctx.font = "14px sans-serif";
          ctx.fillStyle = "#333";
          ctx.textAlign = "left";
          ctx.fillText("BMI变化趋势", chartX + 10, chartY + 20);
          
          // 绘制坐标轴
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#999";
          ctx.beginPath();
          ctx.moveTo(chartX + 40, chartY + chartHeight - 20);
          ctx.lineTo(chartX + chartWidth - 20, chartY + chartHeight - 20);
          ctx.stroke();
          
          // 计算BMI数据点
          var records = this.data.records.slice().reverse();
          var bmiData = records.map(function(r) { return parseFloat(r.bmi); });
          var maxBmi = Math.max.apply(Math, bmiData);
          var minBmi = Math.min.apply(Math, bmiData);
          var range = (maxBmi - minBmi) * 1.2;
          var scale = range > 0 ? (chartHeight - 40) / range : 0;
          
          // 绘制BMI趋势线
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#43e97b";
          ctx.fillStyle = "#43e97b";
          
          var points = records.map(function(r, i) {
            var x = chartX + 40 + (i * (chartWidth - 60)) / (records.length - 1);
            var y = chartY + chartHeight - 20 - ((parseFloat(r.bmi) - minBmi) * scale);
            return { x: x, y: y };
          });
          
          // 绘制连接线
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.stroke();
          
          // 绘制数据点
          points.forEach(function(point) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
            ctx.fill();
          });
          
          // 绘制日期标签
          ctx.font = "10px sans-serif";
          ctx.fillStyle = "#666";
          records.forEach(function(r, i) {
            var date = r.formattedDate.split("-");
            var x = chartX + 40 + (i * (chartWidth - 60)) / (records.length - 1);
            ctx.fillText(date[1] + "/" + date[2], x - 10, chartY + chartHeight);
          });
        }
        
        // 绘制小程序二维码
        var qrCodeSize = 100;
        var qrCodeX = (300 - qrCodeSize) / 2;
        var qrCodeY = 560;
        
        // 绘制二维码背景
        ctx.fillStyle = "#f8f9fa";
        ctx.fillRect(qrCodeX - 10, qrCodeY - 10, qrCodeSize + 20, qrCodeSize + 20);
        
        // 绘制二维码
        const qrCode = canvas.createImage();
        qrCode.onload = () => {
          ctx.drawImage(qrCode, qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
          
          // 绘制底部信息
          ctx.font = "12px sans-serif";
          ctx.fillStyle = "#999999";
          ctx.textAlign = "center";
          ctx.fillText("扫描小程序码，测算您的BMI和健康数据", 150, 680);
          
          ctx.font = "10px sans-serif";
          ctx.fillStyle = "rgba(150, 150, 150, 0.5)";
          ctx.fillText("BMI标准体重计算器助手", 150, 700);
          
          // 生成图片
          wx.canvasToTempFilePath({
            canvas: canvas,
            x: 0,
            y: 0,
            width: 300,
            height: 800,
            destWidth: 300,
            destHeight: 800,
            success: function(e) {
              var t = e.tempFilePath;
              wx.hideLoading();
              wx.showShareImageMenu({
                path: t,
                success: function() {
                  wx.showToast({
                    title: "图片已准备分享",
                    icon: "success"
                  });
                },
                fail: function(e) {
                  console.error("分享图片失败", e);
                  wx.showToast({
                    title: "分享图片失败",
                    icon: "none"
                  });
                }
              });
            },
            fail: function(e) {
              wx.hideLoading();
              console.error("生成图片失败", e);
              wx.showToast({
                title: "生成图片失败",
                icon: "none"
              });
            }
          });
        };
        qrCode.src = "/images/qrcode.jpg";
      });
  },
  drawWeightChart: function(t) {
    this.chartRecords = t;
    // 反转数据顺序，使最新数据显示在右侧
    t = t.slice().reverse();
    
    var a = wx.createCanvasContext("weightChart"),
      i = 40,
      r = 20,
      n = 200,
      o = 150,
      s = t.length > 1 ? (n - 2 * i) / (t.length - 1) : 0;
    
    // 计算体重的最大最小值
    var l = Math.max.apply(Math, t.map(function(e) { return e.weight; })),
      c = Math.min.apply(Math, t.map(function(e) { return e.weight; })),
      d = (l - c) * 1.2,
      u = d > 0 ? o / d : 0;
    
    // 计算体重数据点
    var weightPoints = t.map(function(e, t) {
        return { x: i + t * s, y: r + o - (e.weight - c) * u };
      });
    
    // 绘制背景
    a.setFillStyle("#ffffff");
    a.fillRect(0, 0, 300, 200);
    
    // 绘制标题
    a.setFontSize(14);
    a.setFillStyle("#333");
    a.fillText("体重变化趋势图", i, 20);
    
    // 绘制坐标轴
    a.setLineWidth(1);
    a.setStrokeStyle("#999");
    a.beginPath();
    a.moveTo(i, r);
    a.lineTo(i, r + o);
    a.lineTo(i + n, r + o);
    a.stroke();
    
    // 绘制体重刻度
    a.setFontSize(10);
    a.setFillStyle("#666");
    for (var f = 0; f <= 4; f++) {
      var p = r + o - f * o / 4;
      a.beginPath();
      a.moveTo(i - 5, p);
      a.lineTo(i, p);
      a.stroke();
      a.fillText((c + f * d / 4).toFixed(1), i - 30, p + 3);
    }
    
    // 绘制体重趋势线
    a.setLineWidth(2);
    a.setStrokeStyle("#4776E6");
    a.setFillStyle("#4776E6");
    weightPoints.forEach(function(e, t) {
      a.beginPath();
      a.arc(e.x, e.y, 3, 0, 2 * Math.PI);
      a.fill();
      if (t < weightPoints.length - 1) {
        a.beginPath();
        a.moveTo(e.x, e.y);
        a.lineTo(weightPoints[t + 1].x, weightPoints[t + 1].y);
        a.stroke();
      }
    });
    
    // 绘制日期标签
    a.setFontSize(10);
    a.setFillStyle("#666");
    t.forEach(function(e, t) {
      var r = e.formattedDate.split("-");
      a.fillText(r[1] + "/" + r[2], i + t * s - 10, r + o + 15);
    });
    
    a.draw();
  },
  drawBmiChart: function(t) {
    this.chartRecords = t;
    t = t.slice().reverse();
    
    var a = wx.createCanvasContext("bmiChart"),
      i = 40,
      r = 20,
      n = 200,
      o = 150,
      s = t.length > 1 ? (n - 2 * i) / (t.length - 1) : 0;
    
    // 计算BMI的最大最小值
    var b = Math.max.apply(Math, t.map(function(e) { return parseFloat(e.bmi); })),
      m = Math.min.apply(Math, t.map(function(e) { return parseFloat(e.bmi); })),
      v = (b - m) * 1.2,
      w = v > 0 ? o / v : 0;
    
    // 计算BMI数据点
    var bmiPoints = t.map(function(e, t) {
        return { x: i + t * s, y: r + o - (parseFloat(e.bmi) - m) * w };
      });
    
    // 绘制背景
    a.setFillStyle("#ffffff");
    a.fillRect(0, 0, 300, 200);
    
    // 绘制标题
    a.setFontSize(14);
    a.setFillStyle("#333");
    a.fillText("BMI变化趋势图", i, 20);
    
    // 绘制坐标轴
    a.setLineWidth(1);
    a.setStrokeStyle("#999");
    a.beginPath();
    a.moveTo(i, r);
    a.lineTo(i, r + o);
    a.lineTo(i + n, r + o);
    a.stroke();
    
    // 绘制BMI刻度
    a.setFontSize(10);
    a.setFillStyle("#666");
    for (var f = 0; f <= 4; f++) {
      var p = r + o - f * o / 4;
      a.beginPath();
      a.moveTo(i - 5, p);
      a.lineTo(i, p);
      a.stroke();
      a.fillText((m + f * v / 4).toFixed(1), i - 30, p + 3);
    }
    
    // 绘制BMI趋势线
    a.setLineWidth(2);
    a.setStrokeStyle("#43e97b");
    a.setFillStyle("#43e97b");
    bmiPoints.forEach(function(e, t) {
      a.beginPath();
      a.arc(e.x, e.y, 3, 0, 2 * Math.PI);
      a.fill();
      if (t < bmiPoints.length - 1) {
        a.beginPath();
        a.moveTo(e.x, e.y);
        a.lineTo(bmiPoints[t + 1].x, bmiPoints[t + 1].y);
        a.stroke();
      }
    });
    
    // 绘制日期标签
    a.setFontSize(10);
    a.setFillStyle("#666");
    t.forEach(function(e, t) {
      var r = e.formattedDate.split("-");
      a.fillText(r[1] + "/" + r[2], i + t * s - 10, r + o + 15);
    });
    
    a.draw();
  },
  drawHeightChart: function(t) {
    this.chartRecords = t;
    t = t.slice().reverse();
    
    var a = wx.createCanvasContext("heightChart"),
      i = 40,
      r = 20,
      n = 200,
      o = 150,
      s = t.length > 1 ? (n - 2 * i) / (t.length - 1) : 0;
    
    // 计算身高的最大最小值
    var h = Math.max.apply(Math, t.map(function(e) { return e.height; })),
      g = Math.min.apply(Math, t.map(function(e) { return e.height; })),
      y = (h - g) * 1.2,
      k = y > 0 ? o / y : 0;
    
    // 计算身高数据点
    var heightPoints = t.map(function(e, t) {
        return { x: i + t * s, y: r + o - (e.height - g) * k };
      });
    
    // 绘制背景
    a.setFillStyle("#ffffff");
    a.fillRect(0, 0, 300, 200);
    
    // 绘制标题
    a.setFontSize(14);
    a.setFillStyle("#333");
    a.fillText("身高变化趋势图", i, 20);
    
    // 绘制坐标轴
    a.setLineWidth(1);
    a.setStrokeStyle("#999");
    a.beginPath();
    a.moveTo(i, r);
    a.lineTo(i, r + o);
    a.lineTo(i + n, r + o);
    a.stroke();
    
    // 绘制身高刻度
    a.setFontSize(10);
    a.setFillStyle("#666");
    for (var f = 0; f <= 4; f++) {
      var p = r + o - f * o / 4;
      a.beginPath();
      a.moveTo(i - 5, p);
      a.lineTo(i, p);
      a.stroke();
      a.fillText((g + f * y / 4).toFixed(0), i - 30, p + 3);
    }
    
    // 绘制身高趋势线
    a.setLineWidth(2);
    a.setStrokeStyle("#ffcc00");
    a.setFillStyle("#ffcc00");
    heightPoints.forEach(function(e, t) {
      a.beginPath();
      a.arc(e.x, e.y, 3, 0, 2 * Math.PI);
      a.fill();
      if (t < heightPoints.length - 1) {
        a.beginPath();
        a.moveTo(e.x, e.y);
        a.lineTo(heightPoints[t + 1].x, heightPoints[t + 1].y);
        a.stroke();
      }
    });
    
    // 绘制日期标签
    a.setFontSize(10);
    a.setFillStyle("#666");
    t.forEach(function(e, t) {
      var r = e.formattedDate.split("-");
      a.fillText(r[1] + "/" + r[2], i + t * s - 10, r + o + 15);
    });
    
    a.draw();
  },
  loadProfileRecords: function(e) {
    var t = (wx.getStorageSync("user_profiles") || []).find((function(t) {
      return t.id === e
    }));
    if (t) {
      var a = (wx.getStorageSync("all_bmi_records") || {})[e] || [];
      this.setData({
        records: a,
        currentProfileId: e,
        isViewingOtherProfile: !0,
        viewingProfileName: t.name
      }), a.length >= 2 && (this.analyzeTrends(a), this.drawWeightChart(a), this.drawBmiChart(a), this.drawHeightChart(a))
    } else this.loadRecords()
  },
  goBack: function() {
    wx.navigateBack()
  },
  generateWeightStandards: function() {
    for (var e = [], t = [], a = 160; a <= 190; a += 5) {
      var i = a - 105,
        r = Math.round(.9 * i),
        n = Math.round(1.1 * i);
      e.push({
        height: a,
        standard: i,
        range: "".concat(r, "-").concat(n)
      })
    }
    for (var o = 150; o <= 175; o += 5) {
      var s = o - 110,
        l = Math.round(.9 * s),
        c = Math.round(1.1 * s);
      t.push({
        height: o,
        standard: s,
        range: "".concat(l, "-").concat(c)
      })
    }
    this.setData({
      maleWeightStandard: e,
      femaleWeightStandard: t,
      ageWeightStandard: [{
        ageRange: "18岁以下",
        femaleBMI: "18.5-23",
        maleBMI: "19-24"
      }, {
        ageRange: "18-39岁",
        femaleBMI: "19-24",
        maleBMI: "20-25"
      }, {
        ageRange: "40-59岁",
        femaleBMI: "20-25",
        maleBMI: "21-26"
      }, {
        ageRange: "60岁以上",
        femaleBMI: "21-26",
        maleBMI: "22-27"
      }]
    })
  },
  showDeleteRecordConfirm: function(e) {
    var t = this,
      a = e.currentTarget.dataset.index,
      i = this.data.records[a];
    wx.showModal({
      title: "删除记录",
      content: "确定要删除 ".concat(i.formattedDate, " 的记录吗？"),
      confirmText: "删除",
      confirmColor: "#ff4d4f",
      success: function(e) {
        e.confirm && t.deleteRecord(a)
      }
    })
  },
  deleteRecord: function(t) {
    var a = e(this.data.records);
    a.splice(t, 1);
    var i = this.data.currentProfileId || wx.getStorageSync("current_profile_id"),
      r = wx.getStorageSync("all_bmi_records") || {};
    r[i] = a, wx.setStorageSync("all_bmi_records", r), this.setData({
      records: a
    }), a.length >= 2 ? (this.analyzeTrends(a), this.drawWeightChart(a), this.drawBmiChart(a), this.drawHeightChart(a)) : this.setData({
      showTrendAnalysis: !1
    }), wx.showToast({
      title: "记录已删除",
      icon: "success"
    })
  },
  onPullDownRefresh: function() {
    this.loadRecords(), wx.stopPullDownRefresh()
  },
  onShareAppMessage: function() {
    var e = this.data.isViewingOtherProfile ? this.data.viewingProfileName : "我";
    return {
      title: "".concat(e, "的BMI和体重变化趋势"),
      path: "pages/index/index",
      imageUrl: this.data.records.length >= 2 ? this.shareImagePath : ""
    }
  },
  onShareTimeline: function() {
    var e = this.data.isViewingOtherProfile ? this.data.viewingProfileName : "我";
    return {
      title: "".concat(e, "的BMI和体重变化趋势 - BMI标准体重计算器"),
      imageUrl: this.data.records.length >= 2 ? this.shareImagePath : ""
    }
  }
});