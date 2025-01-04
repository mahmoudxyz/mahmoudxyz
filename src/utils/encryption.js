// utils/encryption.js
const generateKey = (salt, password) => {
    const encoder = new TextEncoder();
    const keyMaterial = encoder.encode(password + salt);
    
    // Create a hash of the password using a more complex algorithm
    const hashArray = Array.from(keyMaterial).reduce((acc, byte, i) => {
      const shift = (i % 4) * 8;
      acc[Math.floor(i / 4)] ^= byte << shift;
      return acc;
    }, new Uint32Array(Math.ceil(keyMaterial.length / 4)));
    
    // Convert to hex string
    return Array.from(hashArray)
      .map(n => n.toString(16).padStart(8, '0'))
      .join('');
  };
  
  const createNonce = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  
  const encryptToken = (password) => {
    try {
      // Create a random salt and nonce
      const salt = crypto.getRandomValues(new Uint8Array(16))
        .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
      const nonce = createNonce();
      
      // Generate encryption key
      const key = generateKey(salt, password);
      
      // Create payload with timestamp and version
      const payload = {
        pwd: password,
        exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        nonce: nonce,
        v: '1', // version for future compatibility
      };
      
      // Convert payload to string
      const payloadStr = JSON.stringify(payload);
      
      // Encrypt payload using XOR with key
      const encrypted = Array.from(payloadStr).map((char, i) => {
        const keyChar = key[i % key.length];
        return (char.charCodeAt(0) ^ keyChar.charCodeAt(0)).toString(16).padStart(2, '0');
      }).join('');
      
      // Combine all parts with additional verification data
      const token = [
        salt,
        nonce,
        encrypted,
        createChecksum(encrypted + salt + nonce)
      ].join('.');
      
      return btoa(token);
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  };
  
  const decryptAndVerifyToken = (token) => {
    try {
      // Decode base64
      const decoded = atob(token);
      
      // Split into components
      const [salt, nonce, encrypted, checksum] = decoded.split('.');
      
      // Verify checksum
      if (checksum !== createChecksum(encrypted + salt + nonce)) {
        return false;
      }
      
      // Regenerate key
      const key = generateKey(salt, import.meta.env.VITE_APP_PASSWORD);
      
      // Decrypt payload
      const decryptedStr = Array.from(encrypted.match(/.{1,2}/g) || [])
        .map((hex, i) => {
          const keyChar = key[i % key.length];
          return String.fromCharCode(parseInt(hex, 16) ^ keyChar.charCodeAt(0));
        }).join('');
      
      // Parse payload
      const payload = JSON.parse(decryptedStr);
      
      // Verify expiration
      if (payload.exp < Date.now()) {
        return false;
      }
      
      // Verify nonce matches
      if (payload.nonce !== nonce) {
        return false;
      }
      
      // Verify password
      return payload.pwd === import.meta.env.VITE_APP_PASSWORD;
      
    } catch (error) {
      console.error('Decryption error:', error);
      return false;
    }
  };
  
  const createChecksum = (data) => {
    // Create a checksum using a custom algorithm
    const chunks = data.match(/.{1,4}/g) || [];
    const checksum = chunks.reduce((acc, chunk) => {
      const value = chunk.split('').reduce((sum, char, i) => {
        return sum + (char.charCodeAt(0) << (i * 7));
      }, 0);
      return ((acc << 5) - acc + value) >>> 0;
    }, 0);
    
    return checksum.toString(36);
  };
  
  export { encryptToken, decryptAndVerifyToken };