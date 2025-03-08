import { UserStorage } from "./userStorage"
import { User } from "./user";

export class UserManager {
   static createDefaultUser() {
      const userExists = UserStorage.loadUser();
      if (!userExists) {
         const defaultUser = new User();
         UserStorage.saveUser(defaultUser);
      }
   }

   static getUser() {
      const user = UserStorage.loadUser();
      return user
   }

   static editUser(newUsername, newAvatarUrl) {
      const user = UserStorage.loadUser();
      user.username = newUsername;
      user.avatarUrl = newAvatarUrl;

      UserStorage.saveUser(user);
   }
}