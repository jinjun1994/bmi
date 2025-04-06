var e = require("../../@babel/runtime/helpers/defineProperty");
Page(e(e({
  data: {
    gender: "female",
    age: "",
    height: "",
    weight: "",
    bmi: "",
    category: "",
    categoryDesc: "",
    ageAnalysis: "",
    healthTips: "",
    indicatorPosition: 0,
    goalWeight: "",
    goalBMI: "",
    hasGoal: !1,
    weightDiff: 0,
    goalProgress: 0,
    currentProfileId: "",
    currentProfileName: "",
    bmr: 0,
    fatBurningHrMin: 0,
    fatBurningHrMax: 0,
    recommendedWater: 0,
    proteinBase: 0,
    proteinModerate: 0,
    proteinActive: 0,
    foodCategories: [],
    currentFoodCategory: "",
    currentFoods: [],
    allFoodCategories: [],
    showMoreCategories: !1,
    isCalculating: !1,
    lastScrollPosition: 0,
    preventAutoScroll: !1,
    idealWeightRange: ""
  },
  onGenderChange: function(e) {
    this.setData({
      gender: e.detail.value
    }), this.data.bmi && this.calculateBMI()
  },
  onAgeInput: function(e) {
    if (!this.checkProfileExists()) return {
      value: ""
    };
    var i = e.detail.value.replace(/\D/g, "");
    return this.setData({
      age: i
    }), {
      value: i
    }
  },
  onHeightInput: function(e) {
    if (!this.checkProfileExists()) return {
      value: ""
    };
    var i = e.detail.value.replace(/[^\d.]/g, "").replace(/\.+/g, ".").replace(/^(\d*\.\d*)\..*$/, "$1");
    return this.setData({
      height: i
    }), {
      value: i
    }
  },
  onWeightInput: function(e) {
    if (!this.checkProfileExists()) return {
      value: ""
    };
    var i = e.detail.value.replace(/[^\d.]/g, "").replace(/\.+/g, ".").replace(/^(\d*\.\d*)\..*$/, "$1");
    return this.setData({
      weight: i
    }), {
      value: i
    }
  },
  calculateBMI: function() {
    var e = this;
    this.checkProfileExists() && (this.setData({
      isCalculating: !0
    }), setTimeout((function() {
      if (e.validateInput()) {
        var i = parseFloat(e.data.height) / 100,
          a = parseFloat(e.data.weight),
          t = e.data.gender,
          r = parseInt(e.data.age);
        if (!i || !a || i <= 0 || a <= 0) wx.showToast({
          title: "请输入有效的身高和体重",
          icon: "none"
        });
        else if (!r || r <= 0) wx.showToast({
          title: "请输入有效的年龄",
          icon: "none"
        });
        else {
          var n = (a / (i * i)).toFixed(1),
            o = 0;
          o = "male" === t ? 66 + 13.7 * a + 5 * i - 6.8 * r : 655 + 9.6 * a + 1.8 * i - 4.7 * r, o = Math.round(o);
          var s = 220 - r,
            c = Math.round(.6 * s),
            f = Math.round(.7 * s),
            l = Math.round(35 * a),
            g = Math.round(.8 * a),
            d = Math.round(1.2 * a),
            u = Math.round(1.6 * a),
            b = "",
            m = "",
            p = "",
            h = "",
            _ = 0;
          "female" === t && (r < 18 ? n < 15 ? (b = "严重偏瘦", m = "体重严重不足，可能存在营养不良风险", p = "青少年严重偏瘦可能会影响发育，甚至导致发育迟缓", h = "建议增加营养摄入，咨询医生或营养师制定健康增重计划", _ = n / 40 * 100) : n < 18.5 ? (b = "偏瘦", m = "体重略轻，注意均衡饮食", p = "青春期女性体重偏瘦可能影响生长发育和荷尔蒙平衡", h = "建议适当增加热量摄入，保证蛋白质等营养素充足", _ = n / 40 * 100) : n < 23 ? (b = "正常", m = "体重正常，继续保持健康生活方式", p = "青春期女性保持健康体重有助于正常发育和学习能力", h = "保持均衡饮食，定期运动，确保充足睡眠", _ = n / 40 * 100) : n < 28 ? (b = "偏胖", m = "体重略重，注意控制饮食和增加运动", p = "青春期女性体重偏高可能增加未来代谢问题风险", h = "控制热量摄入，增加身体活动，减少久坐时间", _ = n / 40 * 100) : (b = "肥胖", m = "体重过重，需要减重计划", p = "青少年肥胖增加多种健康风险，包括早发性糖尿病风险", h = "咨询医生制定专业减重计划，控制饮食并增加运动", _ = n / 40 * 100) : r < 65 && (n < 15 ? (b = "严重偏瘦", m = "体重严重不足，可能存在营养不良或健康问题", p = "成年女性严重体重不足可能导致免疫力下降、贫血等健康问题", h = "增加优质蛋白质和健康脂肪摄入，咨询医生排除潜在健康问题", _ = n / 40 * 100) : n < 18.5 ? (b = "偏瘦", m = "体重低于正常范围，可能需要增加营养", p = "成年女性体重偏低可能影响生育能力和整体健康状态", h = "适度增加热量摄入，保证营养均衡，增加肌肉锻炼", _ = n / 40 * 100) : n < 24 ? (b = "正常", m = "体重健康，继续保持良好生活习惯", p = "保持健康体重是预防多种慢性疾病的关键", h = "保持均衡饮食和规律运动，定期健康检查", _ = n / 40 * 100) : n < 28 ? (b = "偏胖", m = "体重超出健康范围，存在健康风险", p = "女性体重偏高增加心血管疾病、糖尿病风险", h = "减少热量摄入，增加有氧运动，控制碳水化合物摄入", _ = n / 40 * 100) : (b = "肥胖", m = "体重严重超标，需要减重计划", p = "成年女性肥胖与多种慢性病和生育问题相关", h = "制定全面减重计划，改变饮食结构，增加运动量，必要时寻求专业帮助", _ = n / 40 * 100))), e.setData({
            bmi: n,
            category: b,
            categoryDesc: m,
            ageAnalysis: p,
            healthTips: h,
            indicatorPosition: _,
            bmr: o,
            fatBurningHrMin: c,
            fatBurningHrMax: f,
            recommendedWater: l,
            proteinBase: g,
            proteinModerate: d,
            proteinActive: u,
            isCalculating: !1,
            idealWeightRange: e.calculateIdealWeightRange()
          }), e.updateGoalStatus(), wx.createSelectorQuery().select(".result-container").boundingClientRect((function(e) {
            wx.pageScrollTo({
              scrollTop: e.top - 20,
              duration: 300
            })
          })).exec()
        }
      } else e.setData({
        isCalculating: !1
      })
    }), 500))
  },
  saveRecord: function() {
    var e = this;
    if (this.data.bmi) {
      var i = wx.getStorageSync("current_profile_id");
      if (i) {
        var a = this.data.currentProfileName;
        wx.showModal({
          title: "保存记录",
          content: '确认将此记录保存到"'.concat(a, '"的档案中吗？'),
          confirmText: "确认保存",
          cancelText: "取消",
          success: function(a) {
            a.confirm ? e.doSaveRecord(i) : a.cancel && wx.showModal({
              title: "提示",
              content: '您可以在"档案管理"中切换到其他档案',
              confirmText: "去切换",
              cancelText: "知道了",
              success: function(e) {
                e.confirm && wx.switchTab({
                  url: "/pages/profiles/profiles"
                })
              }
            })
          }
        })
      } else wx.showToast({
        title: "请先创建档案",
        icon: "none"
      })
    }
  },
  doSaveRecord: function(e) {
    var i = new Date,
      a = {
        date: i.toISOString(),
        formattedDate: "".concat(i.getFullYear(), "-").concat(i.getMonth() + 1, "-").concat(i.getDate()),
        age: parseInt(this.data.age),
        height: parseFloat(this.data.height),
        weight: parseFloat(this.data.weight),
        bmi: this.data.bmi,
        category: this.data.category,
        gender: this.data.gender,
        bmr: this.data.bmr,
        fatBurningHrMin: this.data.fatBurningHrMin,
        fatBurningHrMax: this.data.fatBurningHrMax,
        recommendedWater: this.data.recommendedWater,
        proteinBase: this.data.proteinBase,
        proteinModerate: this.data.proteinModerate,
        proteinActive: this.data.proteinActive
      },
      t = wx.getStorageSync("all_bmi_records") || {},
      r = t[e] || [];
    r.unshift(a), t[e] = r, wx.setStorageSync("all_bmi_records", t);
    var n = wx.getStorageSync("user_profiles") || [],
      o = n.findIndex((function(i) {
        return i.id === e
      })); - 1 !== o && (n[o].weight = this.data.weight, wx.setStorageSync("user_profiles", n)), wx.showToast({
      title: "记录已保存",
      icon: "success"
    })
  },
  navigateToHistory: function() {
    wx.navigateTo({
      url: "/pages/history/history"
    })
  },
  navigateToReference: function() {
    wx.navigateTo({
      url: "/pages/reference/reference"
    })
  },
  onGoalWeightInput: function(e) {
    this.setData({
      goalWeight: e.detail.value
    })
  },
  setGoal: function() {
    var e = parseFloat(this.data.goalWeight);
    if (!e || e <= 0) wx.showToast({
      title: "请输入有效的目标体重",
      icon: "none"
    });
    else {
      this.setProfileStorage("goalWeight", e);
      var i = parseFloat(this.data.weight);
      !this.getProfileStorage("startWeight") && i > 0 && this.setProfileStorage("startWeight", i), this.setData({
        hasGoal: !0
      }), this.updateGoalStatus(), wx.showToast({
        title: "目标已设置",
        icon: "success"
      })
    }
  },
  onLoad: function() {
    console.log("初始化食品数据库");
    var e = this.getDefaultFoodData();
    wx.setStorageSync("food_data", e), this.setData({
      foodCategories: e,
      allFoodCategories: e,
      currentFoodCategory: e[0].id,
      currentFoods: e[0].foods
    }), console.log("已加载食品分类数量:", e.length), this.loadCurrentProfile()
  },
  loadCurrentProfile: function() {
    var e = wx.getStorageSync("current_profile_id");
    if (e) {
      var i = (wx.getStorageSync("user_profiles") || []).find((function(i) {
        return i.id === e
      }));
      i && this.setData({
        currentProfileId: e,
        currentProfileName: i.name,
        gender: i.gender || "female",
        age: i.age || "",
        height: i.height || "",
        weight: i.weight || ""
      })
    }
  },
  loadProfileData: function(e) {
    var i = (wx.getStorageSync("user_profiles") || []).find((function(i) {
      return i.id === e
    }));
    i && (this.setData({
      currentProfileId: e,
      currentProfileName: i.name,
      gender: i.gender || "female",
      age: i.age || "",
      height: i.height || "",
      weight: i.weight || ""
    }), this.data.bmi && this.setData({
      bmi: "",
      category: "",
      categoryDesc: "",
      ageAnalysis: "",
      healthTips: "",
      indicatorPosition: 0,
      bmr: 0,
      fatBurningHrMin: 0,
      fatBurningHrMax: 0,
      recommendedWater: 0,
      proteinBase: 0,
      proteinModerate: 0,
      proteinActive: 0
    }), this.loadGoalData())
  },
  getProfileStorage: function(e) {
    var i = wx.getStorageSync("current_profile_id");
    return i ? (wx.getStorageSync("profile_".concat(e)) || {})[i] : null
  },
  setProfileStorage: function(e, i) {
    var a = wx.getStorageSync("current_profile_id");
    if (a) {
      var t = wx.getStorageSync("profile_".concat(e)) || {};
      t[a] = i, wx.setStorageSync("profile_".concat(e), t)
    }
  },
  predictWeight: function() {
    var e = wx.getStorageSync("current_profile_id");
    if (e) {
      var i = (wx.getStorageSync("all_bmi_records") || {})[e] || [];
      if (i.length < 3) wx.showToast({
        title: "记录不足，无法预测",
        icon: "none"
      });
      else {
        for (var a = i.slice(0, Math.min(5, i.length)), t = 0, r = 0, n = 0; n < a.length - 1; n++) {
          var o = a[n],
            s = a[n + 1],
            c = (new Date(o.date) - new Date(s.date)) / 864e5;
          if (c > 0) t += (o.weight - s.weight) / c, r++
        }
        if (0 !== r) {
          var f = t / r,
            l = parseFloat(this.data.weight),
            g = (l + 30 * f).toFixed(1),
            d = "";
          if (this.data.hasGoal && Math.abs(f) > .01) {
            var u = parseFloat(this.data.goalWeight) - l;
            if (u > 0 && f > 0 || u < 0 && f < 0) {
              var b = Math.abs(u / f);
              d = Math.round(b)
            }
          }
          wx.showModal({
            title: "体重预测",
            content: "按当前趋势，30天后您的体重预计为 ".concat(g, "kg。") + (d ? "\n预计还需要约 ".concat(d, " 天可达到您的目标体重。") : ""),
            showCancel: !1
          })
        } else wx.showToast({
          title: "记录间隔太短，无法预测",
          icon: "none"
        })
      }
    } else wx.showToast({
      title: "请先创建档案",
      icon: "none"
    })
  },
  navigateToProfiles: function() {
    wx.switchTab({
      url: "/pages/profiles/profiles"
    })
  },
  onShow: function() {
    var e = this,
      i = wx.getStorageSync("returning_from_food_detail"),
      a = wx.getStorageSync("current_profile_id");
    if (a && (i ? this.loadProfileDataWithoutScroll(a) : this.loadProfileData(a)), wx.getStorageSync("returning_from_profile") && (wx.removeStorageSync("returning_from_profile"), this.data.bmi && this.setData({
        bmi: ""
      })), i) return wx.removeStorageSync("returning_from_food_detail"), void setTimeout((function() {
      wx.createSelectorQuery().select("#food-anchor").boundingClientRect((function(i) {
        i ? (wx.pageScrollTo({
          scrollTop: i.top - 20,
          duration: 0
        }), console.log("滚动到食品查询锚点位置:", i.top), e.setData({
          preventAutoScroll: !0
        }), setTimeout((function() {
          e.setData({
            preventAutoScroll: !1
          })
        }), 1e3)) : (console.log("未找到锚点，使用备用滚动方法"), wx.createSelectorQuery().select(".food-calories-section").boundingClientRect((function(e) {
          e && wx.pageScrollTo({
            scrollTop: e.top - 60,
            duration: 0
          })
        })).exec())
      })).exec()
    }), 300);
    this.data.lastScrollPosition > 0 && !this.data.preventAutoScroll && setTimeout((function() {
      wx.pageScrollTo({
        scrollTop: e.data.lastScrollPosition,
        duration: 0
      }), console.log("恢复滚动位置:", e.data.lastScrollPosition)
    }), 100)
  },
  loadProfileDataWithoutScroll: function(e) {
    var i = (wx.getStorageSync("user_profiles") || []).find((function(i) {
      return i.id === e
    }));
    i && (this.setData({
      currentProfileId: e,
      currentProfileName: i.name,
      gender: i.gender || "female",
      age: i.age || "",
      height: i.height || "",
      weight: i.weight || ""
    }), this.data.bmi && this.setData({
      bmi: "",
      category: "",
      categoryDesc: "",
      ageAnalysis: "",
      healthTips: "",
      indicatorPosition: 0,
      bmr: 0,
      fatBurningHrMin: 0,
      fatBurningHrMax: 0,
      recommendedWater: 0,
      proteinBase: 0,
      proteinModerate: 0,
      proteinActive: 0
    }))
  },
  updateGoalStatus: function() {
    if (this.data.hasGoal && this.data.goalWeight) {
      var e = parseFloat(this.data.weight),
        i = parseFloat(this.data.goalWeight);
      if (!isNaN(e) && !isNaN(i)) {
        var a = Math.abs(i - e).toFixed(1),
          t = 0;
        if (e > i) {
          var r = this.getProfileStorage("startWeight") || e;
          r > i && (t = Math.min(100, Math.max(0, (r - e) / (r - i) * 100)).toFixed(0))
        } else if (e < i) {
          var n = this.getProfileStorage("startWeight") || e;
          n < i && (t = Math.min(100, Math.max(0, (e - n) / (i - n) * 100)).toFixed(0))
        } else t = 100;
        var o = parseFloat(this.data.height) / 100,
          s = (i / (o * o)).toFixed(1);
        this.setData({
          weightDiff: a,
          goalProgress: t,
          goalBMI: s
        })
      }
    }
  },
  setGenderFemale: function() {
    this.setData({
      gender: "female"
    }), this.data.bmi && this.calculateBMI()
  },
  setGenderMale: function() {
    this.setData({
      gender: "male"
    }), this.data.bmi && this.calculateBMI()
  },
  loadFoodData: function() {
    var e = wx.getStorageSync("food_data");
    e && e.length || (e = this.getDefaultFoodData(), wx.setStorageSync("food_data", e)), this.setData({
      foodCategories: e,
      currentFoodCategory: e[0].id,
      currentFoods: e[0].foods
    })
  },
  getDefaultFoodData: function() {
    return [{
      id: "staple",
      name: "主食类",
      foods: [{
        id: "rice",
        name: "米饭(熟)",
        calories: 116,
        protein: 2.6,
        fat: .3,
        carbs: 25.6,
        fiber: .3,
        saturated_fat: .1,
        unsaturated_fat: .2,
        cholesterol: 0,
        sodium: 1,
        potassium: 35,
        sugar: .1,
        vitamin_a: 0,
        vitamin_c: 0,
        calcium: 10,
        iron: .2,
        glycemic_index: 73,
        glycemic_load: 18,
        unit: "g"
      }, {
        id: "steamed_bun",
        name: "馒头",
        calories: 223,
        protein: 6.3,
        fat: 1.8,
        carbs: 46.2,
        fiber: .6,
        unit: "g"
      }, {
        id: "noodles",
        name: "面条(熟)",
        calories: 107,
        protein: 3.4,
        fat: .6,
        carbs: 22.3,
        fiber: 1.2,
        unit: "g"
      }, {
        id: "bread",
        name: "面包",
        calories: 265,
        protein: 8.3,
        fat: 3.2,
        carbs: 51.5,
        fiber: 2.5,
        unit: "g"
      }, {
        id: "congee",
        name: "粥",
        calories: 45,
        protein: .8,
        fat: .2,
        carbs: 10.1,
        fiber: .1,
        unit: "g"
      }, {
        id: "corn",
        name: "玉米(熟)",
        calories: 86,
        protein: 3.2,
        fat: 1.2,
        carbs: 19,
        fiber: 2.4,
        unit: "g"
      }, {
        id: "sweet_potato",
        name: "红薯(熟)",
        calories: 86,
        protein: 1.6,
        fat: .1,
        carbs: 20.1,
        fiber: 3,
        unit: "g"
      }, {
        id: "potato",
        name: "土豆(熟)",
        calories: 77,
        protein: 2,
        fat: .1,
        carbs: 17.5,
        fiber: 1.5,
        unit: "g"
      }, {
        id: "millet",
        name: "小米(熟)",
        calories: 104,
        protein: 3,
        fat: 1,
        carbs: 21.3,
        fiber: 1.3,
        unit: "g"
      }, {
        id: "oatmeal",
        name: "燕麦片(熟)",
        calories: 68,
        protein: 2.5,
        fat: 1.4,
        carbs: 12,
        fiber: 1.7,
        unit: "g"
      }, {
        id: "brown_rice",
        name: "糙米饭(熟)",
        calories: 111,
        protein: 2.6,
        fat: .9,
        carbs: 23.5,
        fiber: 1.8,
        unit: "g"
      }, {
        id: "glutinous_rice",
        name: "糯米饭(熟)",
        calories: 120,
        protein: 2,
        fat: .2,
        carbs: 27,
        fiber: .4,
        unit: "g"
      }, {
        id: "taro",
        name: "芋头(熟)",
        calories: 108,
        protein: 1.5,
        fat: .2,
        carbs: 25,
        fiber: 3.2,
        unit: "g"
      }, {
        id: "yam",
        name: "山药(熟)",
        calories: 76,
        protein: 1.5,
        fat: .1,
        carbs: 17.5,
        fiber: 1.3,
        unit: "g"
      }, {
        id: "barley",
        name: "大麦(熟)",
        calories: 123,
        protein: 2.3,
        fat: .8,
        carbs: 28.2,
        fiber: 3.8,
        unit: "g"
      }, {
        id: "quinoa",
        name: "藜麦(熟)",
        calories: 120,
        protein: 4.4,
        fat: 1.9,
        carbs: 21.3,
        fiber: 2.8,
        unit: "g"
      }, {
        id: "buckwheat",
        name: "荞麦(熟)",
        calories: 92,
        protein: 3.4,
        fat: .6,
        carbs: 20,
        fiber: 2.7,
        unit: "g"
      }, {
        id: "pasta",
        name: "意大利面(熟)",
        calories: 131,
        protein: 5,
        fat: 1.1,
        carbs: 25.8,
        fiber: 1.8,
        unit: "g"
      }, {
        id: "vermicelli",
        name: "粉丝(熟)",
        calories: 108,
        protein: .2,
        fat: .1,
        carbs: 24.9,
        fiber: .9,
        unit: "g"
      }, {
        id: "rye_bread",
        name: "黑麦面包",
        calories: 260,
        protein: 8.5,
        fat: 3.3,
        carbs: 48.3,
        fiber: 5.8,
        unit: "g"
      }, {
        id: "croissant",
        name: "牛角面包",
        calories: 406,
        protein: 8.2,
        fat: 21,
        carbs: 45.8,
        fiber: 2.6,
        unit: "g"
      }, {
        id: "dumpling",
        name: "饺子(熟)",
        calories: 142,
        protein: 5.7,
        fat: 3.5,
        carbs: 22.9,
        fiber: 1.5,
        unit: "g"
      }, {
        id: "bun",
        name: "花卷",
        calories: 240,
        protein: 7,
        fat: 2,
        carbs: 49,
        fiber: .7,
        unit: "g"
      }, {
        id: "baozi",
        name: "肉包子",
        calories: 191,
        protein: 7.8,
        fat: 5.1,
        carbs: 30.1,
        fiber: .8,
        unit: "g"
      }, {
        id: "baozi_veg",
        name: "素包子",
        calories: 160,
        protein: 5.5,
        fat: 1.8,
        carbs: 32,
        fiber: 1.7,
        unit: "g"
      }, {
        id: "porridge",
        name: "八宝粥",
        calories: 63,
        protein: 1.5,
        fat: .5,
        carbs: 14,
        fiber: .5,
        unit: "g"
      }, {
        id: "youtiao",
        name: "油条",
        calories: 389,
        protein: 8,
        fat: 24,
        carbs: 36,
        fiber: 1,
        unit: "g"
      }, {
        id: "rice_cake",
        name: "年糕",
        calories: 215,
        protein: 3.5,
        fat: .3,
        carbs: 49.4,
        fiber: .3,
        unit: "g"
      }, {
        id: "rice_noodles",
        name: "米粉(干)",
        calories: 366,
        protein: 6,
        fat: .6,
        carbs: 84,
        fiber: 1.4,
        unit: "g"
      }, {
        id: "rice_noodles_cooked",
        name: "米粉(熟)",
        calories: 109,
        protein: 1.8,
        fat: .2,
        carbs: 25.2,
        fiber: .4,
        unit: "g"
      }, {
        id: "sticky_rice_dumpling",
        name: "粽子",
        calories: 165,
        protein: 3.8,
        fat: 2.5,
        carbs: 33.7,
        fiber: 1.2,
        unit: "g"
      }, {
        id: "sandwich",
        name: "三明治",
        calories: 252,
        protein: 11,
        fat: 8,
        carbs: 35,
        fiber: 2,
        unit: "g"
      }, {
        id: "hamburger_bun",
        name: "汉堡面包",
        calories: 237,
        protein: 8,
        fat: 4,
        carbs: 42,
        fiber: 2,
        unit: "g"
      }, {
        id: "cereal",
        name: "麦片",
        calories: 380,
        protein: 8,
        fat: 6,
        carbs: 78,
        fiber: 7,
        unit: "g"
      }, {
        id: "sushi_rice",
        name: "寿司饭",
        calories: 140,
        protein: 2.4,
        fat: .3,
        carbs: 30.9,
        fiber: .4,
        unit: "g"
      }, {
        id: "spring_roll",
        name: "春卷",
        calories: 350,
        protein: 6,
        fat: 18,
        carbs: 40,
        fiber: 1.5,
        unit: "g"
      }, {
        id: "soba",
        name: "荞麦面(熟)",
        calories: 99,
        protein: 5.1,
        fat: .1,
        carbs: 21.4,
        fiber: .3,
        unit: "g"
      }, {
        id: "udon",
        name: "乌冬面(熟)",
        calories: 96,
        protein: 1.8,
        fat: .2,
        carbs: 20,
        fiber: .2,
        unit: "g"
      }]
    }, {
      id: "meat_egg",
      name: "肉蛋类",
      foods: [{
        id: "pork",
        name: "猪肉(瘦)",
        calories: 143,
        protein: 20.2,
        fat: 6.2,
        carbs: 0,
        fiber: 0,
        saturated_fat: 2.2,
        unsaturated_fat: 4,
        cholesterol: 62,
        sodium: 63,
        potassium: 340,
        sugar: 0,
        vitamin_a: 0,
        vitamin_c: 0,
        calcium: 5,
        iron: .9,
        glycemic_index: 0,
        glycemic_load: 0,
        unit: "g"
      }, {
        id: "beef",
        name: "牛肉(瘦)",
        calories: 106,
        protein: 20.2,
        fat: 2.6,
        carbs: .5,
        fiber: 0,
        unit: "g"
      }, {
        id: "chicken",
        name: "鸡肉(去皮)",
        calories: 119,
        protein: 21.5,
        fat: 3.1,
        carbs: .4,
        fiber: 0,
        unit: "g"
      }, {
        id: "egg",
        name: "鸡蛋",
        calories: 155,
        protein: 12.8,
        fat: 11,
        carbs: .9,
        fiber: 0,
        saturated_fat: 3.1,
        unsaturated_fat: 7.9,
        cholesterol: 373,
        sodium: 142,
        potassium: 138,
        sugar: .4,
        vitamin_a: 520,
        vitamin_c: 0,
        calcium: 56,
        iron: 1.8,
        glycemic_index: 0,
        glycemic_load: 0,
        unit: "g"
      }, {
        id: "duck",
        name: "鸭肉",
        calories: 166,
        protein: 18.5,
        fat: 10.2,
        carbs: .4,
        fiber: 0,
        unit: "g"
      }, {
        id: "lamb",
        name: "羊肉(瘦)",
        calories: 175,
        protein: 20.8,
        fat: 9.5,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "fatty_pork",
        name: "猪肉(肥)",
        calories: 348,
        protein: 14.5,
        fat: 32,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "chicken_breast",
        name: "鸡胸肉",
        calories: 110,
        protein: 23.1,
        fat: 1.2,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "chicken_leg",
        name: "鸡腿肉",
        calories: 133,
        protein: 19.7,
        fat: 5.5,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "chicken_wing",
        name: "鸡翅",
        calories: 222,
        protein: 19.5,
        fat: 15.8,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "pig_liver",
        name: "猪肝",
        calories: 134,
        protein: 21.6,
        fat: 4.7,
        carbs: .8,
        fiber: 0,
        unit: "g"
      }, {
        id: "pig_heart",
        name: "猪心",
        calories: 113,
        protein: 17.3,
        fat: 4.7,
        carbs: .4,
        fiber: 0,
        unit: "g"
      }, {
        id: "pig_kidney",
        name: "猪肾",
        calories: 100,
        protein: 16.3,
        fat: 3.6,
        carbs: .3,
        fiber: 0,
        unit: "g"
      }, {
        id: "chicken_liver",
        name: "鸡肝",
        calories: 136,
        protein: 19.1,
        fat: 5.5,
        carbs: 1,
        fiber: 0,
        unit: "g"
      }, {
        id: "duck_liver",
        name: "鸭肝",
        calories: 136,
        protein: 18.7,
        fat: 6.4,
        carbs: .7,
        fiber: 0,
        unit: "g"
      }, {
        id: "duck_egg",
        name: "鸭蛋",
        calories: 185,
        protein: 13,
        fat: 14,
        carbs: 1,
        fiber: 0,
        unit: "g"
      }, {
        id: "quail_egg",
        name: "鹌鹑蛋",
        calories: 158,
        protein: 13.1,
        fat: 11.1,
        carbs: .4,
        fiber: 0,
        unit: "g"
      }, {
        id: "century_egg",
        name: "皮蛋",
        calories: 168,
        protein: 11,
        fat: 13,
        carbs: 1,
        fiber: 0,
        unit: "g"
      }, {
        id: "salted_egg",
        name: "咸蛋",
        calories: 178,
        protein: 13,
        fat: 13,
        carbs: 1,
        fiber: 0,
        unit: "g"
      }, {
        id: "ham",
        name: "火腿",
        calories: 222,
        protein: 19.3,
        fat: 16,
        carbs: .2,
        fiber: 0,
        unit: "g"
      }, {
        id: "sausage",
        name: "香肠",
        calories: 301,
        protein: 12.8,
        fat: 27,
        carbs: 2,
        fiber: 0,
        unit: "g"
      }, {
        id: "bacon",
        name: "培根",
        calories: 417,
        protein: 12.5,
        fat: 40,
        carbs: 1.2,
        fiber: 0,
        unit: "g"
      }, {
        id: "turkey",
        name: "火鸡肉",
        calories: 109,
        protein: 21.9,
        fat: 2,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "mutton",
        name: "羊肉",
        calories: 175,
        protein: 20.8,
        fat: 9.5,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "venison",
        name: "鹿肉",
        calories: 120,
        protein: 23,
        fat: 2.4,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "rabbit",
        name: "兔肉",
        calories: 114,
        protein: 21.8,
        fat: 2.3,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "chicken_gizzard",
        name: "鸡胗",
        calories: 94,
        protein: 19,
        fat: 1.6,
        carbs: .5,
        fiber: 0,
        unit: "g"
      }, {
        id: "duck_neck",
        name: "鸭脖",
        calories: 164,
        protein: 17,
        fat: 10,
        carbs: .4,
        fiber: 0,
        unit: "g"
      }, {
        id: "chicken_feet",
        name: "鸡爪",
        calories: 215,
        protein: 19,
        fat: 14.5,
        carbs: .5,
        fiber: 0,
        unit: "g"
      }, {
        id: "goose",
        name: "鹅肉",
        calories: 161,
        protein: 22.8,
        fat: 7.1,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "frog_leg",
        name: "田鸡腿",
        calories: 73,
        protein: 16.4,
        fat: .3,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "steak",
        name: "牛排",
        calories: 205,
        protein: 27,
        fat: 10,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "ground_beef",
        name: "牛肉馅",
        calories: 242,
        protein: 20,
        fat: 17.5,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "ground_pork",
        name: "猪肉馅",
        calories: 236,
        protein: 18,
        fat: 18,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "luncheon_meat",
        name: "午餐肉",
        calories: 317,
        protein: 13,
        fat: 28,
        carbs: 3,
        fiber: 0,
        unit: "g"
      }, {
        id: "beef_ball",
        name: "牛肉丸",
        calories: 224,
        protein: 15,
        fat: 17,
        carbs: 3,
        fiber: 0,
        unit: "g"
      }, {
        id: "pork_ball",
        name: "猪肉丸",
        calories: 218,
        protein: 14,
        fat: 17,
        carbs: 3,
        fiber: 0,
        unit: "g"
      }, {
        id: "egg_white",
        name: "蛋白",
        calories: 52,
        protein: 11,
        fat: .2,
        carbs: .7,
        fiber: 0,
        unit: "g"
      }, {
        id: "egg_yolk",
        name: "蛋黄",
        calories: 319,
        protein: 16,
        fat: 27,
        carbs: 3.6,
        fiber: 0,
        unit: "g"
      }, {
        id: "quail",
        name: "鹌鹑肉",
        calories: 134,
        protein: 22,
        fat: 4.6,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "pigeon",
        name: "乳鸽",
        calories: 142,
        protein: 20.5,
        fat: 6.3,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "tripe",
        name: "肚",
        calories: 80,
        protein: 16,
        fat: 2,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "intestine",
        name: "肠",
        calories: 161,
        protein: 12,
        fat: 11,
        carbs: .5,
        fiber: 0,
        unit: "g"
      }, {
        id: "blood_tofu",
        name: "血豆腐",
        calories: 75,
        protein: 13.8,
        fat: .5,
        carbs: 2,
        fiber: 0,
        unit: "g"
      }]
    }, {
      id: "vegetables",
      name: "蔬菜类",
      foods: [{
        id: "spinach",
        name: "菠菜",
        calories: 23,
        protein: 2.9,
        fat: .4,
        carbs: 3.5,
        fiber: 2.2,
        saturated_fat: .1,
        unsaturated_fat: .3,
        cholesterol: 0,
        sodium: 79,
        potassium: 558,
        sugar: .4,
        vitamin_a: 9377,
        vitamin_c: 28,
        calcium: 99,
        iron: 2.7,
        glycemic_index: 15,
        glycemic_load: 0,
        unit: "g"
      }, {
        id: "tomato",
        name: "西红柿",
        calories: 20,
        protein: .9,
        fat: .2,
        carbs: 4.2,
        fiber: 1.2,
        unit: "g"
      }, {
        id: "cucumber",
        name: "黄瓜",
        calories: 16,
        protein: .7,
        fat: .1,
        carbs: 3.6,
        fiber: .5,
        unit: "g"
      }, {
        id: "eggplant",
        name: "茄子",
        calories: 24,
        protein: 1.2,
        fat: .2,
        carbs: 5.7,
        fiber: 2.5,
        unit: "g"
      }, {
        id: "broccoli",
        name: "西兰花",
        calories: 34,
        protein: 2.8,
        fat: .4,
        carbs: 6.6,
        fiber: 2.6,
        unit: "g"
      }, {
        id: "cauliflower",
        name: "花椰菜",
        calories: 25,
        protein: 1.9,
        fat: .3,
        carbs: 5,
        fiber: 2,
        unit: "g"
      }, {
        id: "carrot",
        name: "胡萝卜",
        calories: 41,
        protein: .9,
        fat: .2,
        carbs: 9.6,
        fiber: 2.8,
        unit: "g"
      }, {
        id: "onion",
        name: "洋葱",
        calories: 40,
        protein: 1.1,
        fat: .1,
        carbs: 9.3,
        fiber: 1.7,
        unit: "g"
      }, {
        id: "garlic",
        name: "大蒜",
        calories: 149,
        protein: 6.4,
        fat: .5,
        carbs: 33.1,
        fiber: 2.1,
        unit: "g"
      }, {
        id: "green_pepper",
        name: "青椒",
        calories: 20,
        protein: .9,
        fat: .2,
        carbs: 4.6,
        fiber: 1.7,
        unit: "g"
      }, {
        id: "red_pepper",
        name: "红椒",
        calories: 31,
        protein: 1,
        fat: .3,
        carbs: 6,
        fiber: 2.1,
        unit: "g"
      }, {
        id: "lettuce",
        name: "生菜",
        calories: 15,
        protein: 1.4,
        fat: .2,
        carbs: 2.9,
        fiber: 1.3,
        unit: "g"
      }, {
        id: "celery",
        name: "芹菜",
        calories: 16,
        protein: .7,
        fat: .2,
        carbs: 3,
        fiber: 1.6,
        unit: "g"
      }, {
        id: "potato_leaf",
        name: "土豆叶",
        calories: 27,
        protein: 4,
        fat: .4,
        carbs: 4.3,
        fiber: 3.5,
        unit: "g"
      }, {
        id: "radish",
        name: "萝卜",
        calories: 16,
        protein: .6,
        fat: .1,
        carbs: 3.4,
        fiber: 1.6,
        unit: "g"
      }, {
        id: "chives",
        name: "韭菜",
        calories: 30,
        protein: 3.3,
        fat: .7,
        carbs: 4.4,
        fiber: 2.5,
        unit: "g"
      }, {
        id: "green_bean",
        name: "豆角",
        calories: 31,
        protein: 1.8,
        fat: .1,
        carbs: 7.1,
        fiber: 3.4,
        unit: "g"
      }, {
        id: "lotus_root",
        name: "莲藕",
        calories: 74,
        protein: 2.6,
        fat: .1,
        carbs: 17.2,
        fiber: 2.1,
        unit: "g"
      }, {
        id: "bamboo_shoot",
        name: "竹笋",
        calories: 27,
        protein: 2.7,
        fat: .3,
        carbs: 5,
        fiber: 2.2,
        unit: "g"
      }, {
        id: "bitter_gourd",
        name: "苦瓜",
        calories: 17,
        protein: 1,
        fat: .2,
        carbs: 3.7,
        fiber: 2.8,
        unit: "g"
      }, {
        id: "mushroom",
        name: "蘑菇",
        calories: 22,
        protein: 3.1,
        fat: .3,
        carbs: 3.3,
        fiber: 1,
        unit: "g"
      }, {
        id: "shiitake_mushroom",
        name: "香菇",
        calories: 34,
        protein: 2.2,
        fat: .5,
        carbs: 7,
        fiber: 2.5,
        unit: "g"
      }, {
        id: "winter_melon",
        name: "冬瓜",
        calories: 11,
        protein: .4,
        fat: .2,
        carbs: 2.6,
        fiber: .6,
        unit: "g"
      }, {
        id: "zucchini",
        name: "西葫芦",
        calories: 17,
        protein: 1.2,
        fat: .3,
        carbs: 3.1,
        fiber: 1,
        unit: "g"
      }, {
        id: "asparagus",
        name: "芦笋",
        calories: 20,
        protein: 2.2,
        fat: .2,
        carbs: 3.9,
        fiber: 2.1,
        unit: "g"
      }, {
        id: "sweet_potato_leaf",
        name: "红薯叶",
        calories: 35,
        protein: 2.6,
        fat: .4,
        carbs: 6.8,
        fiber: 3.5,
        unit: "g"
      }, {
        id: "coriander",
        name: "香菜",
        calories: 23,
        protein: 2.1,
        fat: .5,
        carbs: 3.7,
        fiber: 2.8,
        unit: "g"
      }, {
        id: "mint",
        name: "薄荷",
        calories: 44,
        protein: 3.8,
        fat: .7,
        carbs: 8,
        fiber: 6.8,
        unit: "g"
      }, {
        id: "kale",
        name: "羽衣甘蓝",
        calories: 49,
        protein: 4.3,
        fat: .9,
        carbs: 8.8,
        fiber: 3.6,
        unit: "g"
      }, {
        id: "sweet_corn",
        name: "甜玉米粒",
        calories: 86,
        protein: 3.2,
        fat: 1.2,
        carbs: 19,
        fiber: 2.4,
        unit: "g"
      }, {
        id: "green_onion",
        name: "葱",
        calories: 32,
        protein: 1.8,
        fat: .2,
        carbs: 7.3,
        fiber: 2.6,
        unit: "g"
      }, {
        id: "green_garlic",
        name: "蒜苗",
        calories: 28,
        protein: 2.1,
        fat: .2,
        carbs: 5.8,
        fiber: 2.2,
        unit: "g"
      }, {
        id: "snow_pea",
        name: "荷兰豆",
        calories: 42,
        protein: 2.8,
        fat: .2,
        carbs: 7.5,
        fiber: 2.6,
        unit: "g"
      }, {
        id: "seaweed",
        name: "海带",
        calories: 43,
        protein: 1.7,
        fat: .6,
        carbs: 9.6,
        fiber: 1.3,
        unit: "g"
      }, {
        id: "nori",
        name: "紫菜",
        calories: 35,
        protein: 5.8,
        fat: .3,
        carbs: 5.1,
        fiber: .5,
        unit: "g"
      }, {
        id: "green_cabbage",
        name: "卷心菜",
        calories: 25,
        protein: 1.3,
        fat: .1,
        carbs: 5.8,
        fiber: 2.5,
        unit: "g"
      }, {
        id: "brussels_sprouts",
        name: "球芽甘蓝",
        calories: 43,
        protein: 3.4,
        fat: .3,
        carbs: 9,
        fiber: 3.8,
        unit: "g"
      }, {
        id: "red_cabbage",
        name: "紫甘蓝",
        calories: 31,
        protein: 1.4,
        fat: .2,
        carbs: 7.4,
        fiber: 2.1,
        unit: "g"
      }, {
        id: "bok_choy",
        name: "油菜",
        calories: 13,
        protein: 1.5,
        fat: .2,
        carbs: 2.2,
        fiber: 1,
        unit: "g"
      }, {
        id: "Shanghai_cabbage",
        name: "上海青",
        calories: 12,
        protein: 1.4,
        fat: .2,
        carbs: 2,
        fiber: 1.2,
        unit: "g"
      }, {
        id: "ginger",
        name: "生姜",
        calories: 80,
        protein: 1.8,
        fat: .8,
        carbs: 17.8,
        fiber: 2,
        unit: "g"
      }, {
        id: "turnip",
        name: "白萝卜",
        calories: 28,
        protein: .9,
        fat: .1,
        carbs: 6.4,
        fiber: 1.8,
        unit: "g"
      }, {
        id: "chard",
        name: "瑞士甜菜",
        calories: 19,
        protein: 1.8,
        fat: .2,
        carbs: 3.7,
        fiber: 1.6,
        unit: "g"
      }, {
        id: "anise",
        name: "茴香",
        calories: 36,
        protein: 3.1,
        fat: .5,
        carbs: 7,
        fiber: 2.3,
        unit: "g"
      }, {
        id: "enoki_mushroom",
        name: "金针菇",
        calories: 37,
        protein: 2.4,
        fat: .4,
        carbs: 7.8,
        fiber: 2.1,
        unit: "g"
      }]
    }, {
      id: "fruits",
      name: "水果类",
      foods: [{
        id: "apple",
        name: "苹果",
        calories: 52,
        protein: .3,
        fat: .2,
        carbs: 13.7,
        fiber: 2.4,
        saturated_fat: .03,
        unsaturated_fat: .17,
        cholesterol: 0,
        sodium: 1,
        potassium: 107,
        sugar: 10.4,
        vitamin_a: 54,
        vitamin_c: 4.6,
        calcium: 6,
        iron: .12,
        glycemic_index: 38,
        glycemic_load: 6,
        unit: "g"
      }, {
        id: "banana",
        name: "香蕉",
        calories: 93,
        protein: 1.1,
        fat: .3,
        carbs: 23.7,
        fiber: 2.6,
        saturated_fat: .1,
        unsaturated_fat: .2,
        cholesterol: 0,
        sodium: 1,
        potassium: 358,
        sugar: 12.2,
        vitamin_a: 64,
        vitamin_c: 8.7,
        calcium: 5,
        iron: .26,
        glycemic_index: 51,
        glycemic_load: 13,
        unit: "g"
      }, {
        id: "orange",
        name: "橙子",
        calories: 47,
        protein: .9,
        fat: .1,
        carbs: 11.8,
        fiber: 2.4,
        unit: "g"
      }, {
        id: "grape",
        name: "葡萄",
        calories: 67,
        protein: .6,
        fat: .4,
        carbs: 17.2,
        fiber: .9,
        unit: "g"
      }, {
        id: "watermelon",
        name: "西瓜",
        calories: 32,
        protein: .6,
        fat: .2,
        carbs: 7.6,
        fiber: .4,
        unit: "g"
      }, {
        id: "pear",
        name: "梨",
        calories: 57,
        protein: .4,
        fat: .1,
        carbs: 15.2,
        fiber: 3.1,
        unit: "g"
      }, {
        id: "strawberry",
        name: "草莓",
        calories: 32,
        protein: .7,
        fat: .3,
        carbs: 7.7,
        fiber: 2,
        unit: "g"
      }, {
        id: "blueberry",
        name: "蓝莓",
        calories: 57,
        protein: .7,
        fat: .3,
        carbs: 14.5,
        fiber: 2.4,
        unit: "g"
      }, {
        id: "kiwi",
        name: "猕猴桃",
        calories: 61,
        protein: 1.1,
        fat: .5,
        carbs: 14.7,
        fiber: 3,
        unit: "g"
      }, {
        id: "pineapple",
        name: "菠萝",
        calories: 50,
        protein: .5,
        fat: .1,
        carbs: 13.1,
        fiber: 1.4,
        unit: "g"
      }, {
        id: "mango",
        name: "芒果",
        calories: 60,
        protein: .8,
        fat: .4,
        carbs: 15,
        fiber: 1.6,
        unit: "g"
      }, {
        id: "peach",
        name: "桃子",
        calories: 39,
        protein: .9,
        fat: .3,
        carbs: 9.5,
        fiber: 1.5,
        unit: "g"
      }, {
        id: "plum",
        name: "李子",
        calories: 46,
        protein: .7,
        fat: .3,
        carbs: 11.4,
        fiber: 1.4,
        unit: "g"
      }, {
        id: "cherry",
        name: "樱桃",
        calories: 50,
        protein: 1,
        fat: .3,
        carbs: 12.2,
        fiber: 1.6,
        unit: "g"
      }, {
        id: "persimmon",
        name: "柿子",
        calories: 70,
        protein: .6,
        fat: .2,
        carbs: 18.6,
        fiber: 3.6,
        unit: "g"
      }, {
        id: "apricot",
        name: "杏",
        calories: 48,
        protein: 1.4,
        fat: .4,
        carbs: 11,
        fiber: 2,
        unit: "g"
      }, {
        id: "lemon",
        name: "柠檬",
        calories: 29,
        protein: 1.1,
        fat: .3,
        carbs: 9.3,
        fiber: 2.8,
        unit: "g"
      }, {
        id: "lime",
        name: "青柠",
        calories: 30,
        protein: .7,
        fat: .2,
        carbs: 10.5,
        fiber: 2.8,
        unit: "g"
      }, {
        id: "grapefruit",
        name: "葡萄柚",
        calories: 42,
        protein: .8,
        fat: .1,
        carbs: 10.7,
        fiber: 1.6,
        unit: "g"
      }, {
        id: "lychee",
        name: "荔枝",
        calories: 66,
        protein: .8,
        fat: .4,
        carbs: 16.5,
        fiber: 1.3,
        unit: "g"
      }, {
        id: "longan",
        name: "龙眼",
        calories: 60,
        protein: 1.3,
        fat: .1,
        carbs: 15,
        fiber: 1.1,
        unit: "g"
      }, {
        id: "pomegranate",
        name: "石榴",
        calories: 83,
        protein: 1.7,
        fat: 1.2,
        carbs: 18.7,
        fiber: 4,
        unit: "g"
      }, {
        id: "fig",
        name: "无花果",
        calories: 74,
        protein: .8,
        fat: .3,
        carbs: 19.2,
        fiber: 3,
        unit: "g"
      }, {
        id: "coconut",
        name: "椰子肉",
        calories: 354,
        protein: 3.3,
        fat: 33.5,
        carbs: 15.2,
        fiber: 9,
        unit: "g"
      }, {
        id: "dragon_fruit",
        name: "火龙果",
        calories: 60,
        protein: 1.2,
        fat: .4,
        carbs: 13,
        fiber: 1,
        unit: "g"
      }, {
        id: "jackfruit",
        name: "菠萝蜜",
        calories: 95,
        protein: 1.7,
        fat: .6,
        carbs: 23.2,
        fiber: 1.5,
        unit: "g"
      }, {
        id: "durian",
        name: "榴莲",
        calories: 147,
        protein: 1.5,
        fat: 5.3,
        carbs: 27.1,
        fiber: 3.8,
        unit: "g"
      }, {
        id: "guava",
        name: "番石榴",
        calories: 68,
        protein: 2.6,
        fat: 1,
        carbs: 14.3,
        fiber: 5.4,
        unit: "g"
      }, {
        id: "avocado",
        name: "牛油果",
        calories: 160,
        protein: 2,
        fat: 14.7,
        carbs: 8.5,
        fiber: 6.7,
        unit: "g"
      }, {
        id: "papaya",
        name: "木瓜",
        calories: 43,
        protein: .5,
        fat: .3,
        carbs: 10.8,
        fiber: 1.7,
        unit: "g"
      }, {
        id: "cranberry",
        name: "蔓越莓",
        calories: 46,
        protein: .4,
        fat: .1,
        carbs: 12.2,
        fiber: 3.6,
        unit: "g"
      }, {
        id: "raspberry",
        name: "树莓",
        calories: 52,
        protein: 1.2,
        fat: .7,
        carbs: 11.9,
        fiber: 6.5,
        unit: "g"
      }]
    }, {
      id: "dairy",
      name: "奶制品",
      foods: [{
        id: "milk",
        name: "牛奶",
        calories: 60,
        protein: 3.2,
        fat: 3.3,
        carbs: 4.8,
        fiber: 0,
        saturated_fat: 2.1,
        unsaturated_fat: 1.2,
        cholesterol: 10,
        sodium: 43,
        potassium: 150,
        sugar: 5.1,
        vitamin_a: 102,
        vitamin_c: 0,
        calcium: 125,
        iron: .03,
        glycemic_index: 30,
        glycemic_load: 1,
        unit: "g"
      }, {
        id: "yogurt",
        name: "酸奶",
        calories: 70,
        protein: 3.5,
        fat: 3.3,
        carbs: 5.7,
        fiber: 0,
        unit: "g"
      }, {
        id: "cheese",
        name: "奶酪",
        calories: 350,
        protein: 25,
        fat: 28,
        carbs: 2,
        fiber: 0,
        unit: "g"
      }, {
        id: "butter",
        name: "黄油",
        calories: 717,
        protein: .9,
        fat: 81.1,
        carbs: .1,
        fiber: 0,
        unit: "g"
      }, {
        id: "cream",
        name: "奶油",
        calories: 292,
        protein: 2.1,
        fat: 30.9,
        carbs: 2.8,
        fiber: 0,
        unit: "g"
      }, {
        id: "skim_milk",
        name: "脱脂牛奶",
        calories: 35,
        protein: 3.4,
        fat: .1,
        carbs: 5,
        fiber: 0,
        unit: "g"
      }, {
        id: "whole_milk",
        name: "全脂牛奶",
        calories: 61,
        protein: 3.2,
        fat: 3.3,
        carbs: 4.8,
        fiber: 0,
        unit: "g"
      }, {
        id: "low_fat_milk",
        name: "低脂牛奶",
        calories: 50,
        protein: 3.3,
        fat: 1.9,
        carbs: 4.9,
        fiber: 0,
        unit: "g"
      }, {
        id: "sheep_milk",
        name: "羊奶",
        calories: 108,
        protein: 5.9,
        fat: 7,
        carbs: 5.4,
        fiber: 0,
        unit: "g"
      }, {
        id: "goat_milk",
        name: "山羊奶",
        calories: 69,
        protein: 3.6,
        fat: 4.1,
        carbs: 4.5,
        fiber: 0,
        unit: "g"
      }, {
        id: "condensed_milk",
        name: "炼乳",
        calories: 321,
        protein: 7.9,
        fat: 8.7,
        carbs: 54.4,
        fiber: 0,
        unit: "g"
      }, {
        id: "evaporated_milk",
        name: "淡炼乳",
        calories: 134,
        protein: 6.8,
        fat: 7.6,
        carbs: 10,
        fiber: 0,
        unit: "g"
      }, {
        id: "milk_powder",
        name: "奶粉",
        calories: 500,
        protein: 26.3,
        fat: 26.7,
        carbs: 38.4,
        fiber: 0,
        unit: "g"
      }, {
        id: "plain_yogurt",
        name: "原味酸奶",
        calories: 63,
        protein: 5.3,
        fat: 3.3,
        carbs: 4.7,
        fiber: 0,
        unit: "g"
      }, {
        id: "greek_yogurt",
        name: "希腊酸奶",
        calories: 73,
        protein: 10,
        fat: 1.9,
        carbs: 3.6,
        fiber: 0,
        unit: "g"
      }, {
        id: "cheddar",
        name: "切达奶酪",
        calories: 403,
        protein: 25,
        fat: 33,
        carbs: 1.3,
        fiber: 0,
        unit: "g"
      }, {
        id: "mozzarella",
        name: "马苏里拉奶酪",
        calories: 280,
        protein: 22,
        fat: 22,
        carbs: 2.2,
        fiber: 0,
        unit: "g"
      }, {
        id: "feta",
        name: "菲达奶酪",
        calories: 264,
        protein: 14.2,
        fat: 21.3,
        carbs: 4.1,
        fiber: 0,
        unit: "g"
      }, {
        id: "cream_cheese",
        name: "奶油奶酪",
        calories: 342,
        protein: 6.2,
        fat: 34.2,
        carbs: 3.7,
        fiber: 0,
        unit: "g"
      }, {
        id: "cottage_cheese",
        name: "农家奶酪",
        calories: 98,
        protein: 11.1,
        fat: 4.3,
        carbs: 3.4,
        fiber: 0,
        unit: "g"
      }]
    }, {
      id: "nuts",
      name: "坚果类",
      foods: [{
        id: "walnut",
        name: "核桃",
        calories: 654,
        protein: 15.2,
        fat: 65.2,
        carbs: 13.7,
        fiber: 6.7,
        saturated_fat: 6.1,
        unsaturated_fat: 59.1,
        cholesterol: 0,
        sodium: 2,
        potassium: 441,
        sugar: 2.6,
        vitamin_a: 1,
        vitamin_c: 1.3,
        calcium: 98,
        iron: 2.9,
        glycemic_index: 15,
        glycemic_load: 1,
        unit: "g"
      }, {
        id: "peanut",
        name: "花生",
        calories: 567,
        protein: 25.8,
        fat: 46,
        carbs: 19.5,
        fiber: 8.5,
        unit: "g"
      }, {
        id: "almond",
        name: "杏仁",
        calories: 598,
        protein: 21.2,
        fat: 50.6,
        carbs: 21.7,
        fiber: 12.5,
        unit: "g"
      }, {
        id: "cashew",
        name: "腰果",
        calories: 553,
        protein: 18.2,
        fat: 44,
        carbs: 32.7,
        fiber: 3,
        unit: "g"
      }, {
        id: "pistachio",
        name: "开心果",
        calories: 560,
        protein: 20.6,
        fat: 45.4,
        carbs: 28,
        fiber: 10,
        unit: "g"
      }, {
        id: "hazelnut",
        name: "榛子",
        calories: 628,
        protein: 15,
        fat: 61,
        carbs: 17,
        fiber: 10,
        unit: "g"
      }, {
        id: "macadamia",
        name: "夏威夷果",
        calories: 718,
        protein: 7.9,
        fat: 76,
        carbs: 14,
        fiber: 8.6,
        unit: "g"
      }, {
        id: "pecan",
        name: "山核桃",
        calories: 691,
        protein: 9.2,
        fat: 72,
        carbs: 14,
        fiber: 9.6,
        unit: "g"
      }, {
        id: "pine_nut",
        name: "松子",
        calories: 673,
        protein: 14,
        fat: 68.4,
        carbs: 13.1,
        fiber: 3.7,
        unit: "g"
      }, {
        id: "brazil_nut",
        name: "巴西坚果",
        calories: 656,
        protein: 14.3,
        fat: 66.4,
        carbs: 12.3,
        fiber: 7.5,
        unit: "g"
      }, {
        id: "chestnut",
        name: "板栗(熟)",
        calories: 170,
        protein: 3,
        fat: 2.2,
        carbs: 36.6,
        fiber: 5.1,
        unit: "g"
      }, {
        id: "ginkgo",
        name: "白果(熟)",
        calories: 182,
        protein: 4.3,
        fat: 1.7,
        carbs: 37.6,
        fiber: 1,
        unit: "g"
      }, {
        id: "sunflower_seed",
        name: "葵花籽",
        calories: 584,
        protein: 21,
        fat: 51.5,
        carbs: 20,
        fiber: 8.6,
        unit: "g"
      }, {
        id: "pumpkin_seed",
        name: "南瓜籽",
        calories: 559,
        protein: 30.2,
        fat: 49,
        carbs: 10.7,
        fiber: 6,
        unit: "g"
      }, {
        id: "sesame_seed",
        name: "芝麻",
        calories: 573,
        protein: 17.7,
        fat: 49.7,
        carbs: 23.4,
        fiber: 11.8,
        unit: "g"
      }, {
        id: "flaxseed",
        name: "亚麻籽",
        calories: 534,
        protein: 18.3,
        fat: 42.2,
        carbs: 28.9,
        fiber: 27.3,
        unit: "g"
      }, {
        id: "chia_seed",
        name: "奇亚籽",
        calories: 486,
        protein: 16.5,
        fat: 30.7,
        carbs: 42.1,
        fiber: 34.4,
        unit: "g"
      }, {
        id: "hemp_seed",
        name: "火麻仁",
        calories: 553,
        protein: 31.6,
        fat: 48.8,
        carbs: 8.7,
        fiber: 4,
        unit: "g"
      }, {
        id: "lotus_seed",
        name: "莲子(干)",
        calories: 350,
        protein: 17.2,
        fat: 2.5,
        carbs: 67.2,
        fiber: 2.6,
        unit: "g"
      }, {
        id: "coix_seed",
        name: "薏米(干)",
        calories: 358,
        protein: 12.9,
        fat: 6.2,
        carbs: 65.3,
        fiber: .9,
        unit: "g"
      }]
    }, {
      id: "seafood",
      name: "海鲜类",
      foods: [{
        id: "salmon",
        name: "三文鱼",
        calories: 208,
        protein: 20,
        fat: 13,
        carbs: 0,
        fiber: 0,
        saturated_fat: 3.1,
        unsaturated_fat: 9.9,
        cholesterol: 55,
        sodium: 59,
        potassium: 363,
        sugar: 0,
        vitamin_a: 58,
        vitamin_c: 0,
        calcium: 9,
        iron: .5,
        glycemic_index: 0,
        glycemic_load: 0,
        unit: "g"
      }, {
        id: "fish",
        name: "鱼肉(普通)",
        calories: 98,
        protein: 19.4,
        fat: 2.1,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "shrimp",
        name: "虾肉",
        calories: 99,
        protein: 20.3,
        fat: 1.7,
        carbs: .9,
        fiber: 0,
        unit: "g"
      }, {
        id: "crab",
        name: "蟹肉",
        calories: 97,
        protein: 19.5,
        fat: 1.5,
        carbs: .6,
        fiber: 0,
        unit: "g"
      }, {
        id: "squid",
        name: "鱿鱼",
        calories: 92,
        protein: 15.6,
        fat: 1.4,
        carbs: 3.1,
        fiber: 0,
        unit: "g"
      }, {
        id: "scallop",
        name: "扇贝",
        calories: 88,
        protein: 16.8,
        fat: .8,
        carbs: 3.3,
        fiber: 0,
        unit: "g"
      }, {
        id: "tuna",
        name: "金枪鱼",
        calories: 109,
        protein: 23.3,
        fat: .9,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "cod",
        name: "鳕鱼",
        calories: 82,
        protein: 17.8,
        fat: .7,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "mackerel",
        name: "青花鱼",
        calories: 191,
        protein: 18.6,
        fat: 12,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "sardine",
        name: "沙丁鱼",
        calories: 208,
        protein: 24.6,
        fat: 11.5,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "tilapia",
        name: "罗非鱼",
        calories: 96,
        protein: 20.1,
        fat: 1.7,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "sea_bass",
        name: "海鲈鱼",
        calories: 97,
        protein: 18.4,
        fat: 2,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "eel",
        name: "鳗鱼",
        calories: 236,
        protein: 18.4,
        fat: 17.5,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "lobster",
        name: "龙虾",
        calories: 89,
        protein: 19,
        fat: .9,
        carbs: .5,
        fiber: 0,
        unit: "g"
      }, {
        id: "crawfish",
        name: "小龙虾",
        calories: 77,
        protein: 14.9,
        fat: 1.2,
        carbs: .6,
        fiber: 0,
        unit: "g"
      }, {
        id: "abalone",
        name: "鲍鱼",
        calories: 105,
        protein: 17.1,
        fat: .8,
        carbs: 6,
        fiber: 0,
        unit: "g"
      }, {
        id: "clam",
        name: "蛤蜊",
        calories: 86,
        protein: 15,
        fat: 1,
        carbs: 3.6,
        fiber: 0,
        unit: "g"
      }, {
        id: "oyster",
        name: "生蚝",
        calories: 69,
        protein: 8.1,
        fat: 2,
        carbs: 4,
        fiber: 0,
        unit: "g"
      }, {
        id: "mussel",
        name: "贻贝",
        calories: 86,
        protein: 11.9,
        fat: 2.2,
        carbs: 3.7,
        fiber: 0,
        unit: "g"
      }, {
        id: "octopus",
        name: "章鱼",
        calories: 82,
        protein: 15,
        fat: 1.2,
        carbs: 2,
        fiber: 0,
        unit: "g"
      }]
    }, {
      id: "snacks",
      name: "零食饮料",
      foods: [{
        id: "chocolate",
        name: "巧克力",
        calories: 546,
        protein: 7.8,
        fat: 31.3,
        carbs: 59.9,
        fiber: 7,
        unit: "g"
      }, {
        id: "chips",
        name: "薯片",
        calories: 536,
        protein: 6.6,
        fat: 34.6,
        carbs: 53,
        fiber: 4.8,
        unit: "g"
      }, {
        id: "cola",
        name: "可乐",
        calories: 42,
        protein: 0,
        fat: 0,
        carbs: 10.6,
        fiber: 0,
        unit: "ml"
      }, {
        id: "icecream",
        name: "冰淇淋",
        calories: 207,
        protein: 3.5,
        fat: 11,
        carbs: 24,
        fiber: .7,
        unit: "g"
      }, {
        id: "cookie",
        name: "饼干",
        calories: 457,
        protein: 7,
        fat: 16,
        carbs: 71,
        fiber: 2.4,
        unit: "g"
      }, {
        id: "popcorn",
        name: "爆米花",
        calories: 375,
        protein: 12,
        fat: 4,
        carbs: 78,
        fiber: 14.5,
        unit: "g"
      }, {
        id: "candy",
        name: "糖果",
        calories: 392,
        protein: 0,
        fat: .2,
        carbs: 97.8,
        fiber: 0,
        unit: "g"
      }, {
        id: "jelly",
        name: "果冻",
        calories: 62,
        protein: 1,
        fat: 0,
        carbs: 15,
        fiber: 0,
        unit: "g"
      }, {
        id: "pudding",
        name: "布丁",
        calories: 103,
        protein: 2.6,
        fat: 3,
        carbs: 17,
        fiber: 0,
        unit: "g"
      }, {
        id: "dark_chocolate",
        name: "黑巧克力",
        calories: 599,
        protein: 7.8,
        fat: 42.6,
        carbs: 45.9,
        fiber: 10.9,
        unit: "g"
      }, {
        id: "milk_chocolate",
        name: "牛奶巧克力",
        calories: 535,
        protein: 7.7,
        fat: 29.7,
        carbs: 59.4,
        fiber: 3.4,
        unit: "g"
      }, {
        id: "dried_mango",
        name: "芒果干",
        calories: 314,
        protein: 3.4,
        fat: 1.2,
        carbs: 78,
        fiber: 8.7,
        unit: "g"
      }, {
        id: "soda",
        name: "汽水",
        calories: 41,
        protein: 0,
        fat: 0,
        carbs: 10.6,
        fiber: 0,
        unit: "ml"
      }, {
        id: "coffee",
        name: "咖啡(纯)",
        calories: 2,
        protein: .1,
        fat: 0,
        carbs: .3,
        fiber: 0,
        unit: "ml"
      }, {
        id: "milk_tea",
        name: "奶茶",
        calories: 56,
        protein: 1.5,
        fat: 1.8,
        carbs: 9,
        fiber: 0,
        unit: "ml"
      }, {
        id: "orange_juice",
        name: "橙汁",
        calories: 45,
        protein: .7,
        fat: .2,
        carbs: 10.4,
        fiber: .2,
        unit: "ml"
      }, {
        id: "apple_juice",
        name: "苹果汁",
        calories: 46,
        protein: .1,
        fat: .1,
        carbs: 11.3,
        fiber: .1,
        unit: "ml"
      }, {
        id: "beer",
        name: "啤酒",
        calories: 43,
        protein: .5,
        fat: 0,
        carbs: 3.6,
        fiber: 0,
        unit: "ml"
      }, {
        id: "wine",
        name: "葡萄酒",
        calories: 83,
        protein: .1,
        fat: 0,
        carbs: 2.7,
        fiber: 0,
        unit: "ml"
      }, {
        id: "crackers",
        name: "咸饼干",
        calories: 421,
        protein: 9.5,
        fat: 12,
        carbs: 67.8,
        fiber: 3.7,
        unit: "g"
      }]
    }, {
      id: "beans",
      name: "豆类",
      foods: [{
        id: "tofu",
        name: "豆腐",
        calories: 83,
        protein: 8.1,
        fat: 4.8,
        carbs: 2.1,
        fiber: .3,
        unit: "g"
      }, {
        id: "edamame",
        name: "毛豆",
        calories: 121,
        protein: 11,
        fat: 5,
        carbs: 10,
        fiber: 5,
        unit: "g"
      }, {
        id: "soybean",
        name: "黄豆",
        calories: 446,
        protein: 36.5,
        fat: 19.9,
        carbs: 30.2,
        fiber: 9.3,
        unit: "g"
      }, {
        id: "red_bean",
        name: "红豆",
        calories: 337,
        protein: 22,
        fat: .8,
        carbs: 63,
        fiber: 15.2,
        unit: "g"
      }, {
        id: "mung_bean",
        name: "绿豆",
        calories: 347,
        protein: 23.9,
        fat: 1.2,
        carbs: 62.6,
        fiber: 16.3,
        unit: "g"
      }, {
        id: "black_bean",
        name: "黑豆",
        calories: 341,
        protein: 21.6,
        fat: 1.4,
        carbs: 62.4,
        fiber: 15.5,
        unit: "g"
      }, {
        id: "kidney_bean",
        name: "芸豆",
        calories: 337,
        protein: 22.5,
        fat: 1.1,
        carbs: 61.2,
        fiber: 15.2,
        unit: "g"
      }, {
        id: "chickpea",
        name: "鹰嘴豆",
        calories: 364,
        protein: 19.3,
        fat: 6,
        carbs: 60.7,
        fiber: 17.4,
        unit: "g"
      }, {
        id: "lentil",
        name: "小扁豆",
        calories: 352,
        protein: 24.6,
        fat: 1.1,
        carbs: 63.4,
        fiber: 10.7,
        unit: "g"
      }, {
        id: "firm_tofu",
        name: "老豆腐",
        calories: 91,
        protein: 10,
        fat: 5.3,
        carbs: 2.1,
        fiber: .3,
        unit: "g"
      }, {
        id: "silken_tofu",
        name: "嫩豆腐",
        calories: 61,
        protein: 5.2,
        fat: 3.7,
        carbs: 2,
        fiber: .3,
        unit: "g"
      }, {
        id: "dried_tofu",
        name: "豆腐干",
        calories: 217,
        protein: 24,
        fat: 12,
        carbs: 4.5,
        fiber: .6,
        unit: "g"
      }, {
        id: "bean_sprout",
        name: "豆芽",
        calories: 30,
        protein: 3,
        fat: .2,
        carbs: 6,
        fiber: 1.8,
        unit: "g"
      }, {
        id: "natto",
        name: "纳豆",
        calories: 211,
        protein: 17.7,
        fat: 11,
        carbs: 12.5,
        fiber: 5.4,
        unit: "g"
      }, {
        id: "bean_curd_sheet",
        name: "腐竹",
        calories: 480,
        protein: 48.7,
        fat: 30.4,
        carbs: 5.2,
        fiber: 0,
        unit: "g"
      }]
    }, {
      id: "seasonings",
      name: "调味品",
      foods: [{
        id: "soy_sauce",
        name: "生抽",
        calories: 60,
        protein: 5.6,
        fat: .1,
        carbs: 8.4,
        fiber: .8,
        unit: "g"
      }, {
        id: "dark_soy_sauce",
        name: "老抽",
        calories: 62,
        protein: 5.4,
        fat: .1,
        carbs: 10,
        fiber: .8,
        unit: "g"
      }, {
        id: "salt",
        name: "食盐",
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "sugar",
        name: "白砂糖",
        calories: 390,
        protein: 0,
        fat: 0,
        carbs: 99.9,
        fiber: 0,
        unit: "g"
      }, {
        id: "brown_sugar",
        name: "红糖",
        calories: 380,
        protein: 0,
        fat: 0,
        carbs: 98.1,
        fiber: 0,
        unit: "g"
      }, {
        id: "vinegar",
        name: "醋",
        calories: 18,
        protein: 0,
        fat: 0,
        carbs: .9,
        fiber: 0,
        unit: "g"
      }, {
        id: "oyster_sauce",
        name: "蚝油",
        calories: 85,
        protein: 2,
        fat: 0,
        carbs: 18,
        fiber: 0,
        unit: "g"
      }, {
        id: "cooking_wine",
        name: "料酒",
        calories: 34,
        protein: .1,
        fat: 0,
        carbs: .5,
        fiber: 0,
        unit: "g"
      }, {
        id: "sesame_oil",
        name: "芝麻油",
        calories: 884,
        protein: 0,
        fat: 100,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "olive_oil",
        name: "橄榄油",
        calories: 884,
        protein: 0,
        fat: 100,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "vegetable_oil",
        name: "植物油",
        calories: 884,
        protein: 0,
        fat: 100,
        carbs: 0,
        fiber: 0,
        unit: "g"
      }, {
        id: "mayo",
        name: "蛋黄酱",
        calories: 680,
        protein: 1,
        fat: 75,
        carbs: 2,
        fiber: 0,
        unit: "g"
      }, {
        id: "ketchup",
        name: "番茄酱",
        calories: 101,
        protein: 1.7,
        fat: .5,
        carbs: 24,
        fiber: .9,
        unit: "g"
      }, {
        id: "mustard",
        name: "芥末",
        calories: 65,
        protein: 4.3,
        fat: 3.6,
        carbs: 6,
        fiber: 3.3,
        unit: "g"
      }, {
        id: "honey",
        name: "蜂蜜",
        calories: 304,
        protein: .3,
        fat: 0,
        carbs: 82.4,
        fiber: .2,
        unit: "g"
      }]
    }]
  },
  selectFoodCategory: function(e) {
    var i = e.currentTarget.dataset.id;
    console.log("选择分类:", i);
    var a = this.data.foodCategories.find((function(e) {
      return e.id === i
    }));
    a ? (this.setData({
      currentFoodCategory: i,
      currentFoods: a.foods
    }), console.log("已更新当前食品列表, 数量:", a.foods.length)) : console.error("未找到分类:", i)
  },
  viewFoodDetail: function(e) {
    var i = e.currentTarget.dataset.id,
      a = this.data.currentFoodCategory;
    wx.navigateTo({
      url: "/pages/food-detail/food-detail?category=".concat(a, "&id=").concat(i),
      fail: function(e) {
        console.error("导航失败:", e), wx.showToast({
          title: "页面加载失败",
          icon: "none"
        })
      }
    })
  },
  onCategoryPageChange: function(e) {
    this.setData({
      categoryPage: e.detail.current
    })
  },
  toggleMoreCategories: function() {
    this.setData({
      showMoreCategories: !this.data.showMoreCategories
    })
  },
  validateInput: function() {
    var e = parseFloat(this.data.height),
      i = parseFloat(this.data.weight),
      a = parseInt(this.data.age);
    return !e || !i || e <= 0 || i <= 0 ? (wx.showToast({
      title: "请输入有效的身高和体重",
      icon: "none"
    }), !1) : !(!a || a <= 0) || (wx.showToast({
      title: "请输入有效的年龄",
      icon: "none"
    }), !1)
  },
  onPageScroll: function(e) {
    this.data.lastScrollPosition = e.scrollTop
  },
  onTabItemTap: function(e) {
    console.log("点击了底部导航:", e.index, e.pagePath), wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    }), this.setData({
      preventAutoScroll: !1
    })
  },
  checkProfileExists: function() {
    var e = wx.getStorageSync("user_profiles") || [],
      i = wx.getStorageSync("current_profile_id");
    return 0 === e.length ? (wx.showModal({
      title: "提示",
      content: "您还没有创建任何档案，是否现在创建？",
      confirmText: "去创建",
      success: function(e) {
        e.confirm && wx.navigateTo({
          url: "/pages/profile-edit/profile-edit"
        })
      }
    }), !1) : !!i || (wx.showModal({
      title: "提示",
      content: "请先选择一个档案",
      confirmText: "选择档案",
      success: function(e) {
        e.confirm && wx.navigateTo({
          url: "/pages/profiles/profiles"
        })
      }
    }), !1)
  },
  loadGoalData: function() {
    var e = this;
    if (this.data.currentProfileId) {
      var i = this.getProfileStorage("goalWeight");
      i ? (this.setData({
        goalWeight: i,
        hasGoal: !0
      }), setTimeout((function() {
        e.updateGoalStatus()
      }), 100)) : this.setData({
        hasGoal: !1,
        goalWeight: ""
      })
    }
  }
}, "getProfileStorage", (function(e) {
  var i = this.data.currentProfileId;
  if (!i) return null;
  var a = "profile_".concat(i, "_").concat(e);
  return wx.getStorageSync(a)
})), "calculateIdealWeightRange", (function() {
  var e = parseFloat(this.data.height);
  if (!e) return "";
  var i, a, t = e / 100;
  "female" === this.data.gender ? (i = 19, a = 24) : (i = 20, a = 25);
  var r = (i * t * t).toFixed(1),
    n = (a * t * t).toFixed(1);
  return "".concat(r, " - ").concat(n)
})));