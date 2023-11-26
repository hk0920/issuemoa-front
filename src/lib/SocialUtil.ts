import * as AxiosUtil from './AxiosUtil';

interface CustomWindow extends Window {
  Kakao?: any; // Kakao 객체가 window에 있다고 가정
}

// window를 사용할 때는 CustomWindow 타입을 사용
const { Kakao }: CustomWindow = window;

if (!Kakao.isInitialized()) {
  Kakao.init(process.env.REACT_APP_KAKAO_SCRIPT_KEY);
}

export function initializeSocialLogin() {
  // Kakao
  // Kakao.Auth.createLoginButton({
  //   container: '#kakao-login-btn',
  //   success: function(authObj:any) {
  //     Kakao.API.request({
  //       url: '/v2/user/me',
  //       success: function(res:any) {
  //         res.kakao_account.id = res.id;
  //         res.kakao_account.name = res.kakao_account.profile.nickname;
  //         login(res.kakao_account);
  //       },
  //       fail: function(error:any) {
  //         console.log(
  //           'KAKAO login success, but failed to request user information: ' +
  //           JSON.stringify(error)
  //         )
  //       }
  //     })
  //   },
  //   fail: function(err:any) {
  //     console.log('failed to login: ' + JSON.stringify(err));
  //   }
  // })
}

export function login(user:any) {
  console.log('# social Login #')
  console.log(user);
  const formData = new FormData();
  formData.append("socialId", user.id);
  // AxiosUtil.send("POST", "/issuemoa/users/find-by/social-id", formData, "", (e:any) => {
  //   if (e.data) {
  //     window.location.href = "/";
  //   } else {
  //     window.location.href = `/sign-up/${user.email}/${user.name}`;
  //   }
  // });
} 