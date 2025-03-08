export class UserStorage {
   static saveUser(user) {
      const userData = { username: user.username, avatarUrl: user.avatarUrl };
      localStorage.setItem('user', JSON.stringify(userData));
   }

   static loadUser() {
      const userData = JSON.parse(localStorage.getItem('user'));
      return userData;
   }
}
