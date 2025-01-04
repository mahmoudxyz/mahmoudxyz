const encryptToken = (password) => {
    // Create a timestamp for expiration (24 hours from now)
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
    
    // Combine password and timestamp
    const data = `${password}:${expiryTime}`;
    
    // Convert to base64 and add some basic encryption
    // Note: This is still not highly secure, but better than plain sessionStorage
    return btoa(data).split('').reverse().join('');
  };
  
  const decryptAndVerifyToken = (token) => {
    try {
      // Decrypt token
      const decrypted = atob(token.split('').reverse().join(''));
      const [storedPassword, expiryTime] = decrypted.split(':');
      
      // Check if token has expired
      if (Date.now() > parseInt(expiryTime)) {
        return false;
      }
      
      // Verify password
      return storedPassword === import.meta.env.VITE_APP_PASSWORD;
    } catch {
      return false;
    }
  };
  
  export { encryptToken, decryptAndVerifyToken };
  
  