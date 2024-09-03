// src/utils/emailCheck.js
export const checkEmailExists = (email, userList) => {
    return userList.some(user => user.email === email);
  };
  