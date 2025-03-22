import { UserManager } from "./userManager";

export class UserRenderer {
   static renderNameAndAvatar() {
      const userData = UserManager.getUser();

      const userContainer = document.querySelector('.user');

      let userAvatar;

      const defaultIcon = document.createElement('span');
      defaultIcon.classList.add('material-symbols-outlined', 'avatar');
      defaultIcon.textContent = 'account_circle';
      userAvatar = defaultIcon;

      const usernameContainer = document.createElement('div');
      usernameContainer.classList.add('username');
      usernameContainer.textContent = userData.username;

      userContainer.appendChild(userAvatar);
      userContainer.appendChild(usernameContainer);
   }

   static renderEditForm() {
      const disableOverlay = document.getElementById('disable-overlay');
      disableOverlay.classList.remove('show');
      disableOverlay.classList.add('show');

      const formContainer = document.createElement('div');
      formContainer.classList.add('form-container');

      const editUserForm = document.createElement('form');
      editUserForm.classList.add('form', 'edit-user-form');
      editUserForm.name = 'edit-user-form';

      const usernameInput = document.createElement('input');
      usernameInput.placeholder = 'Enter your new username.'
      const hrElement = document.createElement('hr');

      const btnsContainer = document.createElement('div');
      btnsContainer.classList.add('form-buttons');

      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('cancel-btn');
      cancelBtn.textContent = 'Cancel';

      const submitBtn = document.createElement('button');
      submitBtn.classList.add('submit-btn');
      submitBtn.textContent = 'Add project';
      submitBtn.disabled = true;

      usernameInput.addEventListener('input', checkFormValidity);

      function checkFormValidity() {
         const usernameLength = usernameInput.value.length;

         if (usernameLength > 3) {
            submitBtn.disabled = false;
         } else {
            submitBtn.disabled = true;
         }
      }

      btnsContainer.appendChild(cancelBtn);
      cancelBtn.addEventListener(
         'click',
         (event) => {
            event.preventDefault();

            formContainer.classList.remove('show');
            setTimeout(() => {
               formContainer.remove();
               disableOverlay.classList.remove('show');
            }, 300);
         },
         { once: true }
      );

      btnsContainer.appendChild(submitBtn);
            submitBtn.addEventListener(
               'click',
               (event) => {
                  event.preventDefault();
      
                  const username = usernameInput.value;
      
                  UserManager.editUser(username, avatarUrl);
                  UserRenderer.renderNameAndAvatar();
      
                  cancelBtn.click();
               },
               { once: true }
            );


      editUserForm.appendChild(usernameInput);
      editUserForm.appendChild(hrElement);
      editUserForm.appendChild(btnsContainer)

      formContainer.appendChild(editUserForm);
      document.body.appendChild(formContainer);

      setTimeout(() => {
         formContainer.classList.add('show');
      }, 10);
   }
}