import React from 'react';

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <section id="social-login">
      <h2>Social Login</h2>
      <button onClick={() => handleSocialLogin('Google')}>Login with Google</button>
      <button onClick={() => handleSocialLogin('Instagram')}>Login with Instagram</button>
    </section>
  );
};

export default SocialLogin;
