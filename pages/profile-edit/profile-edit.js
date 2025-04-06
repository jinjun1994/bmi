Page({
  data: {
    id: "",
    name: "",
    gender: "female",
    age: "",
    height: "",
    weight: "",
    isEdit: !1
  },
  onLoad: function(e) {
    if (e.id) {
      var t = (wx.getStorageSync("user_profiles") || []).find((function(t) {
        return t.id === e.id
      }));
      t && this.setData({
        id: t.id,
        name: t.name,
        gender: t.gender,
        age: t.age,
        height: t.height,
        weight: t.weight || "",
        isEdit: !0
      })
    }
  },
  onNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  onGenderChange: function(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  onAgeInput: function(e) {
    var t = e.detail.value.replace(/\D/g, "");
    return this.setData({
      age: t
    }), {
      value: t
    }
  },
  onHeightInput: function(e) {
    var t = e.detail.value.replace(/[^\d.]/g, "").replace(/\.+/g, ".").replace(/^(\d*\.\d*)\..*$/, "$1");
    return this.setData({
      height: t
    }), {
      value: t
    }
  },
  onWeightInput: function(e) {
    var t = e.detail.value.replace(/[^\d.]/g, "").replace(/\.+/g, ".").replace(/^(\d*\.\d*)\..*$/, "$1");
    return this.setData({
      weight: t
    }), {
      value: t
    }
  },
  saveProfile: function() {
    var e = this.data,
      t = e.id,
      i = e.name,
      a = e.gender,
      n = e.age,
      r = e.height,
      o = e.weight,
      s = e.isEdit;
    if (i.trim()) {
      var g = wx.getStorageSync("user_profiles") || [];
      if (s) {
        var c = g.findIndex((function(e) {
          return e.id === t
        })); - 1 !== c && (g[c] = {
          id: t,
          name: i.trim(),
          gender: a,
          age: n || "",
          height: r || "",
          weight: o || ""
        })
      } else {
        var d = {
          id: Date.now().toString(),
          name: i.trim(),
          gender: a,
          age: n || "",
          height: r || "",
          weight: o || ""
        };
        g.push(d), 1 === g.length && wx.setStorageSync("current_profile_id", d.id)
      }
      wx.setStorageSync("user_profiles", g), wx.showToast({
        title: s ? "用户已更新" : "用户已创建",
        icon: "success"
      }), wx.setStorageSync("returning_from_profile", !0), wx.navigateBack()
    } else wx.showToast({
      title: "请输入姓名",
      icon: "none"
    })
  },
  cancel: function() {
    wx.navigateBack()
  },
  deleteProfile: function() {
    var e = this.data.id;
    wx.showModal({
      title: "确认删除",
      content: "删除用户将会同时删除所有相关记录，确定要删除吗？",
      success: function(t) {
        if (t.confirm) {
          var i = wx.getStorageSync("user_profiles") || [];
          i = i.filter((function(t) {
            return t.id !== e
          })), wx.setStorageSync("user_profiles", i), wx.getStorageSync("current_profile_id") === e && (i.length > 0 ? wx.setStorageSync("current_profile_id", i[0].id) : wx.removeStorageSync("current_profile_id"));
          var a = wx.getStorageSync("all_bmi_records") || {};
          delete a[e], wx.setStorageSync("all_bmi_records", a), wx.showToast({
            title: "用户已删除",
            icon: "success"
          }), wx.navigateBack()
        }
      }
    })
  },
  viewHistory: function() {
    var e = this,
      t = this.data.id;
    t && (wx.setStorageSync("temp_view_profile_id", t), wx.switchTab({
      url: "/pages/history/history",
      success: function() {
        var i = e.getOpenerEventChannel();
        i && i.emit("viewProfileHistory", {
          profileId: t
        })
      }
    }))
  }
});