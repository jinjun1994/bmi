Page({
  data: {
    profiles: [],
    currentProfileId: ""
  },
  onLoad: function() {
    this.loadProfiles()
  },
  onShow: function() {
    this.loadProfiles()
  },
  loadProfiles: function() {
    var e = wx.getStorageSync("user_profiles") || [],
      t = wx.getStorageSync("current_profile_id") || "";
    this.setData({
      profiles: e,
      currentProfileId: t
    })
  },
  switchProfile: function(e) {
    var t = e.currentTarget.dataset.id;
    wx.setStorageSync("current_profile_id", t), this.setData({
      currentProfileId: t
    }), wx.showToast({
      title: "已切换用户",
      icon: "success"
    }), wx.switchTab({
      url: "/pages/index/index"
    })
  },
  addProfile: function() {
    wx.navigateTo({
      url: "/pages/profile-edit/profile-edit"
    })
  },
  editProfile: function(e) {
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/profile-edit/profile-edit?id=".concat(t)
    })
  },
  viewHistory: function(e) {
    var t = e.currentTarget.dataset.id;
    t && (wx.setStorageSync("temp_view_profile_id", t), wx.switchTab({
      url: "/pages/history/history"
    }))
  },
  selectProfile: function(e) {
    var t = e.currentTarget.dataset.id;
    wx.setStorageSync("current_profile_id", t);
    wx.setStorageSync("returning_from_profile", !0);
    
    // 立即更新当前视图状态
    this.setData({
      currentProfileId: t
    });
    
    wx.navigateBack();
  },
  showDeleteConfirm: function(e) {
    var t = this,
      r = e.currentTarget.dataset.id,
      i = this.data.profiles.find((function(e) {
        return e.id === r
      })),
      o = r === this.data.currentProfileId;
    wx.showModal({
      title: "删除用户",
      content: '确定要删除"'.concat(i.name, '"的用户吗？').concat(o ? "(这是当前正在使用的用户)" : ""),
      confirmText: "删除",
      confirmColor: "#ff4d4f",
      success: function(e) {
        e.confirm && t.deleteProfile(r)
      }
    })
  },
  deleteProfile: function(e) {
    var t = wx.getStorageSync("user_profiles") || [];
    t = t.filter((function(t) {
      return t.id !== e
    })), wx.setStorageSync("user_profiles", t), e === this.data.currentProfileId && (t.length > 0 ? (wx.setStorageSync("current_profile_id", t[0].id), this.setData({
      currentProfileId: t[0].id
    })) : (wx.removeStorageSync("current_profile_id"), this.setData({
      currentProfileId: ""
    }))), this.setData({
      profiles: t
    }), wx.showToast({
      title: "用户已删除",
      icon: "success"
    })
  }
});