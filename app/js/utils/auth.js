/**
 * 权限验证
 */

import cookie from './cookie';

export default {
  loggedIn() {
    let sid = cookie.get('kickid');
    let username = cookie.get('username');
    return sid && sid.length > 0 && username !== undefined;
  },

  getUser() {
    return cookie.get('username');
  }
};
