'use client';

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/google';
  };
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      onClick={handleGoogleLogin}
      type='button'
    >
      Login with Google
    </button>
  );
}

export default GoogleLoginButton;
