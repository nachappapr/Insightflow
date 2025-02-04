export const APP_ROUTES = {
  ROADMAP: "/roadmap",
  DASHBOARD: "/dashboard",
  FEEDBACK: "/feedback",
  FEEDBACK_DETAILS: "/feedback/:id",
  CREATE_FEEDBACK: "/feedback/create",
  EDIT_FEEDBACK: "/feedback/:id/edit",
  LANDING_PAGE: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const PRIVATE_ROUTES = [
  APP_ROUTES.DASHBOARD,
  APP_ROUTES.FEEDBACK,
  APP_ROUTES.CREATE_FEEDBACK,
  APP_ROUTES.FEEDBACK_DETAILS,
  APP_ROUTES.EDIT_FEEDBACK,
];

export const PUBLIC_ROUTES = [
  APP_ROUTES.LOGIN,
  APP_ROUTES.SIGNUP,
  APP_ROUTES.LANDING_PAGE,
];
