// Check wallet address and user login
exports.checkWalletAndLogin = (req, res, next) => {
  // Get wallet address from Header
  const walletAddress = req.get('Wallet-Address');

  // Check if wallet address is not present
  if (!walletAddress) {
    return res.status(403).json({
      success: false,
      message: 'No wallet address found, access denied',
    });
  }

  // Check if user is logged in
  if (!req.user) {
    return res.status(403).json({
      success: false,
      message: 'User not logged in, access denied',
    });
  }

  req.walletAddress = walletAddress;

  // Done
  next();
};
