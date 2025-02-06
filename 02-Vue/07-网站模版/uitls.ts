const isMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const reg = /windows phone|iphone|ipad|ipod|android|blackberry|mini|windows ce|palm/i;

  return reg.test(userAgent.toLowerCase());
};