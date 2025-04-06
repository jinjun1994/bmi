Page({
  data: {
    food: {},
    showDetailedNutrition: !1,
    macroRatio: {},
    nutritionPercents: {},
    pairingFoods: []
  },
  onLoad: function(o) {
    var t = o.category,
      n = o.id;
    this.loadFoodData(t, n)
  },
  loadFoodData: function(o, t) {
    var n = wx.getStorageSync("food_data");
    if (n && n.length) {
      var i = n.find((function(t) {
        return t.id === o
      }));
      if (i) {
        var e = i.foods.find((function(o) {
          return o.id === t
        }));
        if (e) {
          var a = 4 * e.protein + 4 * e.carbs + 9 * e.fat,
            r = {
              protein: Math.round(4 * e.protein / a * 100),
              carbs: Math.round(4 * e.carbs / a * 100),
              fat: Math.round(9 * e.fat / a * 100)
            },
            s = {
              protein: (e.protein / 50 * 100).toFixed(1),
              proteinPercent: Math.min(100, e.protein / 50 * 100),
              calcium: ((e.calcium || 0) / 1e3 * 100).toFixed(1),
              calciumPercent: Math.min(100, (e.calcium || 0) / 1e3 * 100),
              iron: ((e.iron || 0) / 18 * 100).toFixed(1),
              ironPercent: Math.min(100, (e.iron || 0) / 18 * 100)
            },
            c = this.calculatePairingFoods(e, i, n);
          this.setData({
            food: e,
            macroRatio: r,
            nutritionPercents: s,
            pairingFoods: c
          })
        } else wx.showToast({
          title: "未找到指定食品",
          icon: "none"
        })
      } else wx.showToast({
        title: "未找到食品分类",
        icon: "none"
      })
    } else wx.showToast({
      title: "未找到食品数据库",
      icon: "none"
    })
  },
  calculatePairingFoods: function(o, t, n) {
    var i = [];
    if (o.protein >= 10) {
      var e = n.find((function(o) {
        return "vegetables" === o.id
      }));
      if (console.log("蔬菜分类:", e ? "找到" : "未找到"), e && e.foods.length > 0) {
        var a = this.getRandomItems(e.foods, 2);
        console.log("推荐的蔬菜:", a), a.forEach((function(o) {
          i.push({
            id: o.id,
            name: o.name,
            reason: "搭配蔬菜均衡营养"
          })
        }))
      }
    }
    if (o.carbs >= 15) {
      var r = n.find((function(o) {
        return "meat_egg" === o.id
      }));
      if (console.log("蛋白质食品分类:", r ? "找到" : "未找到"), r && r.foods.length > 0) {
        var s = this.getRandomItems(r.foods, 1);
        console.log("推荐的蛋白质食品:", s), s.forEach((function(o) {
          i.push({
            id: o.id,
            name: o.name,
            reason: "补充蛋白质"
          })
        }))
      }
    }
    return console.log("生成的推荐食品数量:", i.length), i
  },
  getRandomItems: function(o, t) {
    return o.sort((function() {
      return .5 - Math.random()
    })).slice(0, t)
  },
  toggleDetailedNutrition: function() {
    this.setData({
      showDetailedNutrition: !this.data.showDetailedNutrition
    })
  },
  onUnload: function() {
    wx.setStorageSync("returning_from_food_detail", !0)
  }
});