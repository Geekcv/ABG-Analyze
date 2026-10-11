import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);

//   // 1. Check if the user is logged in
//   if (authService.isValidToken()) {
    
//     // 2. Get the required role from the route data
//     // (This 'role' comes from the data: { role: 'Admin' } you set in app.routes.ts)
//     const expectedRole = route.data['role'];

//     // 3. Get the current user's role from your service
//     const userRole = authService.getUserRole(); // Ensure this method exists in your AuthService

//     // 4. If a specific role is required, check if user has it
//     if (expectedRole && userRole !== expectedRole) {
//       console.warn('Unauthorized access - Role Mismatch');
      
//       // Redirect to a safe page (like dashboard) if they don't have permission
//       router.navigate(['/login']); 
//       return false;
//     }

//     return true;
//   } else {
//     // Not logged in
//     router.navigate(['/login']);
//     return false;
//   }
// };

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);

//  if(authService.isValidToken()){
//   // console.log('Guard Passed');
//   return true;
// } else {
//   // console.log('Guard Failed - Redirecting');
//   router.navigate(['/login']);
//   return false;
// }

// };

export const authGuard: CanActivateFn = async (route, state) => { 
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isValidToken()) {
    
    // const isActive = await authService.isUserStillActive();
    // console.log("isActive",isActive)
    // if (!isActive) {
    //   localStorage.clear();
    //   router.navigate(['/login']);
    //   return false;
    // }

    const allowedRoles = route.data['roles'] as Array<string>;
    const userRole = authService.getUserRole() || '';

    if (!allowedRoles || allowedRoles.includes(userRole)) {
      return true;
    } else {
      // localStorage.clear();
      router.navigate(['/home/pagenotfound']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
