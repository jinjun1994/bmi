Page({
  data: {
    heightWeightData: []
  },
  onLoad: function() {
    for (var t = [], e = 150; e <= 180; e++) {
      for (var a = {
          height: e,
          weights: []
        }, h = 40; h <= 120; h += 5) {
        var i = h / (e / 100 * (e / 100)),
          s = "";
        s = i < 18.5 ? "underweight" : i < 24 ? "normal" : i < 28 ? "overweight" : "obese", a.weights.push({
          value: h,
          class: s
        })
      }
      t.push(a)
    }
    this.setData({
      heightWeightData: t
    })
  }
});