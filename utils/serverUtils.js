const excludeSensitiveUserFields = () => {
  return '-password -activationToken -activationTokenExpires -resetPasswordToken -resetPasswordExpires -subscriptions -devices';
};

module.exports = {
  excludeSensitiveUserFields,
};
