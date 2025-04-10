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
    var e = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: "weightChart",
      success: function(t) {
        var a = t.tempFilePath;
        e.data.isViewingOtherProfile && e.data.viewingProfileName;
        wx.hideLoading(), wx.showShareImageMenu({
          path: a,
          success: function() {
            wx.showToast({
              title: "图片已准备分享",
              icon: "success"
            })
          },
          fail: function(e) {
            console.error("分享图片失败", e), wx.showToast({
              title: "分享图片失败",
              icon: "none"
            })
          }
        })
      },
      fail: function(e) {
        wx.hideLoading(), console.error("生成图片失败", e), wx.showToast({
          title: "生成图片失败",
          icon: "none"
        })
      }
    })
  },
  shareSingleRecord: function() {
    var e = this.data.records[0],
      t = wx.createCanvasContext("shareCanvas");
    t.setFillStyle("#ffffff"), t.fillRect(0, 0, 300, 420), t.setFontSize(18), t.setFillStyle("#4776E6"), t.setTextAlign("center"), t.fillText("BMI和健康数据", 150, 40), t.setFontSize(14), t.setFillStyle("#333333"), t.setTextAlign("center"), t.fillText("记录日期: ".concat(e.formattedDate), 150, 70), t.setLineWidth(1), t.setStrokeStyle("#eeeeee"), t.beginPath(), t.moveTo(20, 85), t.lineTo(280, 85), t.stroke(), t.setFontSize(14), t.setTextAlign("left"), t.setFillStyle("#666666");
    t.fillText("身高:", 40, 120), t.fillText("体重:", 40, 150), t.fillText("BMI:", 40, 180), t.fillText("体型:", 40, 210), e.bmr && (t.fillText("基础代谢:", 40, 240), t.fillText("推荐饮水:", 40, 270), t.fillText("蛋白质需求:", 40, 300)), t.setFillStyle("#333333"), t.setFontSize(14), t.fillText("".concat(e.height, " cm"), 140, 120), t.fillText("".concat(e.weight, " kg"), 140, 150), t.fillText(e.bmi, 140, 180);
    var a = "#333333";
    a = "正常" === e.category ? "#43e97b" : "偏瘦" === e.category ? "#5db9ff" : "偏胖" === e.category ? "#ffcc00" : "#ff3b30", t.setFillStyle(a), t.fillText(e.category, 140, 210), e.bmr && (t.setFillStyle("#333333"), t.fillText("".concat(e.bmr, " 千卡/天"), 140, 240), t.fillText("".concat(e.recommendedWater, " 毫升/天"), 140, 270), t.fillText("".concat(e.proteinBase, "-").concat(e.proteinActive, " 克/天"), 140, 300)), t.setFontSize(12), t.setFillStyle("#999999"), t.setTextAlign("center"), t.fillText("扫描小程序码，测算您的BMI和健康数据", 150, 370), t.setFontSize(10), t.setFillStyle("rgba(150, 150, 150, 0.5)"), t.fillText("BMI标准体重计算器助手", 150, 400), t.draw(!1, (function() {
      setTimeout((function() {
        wx.canvasToTempFilePath({
          canvasId: "shareCanvas",
          success: function(e) {
            var t = e.tempFilePath;
            wx.hideLoading(), wx.showShareImageMenu({
              path: t,
              success: function() {
                wx.showToast({
                  title: "图片已准备分享",
                  icon: "success"
                })
              },
              fail: function(e) {
                console.error("分享图片失败", e), wx.showToast({
                  title: "分享图片失败",
                  icon: "none"
                })
              }
            })
          },
          fail: function(e) {
            wx.hideLoading(), console.error("生成图片失败", e), wx.showToast({
              title: "生成图片失败",
              icon: "none"
            })
          }
        })
      }), 200)
    }))
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