import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'smartCartItemImages',
  access:(allow) => ({
    'upload/*':[ allow.guest.to(['read','write','delete']) ],
  })
});
